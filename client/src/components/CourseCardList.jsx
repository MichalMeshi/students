import React, { useContext, useEffect, useState } from 'react'
import CourseContext from '../context/CourseContext';
import CourseCard from './CourseCard';
import { Alert, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import ProfileContext from '../context/ProfileContext';
import '../stylesheets/courseList.css'
import '../stylesheets/bluebutton.css'

export default function CourseCardList() {
  const { courses, getCourses, setcourses } = useContext(CourseContext);
  const { profileData } = useContext(ProfileContext);
  const [isClicked, setIsClicked] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    field: '',
  })
  const [search, setSearch] = useState('');
  const [error, setError] = useState("");

  const searchByField = async (e) => {
    if (e)
      e.preventDefault();
    try {
      setError("");
      console.log({ search });
      const res = await fetch(`http://localhost:3000/courses/search-course/${search}`, {
        headers: {
          "authorization": localStorage.getItem("token")
        }
      });
      const courses = await res.json();
      if (courses.length === 0)
        setError("No courses found");
      if (courses && Array.isArray(courses)) {
        setcourses([...courses]);
      }

    } catch (error) {
      setError(error.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(false);
    const response = await fetch('http://localhost:3000/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
      headers: {
        'Content-type': 'application/json',
        "authorization": localStorage.getItem("token")
      }
    });
    const data = await response.json();
    setcourses([...courses, data.newCourse])
  };

  useEffect(() => {
    getCourses();
  }, [isClicked])

  useEffect(() => {
    if (search.length > 0)
      searchByField();
    else {
      setError("");
      getCourses();
    }
  }, [search])


  return (
    <div>
      <div className='container-fluid'>
        <div className='container text-center mt-3'>
          <Row className=' d-flex align-items-center'>
            <Col>
              <h1>Get your course</h1>
              <p>Scroll down and find your favorite courses</p>
            </Col>
            <Col>
              {profileData.role === 'admin' && <Button onClick={() => setIsClicked(true)} style={{ backgroundColor: '#5055d1' }}>Add Course</Button>}
            </Col>
            <Col>
              <Form onSubmit={searchByField} className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type here to search..."
                  className="me-2"
                  aria-label="Search"
                  name="search"
                  defaultValue={search}
                  autoComplete="off"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" type="button" onClick={searchByField}>Search</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>



      <div className='container-fluid'>
        <div className='container'>
          <Row id='courses-row'>
            {
              courses?.map((course, index) => {
                return <Col className='col-card mt-3 mb-3' xs={12} md={4} sm={6} key={index}><CourseCard course={course} /></Col>
              })
            }
          </Row>
        </div>
      </div>

      <Modal show={isClicked} onHide={() => setIsClicked(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course as Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
            <Form.Group controlId="name" className='w-75 text-center'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={courseData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="field" className='w-75 text-center'>
              <Form.Label>Field</Form.Label>
              <Form.Control
                type="text"
                name="field"
                value={courseData.field}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button id='loginbtn' type="submit" className='mt-3'>
              Add New Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {error ? <Alert variant="danger">{error}</Alert> : ""}
    </div >
  )
}






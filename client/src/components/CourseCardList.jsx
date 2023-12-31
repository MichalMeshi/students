import React, { useContext, useEffect, useState } from 'react'
import CourseContext from '../context/CourseContext';
import CourseCard from './CourseCard';
import { Button, Form, Modal } from 'react-bootstrap';
import ProfileContext from '../context/ProfileContext';

export default function CourseCardList() {
  const { courses, getCourses, setcourses } = useContext(CourseContext);
  const { profileData } = useContext(ProfileContext);
  const [isClicked, setIsClicked] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    field: '',
  })
  // const [search, setSearch] = useState('');

  // const serachByField = async (e) => {
  //   console.log("search");
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(`http://localhost:3000/courses/search-by-field/${search}`);
  //     const courses = await res.json();
  //     if (courses)
  //       setcourses([...courses]);
  //     else
  //       console.log("worst");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

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
    if (data)
      console.log(data.msg);
  };

  useEffect(() => {
    getCourses();
  }, [isClicked])


  return (
    <div>
      <h1>Courses List</h1>
      {/* <Form className="d-flex" onSubmit={serachByField}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-success">Search</Button>
      </Form> */}

      {profileData.role === 'admin' && <Button onClick={() => setIsClicked(true)}>Add Course</Button>}
      {
        courses?.map((course, index) => {
          return <CourseCard course={course} key={index} />
        })
      }

      <Modal show={isClicked} onHide={() => setIsClicked(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course as Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={courseData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="field">
              <Form.Label>Field</Form.Label>
              <Form.Control
                type="text"
                name="field"
                value={courseData.field}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add New Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div >
  )
}






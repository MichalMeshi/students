import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseDatialPage from '../pages/CourseDatialPage';
import { Button, Card, Row, Col } from 'react-bootstrap'
import CourseContext from '../context/CourseContext';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import '../stylesheets/courseCard.css'
export default function CourseCard(props) {
  const { course } = props;
  const { handleUnFavoriteCourse, handleFavoriteCourse, myCourses } = useContext(CourseContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFound = myCourses.find(item => item._id === course._id);
    if (isFound) setFavorite(true);
  }, [myCourses])

  const onUnFavorite = () => {
    handleUnFavoriteCourse(course)
    setFavorite(false);
  }
  const onFavorite = () => {
    handleFavoriteCourse(course)
    setFavorite(true);
  }


  return (
    // <div className="card">
    //   <div className="card-body">
    //     <h5 className="card-title">{course.name}</h5>
    //     <h6 className="card-subtitle mb-2 text-body-secondary">{course.field}</h6>
    //     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <Link className="card-link" to={`/course_details/`+course._id}>read more</Link>
    //     {favorite ? (
    //       <IoMdHeart onClick={onUnFavorite} style={{ cursor: "pointer" }} />
    //     ) : (
    //       <IoIosHeartEmpty onClick={onFavorite} style={{ cursor: "pointer" }} />
    //     )}
    //   </div>
    // </div>
    <Card id="course-card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/11/09/08/10/board-3804006_1280.jpg" />
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
          {course.field}

        </Card.Text>
        <Row>
          <Col md={9}>
            <Button variant='white'>
              <Link className="card-link" to={`/course_details/` + course._id}>Get course</Link>
            </Button>
          </Col>
          <Col md={3} className='d-flex justify-content-center align-items-center'>
          {favorite ? (
            <IoMdHeart color='red' size={25} onClick={onUnFavorite} style={{ cursor: "pointer" }} />
          ) : (
            <IoIosHeartEmpty color='red' size={25} onClick={onFavorite} style={{ cursor: "pointer" }} />
          )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

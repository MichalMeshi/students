import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseDatialPage from '../pages/CourseDatialPage';
import { Button, Card, Row, Col } from 'react-bootstrap'
import CourseContext from '../context/CourseContext';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import '../stylesheets/courseCard.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function CourseCard(props) {
  const { course } = props;
  const { handleUnFavoriteCourse, handleFavoriteCourse, myCourses } = useContext(CourseContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFound = myCourses.find(item => item._id === course._id);
    if (isFound) setFavorite(true);
    AOS.init();
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
    <Card id="course-card" style={{ width: '20rem',height:'100%' }}  data-aos="fade-up" >
      <Card.Img variant="top" src={course.img} />
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
          {course.field}

        </Card.Text>
        <Row>
          <Col md={9}>
            <Button style={{background:"white", border:'none'}} className='button-link'>
              <Link className="card-link" to={`/course_details/${course._id}/${course.name}` }>Get course</Link>
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

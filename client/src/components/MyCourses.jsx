import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import CourseContext from '../context/CourseContext';
import { Col, Container, Row, Alert, Card, Button } from 'react-bootstrap';
import '../stylesheets/myCourses.css'
const MyCourses = () => {
    // const [favorite, setFavorite] = useState(true);
    const { setMyCourses, myCourses } = useContext(CourseContext)
    const [error, setError] = useState("");

    const getMyCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch('http://localhost:3000/courses/my-courses', {
                    headers: {
                        "authorization": token
                    }
                })
                const temp = await res.json();
                if (Array.isArray(temp))
                    setMyCourses([...temp]);
            }
            else
                setError("You have to login to view your courses");

        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getMyCourses();
    }, [])

    return (
        <div className='container-fluid mt-5 pt-3'>
            <div className='container'>
                <Card style={{height:'100%'}}>
                    <Card.Header>
                        <h3 style={{color:'#2d3092'}}>#MY COURSES</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            {console.log(myCourses)}
                        {myCourses.length? myCourses.map((myCourse, index) => {
                            return <Col className='d-flex justify-content-center align-items-center mb-3' md={3} key={index} >
                                <CourseCard
                                    course={myCourse} />
                            </Col>
                        }) :  <p>No courses have been chosen yet.</p>}
                    </Row>
                    </Card.Body>
                </Card>
                {error ? <Alert variant="danger">{error}</Alert> : ""}
            </div>
        </div>
    )
}

export default MyCourses
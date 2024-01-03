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
        // <div className="container-fluid">
        //     <div className="container" style={{ border: "1px solid green" }}>
        //         <h1>My Courses</h1>
        //         <Container>
        //             <Row>
        //                 {myCourses?.map((myCourse, index) => {
        //                     return <Col md={6} key={index} >
        //                         <CourseCard
        //                             course={myCourse} />
        //                     </Col>
        //                 })}
        //             </Row>
        //         </Container>
        //         {error ? <Alert variant="danger">{error}</Alert> : ""}
        //     </div>
        // </div>
        <div className='container-fluid mt-5 pt-3'>
            <div className='container'>
                <Card>
                    <Card.Header>
                        <h3>#MY COURSES</h3>
                    </Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        {/* <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text> */}
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
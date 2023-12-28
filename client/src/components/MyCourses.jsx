import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import CourseContext from '../context/CourseContext';
import { Col, Container, Row } from 'react-bootstrap';

const MyCourses = () => {
    // const [favorite, setFavorite] = useState(true);
    const { setMyCourses, myCourses } = useContext(CourseContext)

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
                console.log("Please Login (from MyCourses)");

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMyCourses();
    }, [])

    return (
        <div>
            <h1>My Courses</h1>
            <Container>
                <Row>
                    {myCourses?.map((myCourse, index) => {
                        return <Col md={6} key={index} >
                            <CourseCard
                                course={myCourse} />
                        </Col>
                    })}
                </Row>
            </Container>
        </div>)
}

export default MyCourses
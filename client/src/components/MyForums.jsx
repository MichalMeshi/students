import React from 'react'
import { Card } from 'react-bootstrap'

export default function MyForums() {
  return (
    <div className='container-fluid mt-5 pt-3'>
    <div className='container'>
        <Card>
            <Card.Header>
                <h3>#MY FORUMS</h3>
            </Card.Header>
            <Card.Body>
                {/* <Row>
                {myCourses.length? myCourses.map((myCourse, index) => {
                    return <Col className='d-flex justify-content-center align-items-center mb-3' md={3} key={index} >
                        <CourseCard
                            course={myCourse} />
                    </Col>
                }) :  <p>No courses have been chosen yet.</p>}
                
            </Row> */}
            <p>No Forums have been created yet.</p>
            </Card.Body>
        </Card>
        {/* {error ? <Alert variant="danger">{error}</Alert> : ""} */}
    </div>
</div>
  )
}

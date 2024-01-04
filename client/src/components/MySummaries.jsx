import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard';

export default function MySummaries() {
    const { summariesById,getSummariesbyId } = useContext(SummaryContext);
    useEffect(() => {
        getSummariesbyId();
        }, [])
    
  return (
    
    <div className='container-fluid mt-5 pt-3'>
    <div className='container'>
        <Card>
            <Card.Header>
                <h3>#MY SUMMARIES</h3>
            </Card.Header>
            <Card.Body>
{                console.log({summariesById})}
        
    {summariesById && summariesById
          .map((summary, index) => (
            <SummaaryCard summary={summary} key={index} />
          ))}

                {/* <Row>
                {myCourses.length? myCourses.map((myCourse, index) => {
                    return <Col className='d-flex justify-content-center align-items-center mb-3' md={3} key={index} >
                        <CourseCard
                            course={myCourse} />
                    </Col>
                }) :  <p>No courses have been chosen yet.</p>}
                
            </Row> */}
            <p>No summeries have been uploaded yet.</p>
            </Card.Body>
        </Card>
        {/* {error ? <Alert variant="danger">{error}</Alert> : ""} */}
    </div>
</div>
  )
}

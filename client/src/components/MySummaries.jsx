import React, { useContext, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard';

export default function MySummaries() {
    const { summariesById, getSummariesbyId } = useContext(SummaryContext);
    useEffect(() => {
        getSummariesbyId();
    }, [])

    return (

        <div className='container-fluid mt-5 pt-3'>
            <div className='container'>
                <Card>
                    <Card.Header>
                        <h3 style={{ color: '#2d3092' }}>#MY SUMMARIES</h3>
                    </Card.Header>
                    <Card.Body>
                        {console.log({ summariesById })}
                        <Row>

                            {summariesById.length ? summariesById
                                .map((summary, index) => (
                                    <Col sm={6} md={4} key={index} className='my-3'><SummaaryCard summary={summary} /></Col>
                                )) : <p>No summeries have been uploaded yet.</p>}
                        </Row>

                    </Card.Body>
                </Card>
                {/* {error ? <Alert variant="danger">{error}</Alert> : ""} */}
            </div>
        </div>
    )
}

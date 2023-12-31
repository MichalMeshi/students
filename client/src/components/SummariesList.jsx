import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'
import { useParams } from 'react-router-dom';
import AddSummary from './AddSummary';
import { FaPlus } from "react-icons/fa";
import MiniProfile from './MiniProfile';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../stylesheets/bluebutton.css'
import Sidebar from './Sidebar';
import MainNavbar from './MainNavbar'
import CourseContext from '../context/CourseContext';
import '../stylesheets/summarylist.css'
export default function SummariesList(props) {
  const { summaries, getSummaries } = useContext(SummaryContext);
  const { courseId, courseName } = useParams();
  console.log("Course ID:", courseId);       // Should log the correct courseId
  console.log("Course Name:", courseName);   // Should log the correct courseName

  const { userConnectedId } = useContext(SummaryContext);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state
  console.log("Course ID:", courseId);       // Log courseId
  console.log("Course Name:", courseName);  // Log courseName
  useEffect(() => {
    getSummaries(courseId);
  }, [courseId])
  return (
    <>
      <MainNavbar />
      <Sidebar courseId={courseId} courseName={courseName} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container>
        <Row className='justify-content-between align-items-center w-100'>
          <Col md={7}>
            <h1 style={{ color: '#2D3092', fontWeight: 'bold' }}>The Summary Collective</h1>
            <p  style={{ color: '#2D3092'}}> Where Learners Connect through Shared Course Knowledge!</p>
          </Col>
          <Col md={2}>
          <Button className='circular-button p-1' onClick={() => setOpenSummaryModal(true)}>Add  new summary</Button>
            {/* <Button id='loginbtn' onClick={() => }> */}
            {/* </Button> */}
          </Col>
        </Row>
        {openSummaryModal &&
          <AddSummary courseId={courseId} openSummaryModal={openSummaryModal} setOpenSummaryModal={setOpenSummaryModal} />
        }

        <Row>
          {summaries
            ?.slice() // create a copy of the array to avoid mutating the original
            .sort((a, b) => b.downloadsAmount - a.downloadsAmount) // sort by summary.sum
            .map((summary, index) => (
              <Col xs={12} md={4} key={index} className='my-2'><SummaaryCard summary={summary} /></Col>
            ))}
        </Row>
      </Container>
    </>

  )
}
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

export default function SummariesList(props) {
  const { summaries, getSummaries } = useContext(SummaryContext);
  const { courseId } = useParams();
  const { userConnectedId } = useContext(SummaryContext);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state

  // console.log({ courseId });
  useEffect(() => {
    getSummaries(courseId);
  }, [courseId])
  return (
    <>
      <Sidebar courseId={courseId} isOpen={isOpen} setIsOpen={setIsOpen} />

      <Container className={`course-detail-page ${isOpen ? 'sidebar-open' : ''} `}>
        <h1>Summary List</h1>

        <Button id='loginbtn' onClick={() => setOpenSummaryModal(true)}>
          <FaPlus className='fs-1' />
        </Button>
        {openSummaryModal &&
          <AddSummary courseId={courseId} openSummaryModal={openSummaryModal} setOpenSummaryModal={setOpenSummaryModal} />
        }

        <div className='row'>
          {console.log({ summaries })}
          {summaries
            ?.slice() // create a copy of the array to avoid mutating the original
            .sort((a, b) => b.downloadsAmount - a.downloadsAmount) // sort by summary.sum
            .map((summary, index) => (
              <SummaaryCard summary={summary} key={index} />
            ))}
        </div>
      </Container>
    </>

  )
}
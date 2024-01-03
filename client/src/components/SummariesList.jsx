import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'
import { useParams } from 'react-router-dom';
import AddSummary from './AddSummary';
import { FaPlus } from "react-icons/fa";
import MiniProfile from './MiniProfile';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function SummariesList(props) {
  const { summaries, getSummaries } = useContext(SummaryContext);
  const { courseId } = useParams();
  const { userConnectedId } = useContext(SummaryContext);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // console.log({ courseId });
  useEffect(() => {
    getSummaries(courseId);

  }, [courseId])
  return (
    <div className='container'>
      <h1>Summary List</h1>

      <Button variant='dark' onClick={() => setOpenSummaryModal(true)}>
        <FaPlus style={{ background: 'grey', color: 'white' }} className='fs-1' />
      </Button>
      {openSummaryModal && 
            <AddSummary courseId={courseId} openSummaryModal={openSummaryModal} setOpenSummaryModal={setOpenSummaryModal} />
      }

      <div className='row'>
        {summaries
          ?.slice() // create a copy of the array to avoid mutating the original
          .sort((a, b) => b.downloadsAmount - a.downloadsAmount) // sort by summary.sum
          .map((summary, index) => (
            <SummaaryCard summary={summary} key={index} />
          ))}
      </div>
    </div>
  )
}
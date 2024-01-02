import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'
import { useParams } from 'react-router-dom';
import AddSummary from './AddSummary';
import { FaPlus } from "react-icons/fa";
import MiniProfile from './MiniProfile';

export default function SummariesList(props) {
  const { summaries, getSummaries } = useContext(SummaryContext);
  const { courseId } = useParams();
  const { userConnectedId } = useContext(SummaryContext);

  console.log({ courseId });
  useEffect(() => {
    getSummaries(courseId);

  }, [courseId])
  return (
    <div className='container'>
      <h1>Summary List</h1>
      <AddSummary courseId={courseId} />
      <div className='row'>
        <FaPlus style={{ background: 'grey', color: 'white' }} className='fs-1' />
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
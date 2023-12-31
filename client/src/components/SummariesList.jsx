import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'

export default function SummariesList(props) {
  const {summaries,getSummaries} = useContext(SummaryContext);
const {courseId}=props;
  useEffect(() => {
    console.log(summaries);
    getSummaries(courseId);

  }, [])
  return (
    <div className='container'>
      <h1>Summary List</h1>
      {console.log("summaries",summaries)}
      <div className='row'>
      {summaries?.map((summary, index) => {
        return <SummaaryCard summary={summary} key={index} />
      })}
      </div>
    </div>
  )
}
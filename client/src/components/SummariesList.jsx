import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'

export default function SummariesList() {
  const {summaries,getSummaries} = useContext(SummaryContext);
  // const [summaries,setsummaries] = useState([]);
//   const getMySummaries= async()=>{
// const newSummary = await getSummaries();
// setsummaries(newSummary)

//   }
  useEffect(() => {
    getSummaries();

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
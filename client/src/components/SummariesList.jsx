import React, { useContext, useEffect, useState } from 'react'
import SummaryContext from '../context/SummaryContext'
import SummaaryCard from './SummaryCard'

export default function SummariesList(props) {
  const { summaries, getSummaries } = useContext(SummaryContext);
  const { courseId } = props;
  const help = async()=>{
   
    // const a2= await a.json();
    console.log({a});
    // return a2;
    return a;

  }
  useEffect(() => {
    // const a=help();
    getSummaries(courseId);
    // setuserConnectedId(a);
    // id=a;

  }, [])
  return (
    <div className='container'>
      {/* {console.log(userConnectedId)} */}
      <h1>Summary List</h1>
      {/* {console.log("summaries",summaries)} */}
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
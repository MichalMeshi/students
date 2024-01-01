import React, { useEffect, useState,useContext } from 'react'
import SummaryContext from '../context/SummaryContext';
SummaryContext

export default function SummaaryCard(props) {
  const [downloads, setdownloads] = useState(0);
  const { summaries, setsummaries ,userConnectedId} = useContext(SummaryContext);

  const { summary } = props;

  useEffect(() => {
    setdownloads(summary.downloadsAmount);
  }, [])
  const updateDownloadsSum = async () => {
    console.log({ downloads });
    try {
      const response = await fetch('http://localhost:3000/upload/' + summary._id, {
        method: 'PUT',
        body: JSON.stringify({ downloadsAmount: downloads + 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const res = await response.json();
      console.log({ res });
      return res;
    } catch (error) {
      console.error('Error during url put:', error);
    }

  }
  const onButtonClickDelete = async(url)=>{
    try {
      const response = await fetch('http://localhost:3000/upload/' + summary._id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      const res = await response.json();
      console.log({ summaries });
      setsummaries(summaries.filter(summary => summary.url !== url));

      return res;

    } catch (error) {
      console.error('Error during delete:', error);
    }
    console.log('delete ', url);
  }
  const onButtonClickDownload = (url) => {
    setdownloads(downloads + 1);
    updateDownloadsSum()
    //update downloads to db
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const fileURL =
          window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = url.split("/").at(-1);
        alink.click();

      });
    });
  }

  return (
    <div className="card col-sm-12 col-md-4" style={{ width: "18rem" }}>
      <embed src={summary.url} type="application/pdf" className='card-top w-100' />
      <div className="card-body">
        <h5 className="card-title">{summary.title}</h5>
        <p className="card-text">description: {summary.description}</p>
        <p className="card-text">{downloads} downloads </p>
        <p className="card-text">created by: {summary.userId} </p>
        <button className='btn btn-info m-2' onClick={() => { onButtonClickDownload(summary.url) }}>
          Download PDF
        </button>
      
        {summary.userId === userConnectedId && (
      <button className='btn btn-info m-2' onClick={() => { onButtonClickDelete(summary.url) }}>
        Delete PDF
      </button>
    )}
         </div>
    </div>



  )
}

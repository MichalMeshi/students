import React, { useEffect, useState, useContext } from 'react'
import SummaryContext from '../context/SummaryContext';
import { GoDownload } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { Link } from 'react-router-dom';
import MiniProfile from './MiniProfile';


export default function SummaaryCard(props) {
  const [downloads, setdownloads] = useState(0);
  const { summaries, setsummaries, userConnectedId } = useContext(SummaryContext);

  const { summary } = props;

  useEffect(() => {
    setdownloads(summary.downloadsAmount);
  }, [])
  const updateDownloadsSum = async () => {
    try {
      const response = await fetch('http://localhost:3000/upload/' + summary._id, {
        method: 'PUT',
        body: JSON.stringify({ downloadsAmount: downloads + 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const res = await response.json();
      return res;
    } catch (error) {
      console.error('Error during url put:', error);
    }

  }
  const onButtonClickDelete = async (url) => {
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
  const onButtonClickPreviwo = (url) => {
    window.open(url, '_blank');
  }


  return (
    <div className="card col-sm-12 col-md-4 d-flex m-3 shadow p-3 mb-5 bg-white rounded" style={{ width: "18rem" }}>
      <p className="card-text"><MiniProfile userId={summary.userId} /> </p>

      <embed src={summary.url} type="application/pdf" className='card-top w-100' />
      <div className="card-body">
        <hr className="border border-danger m-0" />
        <div className='h-50'>
          <h5 className="card-title display-6 ">{summary.title}</h5>

        </div>

        {/* <h5 className="card-title">{summary.title}</h5> */}

        {/* <p className="card-text">{summary.description}</p> */}

        <p className="card-text">{downloads} downloads </p>

        <div className='d-flex align-items-center justify-content-between'>
          <button className='btn btn-info m-2' onClick={() => { onButtonClickDownload(summary.url) }}>
            <GoDownload className='fs-2' />

          </button>
          <button className='btn btn-info m-2' onClick={() => { onButtonClickPreviwo(summary.url) }}>
            <FaEye className='fs-2' />
          </button>
          {summary.userId.id === userConnectedId && (

            <button className='btn btn-info m-2 ' onClick={() => { onButtonClickDelete(summary.url) }}>
              <MdDeleteOutline className='fs-2' />
            </button>
          )}
        </div>
        <div className='d-flex'>
        </div>

      </div>
    </div>



  )
}

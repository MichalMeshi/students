import React, { useEffect, useState, useContext } from 'react'
import SummaryContext from '../context/SummaryContext';
import { GoDownload } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import '../stylesheets/bluebutton.css'
import { Link } from 'react-router-dom';
import MiniProfile from './MiniProfile';
import { Alert, Button } from 'react-bootstrap';


export default function SummaaryCard(props) {
  const [downloads, setdownloads] = useState(0);
  const { summaries, setsummaries, userConnectedId } = useContext(SummaryContext);

  const [error, setError] = useState("");

  const { summary } = props;


  useEffect(() => {
    setdownloads(summary.downloadsAmount);
    console.log({summary});
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
      setError('Error during url put:', error);
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
      setError('Error during delete:', error);
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
    <>
      <div className="card col-sm-12 col-md-4 d-flex align-items-center justify-content-center m-3 shadow p-3 mb-5 bg-white rounded" style={{ width: "18rem" }}>
          <MiniProfile userId={summary.userId}/>
        <embed src={summary.url} type="application/pdf" className='card-top w-100'/>

        <div className="card-body">
          <hr className="border border-info m-0" />

          <h5 className="card-title display-6 h-50">{summary.title}</h5>


          <p className="card-text">{downloads} downloads </p>

          <div className='d-flex align-items-center justify-content-around'>
            {/* <p className="card-text">{downloads} downloads </p> */}
            <Button id = 'loginbtn' className=' m-2' onClick={() => { onButtonClickDownload(summary.url) }}>
              <GoDownload className='fs-2' />

            </Button>
            <Button id = 'loginbtn' className=' m-2' onClick={() => { onButtonClickPreviwo(summary.url) }}>
              <FaEye className='fs-2' />
            </Button>
            {console.log({summary})}
            {(summary.userId?.id === userConnectedId || summary.userId === userConnectedId ) && (

              <Button id = 'loginbtn' className=' m-2 ' onClick={() => { onButtonClickDelete(summary.url) }}>
                <MdDeleteOutline className='fs-2' />
              </Button>
            )}


      
        </div>
        <div className='d-flex'>
        </div>

      </div>
    </div >



    </>
  )
}

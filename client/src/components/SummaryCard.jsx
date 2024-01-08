import React, { useEffect, useState, useContext } from 'react'
import SummaryContext from '../context/SummaryContext';
import { GoDownload } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import '../stylesheets/bluebutton.css'
import { Link } from 'react-router-dom';
import MiniProfile from './MiniProfile';
import { Alert, Button, Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SummaaryCard(props) {
  const [downloads, setdownloads] = useState(0);
  const { summaries, setsummaries, userConnectedId } = useContext(SummaryContext);

  const [error, setError] = useState("");

  const { summary } = props;


  useEffect(() => {
    setdownloads(summary.downloadsAmount);
    console.log({ summary });
    AOS.init();
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

    <Card data-aos="fade-up" className="shadow p-3 bg-white rounded" style={{ height: '100%' }}>
      <MiniProfile userId={summary.userId} />
      <hr />
      <embed src={summary.url} type="application/pdf" className='card-top w-100' />

      <Card.Title>
        <hr className="border border-info m-0" />

        <h5 className="card-title display-6" >{summary.title}</h5>


        <p className="card-text">{downloads} downloads </p>
      </Card.Title>
      <Card.Body>
        <Card.Text>
        <div className=' d-flex align-items-center justify-content-around '>
          {/* <p className="card-text">{downloads} downloads </p> */}
          <btn id='summarybtn' className=' m-2 btn' onClick={() => { onButtonClickDownload(summary.url) }}>
            <GoDownload className='fs-2' />

          </btn>
          <btn id='summarybtn' className=' m-2 btn' onClick={() => { onButtonClickPreviwo(summary.url) }}>
            <FaEye className='fs-2' />
          </btn>
          {console.log({ summary }, { userConnectedId })}
          {((summary.userId === userConnectedId) || (summary.userId?.id === userConnectedId)) && (

            <btn id='summarybtn' className=' m-2 btn' onClick={() => { onButtonClickDelete(summary.url) }}>
              <MdDeleteOutline className='fs-2' />
            </btn>
          )}
        </div>
        </Card.Text>
      </Card.Body>
    </Card >
  )
}

import React, { useContext, useRef, useState } from 'react'
import SummaryContext from '../context/SummaryContext';
import { Button, Form, Modal } from 'react-bootstrap';
import ProfileContext from '../context/ProfileContext';
// import { Summary } from '../../../server/models/summary.models';
// const { Summary } =require('../../../server/models/summary.models');

export default function AddSummary(props) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const { summaries, setsummaries } = useContext(SummaryContext);
    const { profileData } = useContext(ProfileContext)
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadStatus(null);
    };

    const { openSummaryModal, setOpenSummaryModal, courseId } = props;
    const addUrlToDb = async (url, courseId) => {
        try {
            const response = await fetch('http://localhost:3000/upload/url/' + courseId, {
                method: 'POST',
                body: JSON.stringify({ url: url, title: title }),
                headers: {
                    "authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            const res = await response.json();
            console.log("aaa", { res });
            return res;
        } catch (error) {
            setError(`Error during url upload: ${error}`);
        }
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }


    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when upload starts
        const formData = new FormData();
        formData.append('file', file);
        try {
            console.log("i am here");
            const response = await fetch('http://localhost:3000/upload', {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
                method: 'POST',
                body: formData,
            });

            const a = await response.json();
            // console.log({ a });
            if (response.ok) {
                setUploadStatus('File uploaded successfully!');
                setOpenSummaryModal(false)
            } else {
                setUploadStatus('Error uploading file. Please try again.');
            }
            // console.log(a.secure_url);
            const mySummary = await addUrlToDb(a.secure_url, courseId);
            // console.log(Summary.mySummary).populate("userId");
            setsummaries([...summaries, mySummary]);
            setLoading(false);


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={openSummaryModal} onHide={() => setOpenSummaryModal(false)}>
            <Modal.Header closeButton>
                Add Summary
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpload} className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Group controlId="contactInfo" className='w-75 text-center'>
                        <Form.Label>Choose a file</Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group controlId="contactInfo" className='w-75 text-center my-4'>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={handleTitle}
                            placeholder="Write a title to the file"
                            required
                        />
                    </Form.Group>
                    <Button id='loginbtn' type="submit" className='mt-3' disabled={!file || loading}>
                        Upload
                    </Button>
                </Form>
                <div className='text-center'>
                    {loading && <img src={'https://cdn.pixabay.com/animation/2023/11/30/10/11/10-11-02-622_512.gif'} width={100} alt="Loading..." />}
                </div>
                {uploadStatus && <p className={uploadStatus.includes('Error') ? 'text-danger' : 'text-success'}>{uploadStatus}</p>}
            </Modal.Body>

        </Modal>



        // <div>
        //     <div className='card p-3 container'>

        //         <h2> Add Summary:</h2>

        //         <form>
        //             <label htmlFor="file">Choose a file:</label>
        //             <input type="file" className='form-control' lang="en-GB" id="file" onChange={handleFileChange} ref={inputRef} required/>
        //             <label>title:</label>
        //             <input type="text" className='form-control' name="title" onChange={handleTitle} />
        //             <button type="button" className='btn btn-primary btn-block btn-outlined m-2'
        //                 disabled={!file || !title}
        //                 onClick={handleUpload}>
        //                 Upload
        //             </button>
        //         </form>
        //         {uploadStatus && <p className={uploadStatus.includes('Error') ? 'text-danger' : 'text-success'}>{uploadStatus}</p>}
        //     </div>
        //     {error?<Alert variant="danger">{error}</Alert>:""}
        // </div>
    )
}

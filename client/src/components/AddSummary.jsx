import React, { useContext, useRef, useState } from 'react'
import SummariesList from './SummariesList';
import SummaryContext from '../context/SummaryContext';


export default function AddSummary() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const { summaries, setsummaries } = useContext(SummaryContext);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadStatus(null);
    };
    const inputRef = useRef(null);

    const addUrlToDb = async (url) => {
        try {
            const response = await fetch('http://localhost:3000/upload/url', {
                method: 'POST',
                body: JSON.stringify({ url: url }),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            const res= await response.json();
            return res;
        } catch (error) {
            console.error('Error during url upload:', error);
        }
    }
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });
            const a = await response.json();
            console.log({ a });
            if (response.ok) {
                setUploadStatus('File uploaded successfully!');
            } else {
                setUploadStatus('Error uploading file. Please try again.');
            }
            console.log(a.secure_url);
            const mySummary = await addUrlToDb(a.secure_url);
            console.log(mySummary);
            setsummaries([...summaries, mySummary]);

        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    return (
        <div>
            <div className='card p-3 container'>

                <h2> Add Summary:</h2>

                <form>
                    <label htmlFor="file">Choose an image:</label>
                    <input type="file" lang="en-GB" id="file" onChange={handleFileChange} ref={inputRef} />
                    <button type="button" className='btn btn-primary btn-block btn-outlined' onClick={handleUpload}>
                        Upload
                    </button>
                </form>
                {uploadStatus && <p className={uploadStatus.includes('Error') ? 'text-danger' : 'text-success'}>{uploadStatus}</p>}
            </div>
        </div>
    )
}

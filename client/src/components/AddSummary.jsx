import React, { useRef, useState } from 'react'


export default function AddSummary() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadStatus(null);
    };
    const inputRef = useRef(null);
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });
            const a = await response.json();
            if (response.ok) {
                setUploadStatus('File uploaded successfully!');
            } else {
                setUploadStatus('Error uploading file. Please try again.');
            }
            console.log("response",a.data.secure_url);
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

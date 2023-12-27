import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import TutoringPost from './TutoringPost';

const Tutoring = () => {
    const [tutoringPosts, setTutoringPosts] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [postData, setPostData] = useState({
        subject: '',
        field: '',
        message: '',
        city: '',
        contactInfo: ''
    })
    useEffect(() => {
        getTutoringPosts();
    }, [tutoringPosts])

    const getTutoringPosts = async () => {
        const res = await fetch('http://localhost:3000/tutoring/tutoring-posts', {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        const temp = await res.json()
        setTutoringPosts([...temp]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(false);
        const response = await fetch('http://localhost:3000/tutoring/add-tutoring', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-type': 'application/json',
                "authorization": localStorage.getItem("token")
            }
        });
        if (!response)
            alert("failed");
        else
            alert("success")
    };

    const addTutoring = async () => {
        setIsClicked(true);
    }

    return (
        <div>
            <Button onClick={addTutoring}>Add</Button>
            <h1>Tutoring List</h1>
            {/* {console.log(courses)} */}
            {tutoringPosts?.map((post, index) => {
                return <TutoringPost post={post} key={index} />
            })}
            <Modal show={isClicked} onHide={() => setIsClicked(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tutoring Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={postData.subject}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="field">
                            <Form.Label>Field</Form.Label>
                            <Form.Control
                                type="text"
                                name="field"
                                value={postData.field}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                value={postData.message}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={postData.city}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="contactInfo">
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactInfo"
                                value={postData.contactInfo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Tutoring
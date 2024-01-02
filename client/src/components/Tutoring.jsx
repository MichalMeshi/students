import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import TutoringPost from './TutoringPost';

const Tutoring = () => {
    const [tutoringPosts, setTutoringPosts] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState("");
    const [postData, setPostData] = useState({
        subject: '',
        field: '',
        message: '',
        city: '',
        contactInfo: ''
    })
    useEffect(() => {
        getTutoringPosts();
    }, [isClicked])

    const getTutoringPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch('http://localhost:3000/tutoring/tutoring-posts', {
                    headers: {
                        "authorization": localStorage.getItem("token")
                    }
                })
                const temp = await res.json();
                if (Array.isArray(temp))
                    //sort
                    setTutoringPosts([...temp.reverse()]);
            }
            else
                setError("Please Login to view your tutoring posts");
        } catch (error) {
            setError(error.message);
        }
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
        const data = await response.json();
        if (data)
            console.log(data.msg);

    };


    return (
        <div>
            <Container>
            <h1>Tutoring List</h1>
            <Button onClick={() => setIsClicked(true)}>Add Post</Button>
                <Row>
                    {tutoringPosts?.map((post, index) => {
                        return <Col md={6} key={index}><TutoringPost post={post} /></Col>
                    })}
                </Row>
            </Container>
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
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="field">
                            <Form.Label>Field</Form.Label>
                            <Form.Control
                                type="text"
                                name="field"
                                value={postData.field}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                value={postData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={postData.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contactInfo">
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactInfo"
                                value={postData.contactInfo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {error ? <Alert variant="danger">{error}</Alert> : ""}
        </div>
    )
}

export default Tutoring
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import TutoringPost from './TutoringPost';
import '../stylesheets/bluebutton.css'

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
        const dataToSend = {
            ...postData,
            dateCreated: Date.now(),
        };
        const response = await fetch('http://localhost:3000/tutoring/add-tutoring', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
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
            <Container style={{ width: '50%', fontFamily: 'Arial, sans-serif' }}>
                <Row className="mt-4 d-flex justify-content-between align-items-center">
                    <Col md={6}>
                        <h2 style={{ color: '#2D3092', fontWeight: 'bold' }}>Tutoring Posts</h2>
                    </Col>
                    <Col md={2} >
                        <Button style={{ backgroundColor: '#5055d1' ,width:'100%'}} onClick={() => setIsClicked(true)}>Post</Button>
                    </Col>
                </Row>

                <Row className='justify-content-center'>
                    {tutoringPosts?.map((post, index) => {
                        return <Col md={12} key={index} className='d-flex justify-content-center'><TutoringPost post={post} /></Col>
                    })}
                </Row>
            </Container>

            <Modal show={isClicked} onHide={() => setIsClicked(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tutoring Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                        <Form.Group controlId="subject" className='w-75 text-center'>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={postData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="field"  className='w-75 text-center'>
                            <Form.Label>Field</Form.Label>
                            <Form.Control
                                type="text"
                                name="field"
                                value={postData.field}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="message"  className='w-75 text-center'>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                value={postData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="city" className='w-75 text-center'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={postData.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contactInfo" className='w-75 text-center'>
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactInfo"
                                value={postData.contactInfo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button id='loginbtn' type="submit" className='mt-3'>
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
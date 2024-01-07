import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import TutoringPost from './TutoringPost';
import '../stylesheets/bluebutton.css'
import '../stylesheets/tutoring.css'
import MainNavbar from './MainNavbar'
import Footer from '../components/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        AOS.init();
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
        setTutoringPosts([...tutoringPosts, data.newPost])

    };


    return (
        <div >
            <MainNavbar />
            <Container>
                {/* <Row>
                    <Col md={10}>
                        <h2>Tutoring Posts</h2>
                    </Col>
                    <Col md={2} >
                    </Col>
                </Row> */}

                <div data-aos="zoom-in" data-aos-duration="1000"  id='tutring-title' className='d-flex justufy-content-center align-items-center p-4'>
                    <div>
                        <Row className='w-100'>
                            <Col  xs={12} md={4} className='d-flex justify-content-center align-items-center'>
                             <img id='img-strip' src="https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg" alt="" />
                                
                            </Col>
                            <Col xs={12} md={8} className='tutoring-subtitle'>
                                <h1>Skill Swap Central</h1>
                                <h5> Exchange Private Lessons and Boost Your Expertise!</h5>
                                <div>Welcome to our vibrant community where learning knows no bounds! Here, you can post your expertise and trade private lessons with fellow enthusiasts. Embrace the spirit of mutual learning and open the door to a world of shared knowledge.</div>
                                <button id='post-btn' className='btn mt-3' onClick={() => setIsClicked(true)}>Add your post</button>
                            </Col>
                        </Row>
                    </div>
                </div>

                <Row className='my-3'>
                    {tutoringPosts?.map((post, index) => {
                        return <Col xs={12} sm={12} md={6} key={index} className='d-flex justify-content-center'><TutoringPost post={post} /></Col>
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
                        <Form.Group controlId="field" className='w-75 text-center'>
                            <Form.Label>Field</Form.Label>
                            <Form.Control
                                type="text"
                                name="field"
                                value={postData.field}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="message" className='w-75 text-center'>
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
            <Footer/>
        </div>
    )
}

export default Tutoring
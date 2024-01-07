import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import '../stylesheets/bluebutton.css'
import '../stylesheets/login.css'
import { useNavigate } from 'react-router';
import contactImg from '../images/contactImage.png'
import MainNavbar from './MainNavbar'

const Contact = () => {
    const [contactData, setContactData] = useState({
        // name: '',
        email: '',
        subject: '',
        message: ''
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // add this state variable
    const [emailSent, setEmailSent] = useState(false);
    const contactUsInEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true); // set isLoading to true

        const url = 'http://localhost:3000/users/contact'
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    email: contactData.email,
                    subject: contactData.subject,
                    message: contactData.message,
                }),
            });
            const data = await res.json();
            if (data) {
                console.log(data.msg);
                setIsLoading(false);
                setEmailSent(true);
            }
        } catch (err) {
            console.log(err.message);
            setIsLoading(false);
            setEmailSent(false);
        }
    }

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <MainNavbar />
            <Container fluid>
                <Row>
                    {!emailSent ?
                        <Col className='ml-4 d-flex justify-content-center flex-column align-items-center'>
                            <h1 style={{ color: '#2D3092' }} className='text-left'>Contact us</h1>
                            <Form onSubmit={contactUsInEmail} className='w-75'>
                                <Form.Group controlId="email" className="mt-4">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={contactData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="subject" className="mt-4">
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        value={contactData.subject}
                                        onChange={handleChange}
                                        placeholder="Subject"
                                        required

                                    />
                                </Form.Group>
                                <Form.Group controlId="message" className="mt-4">
                                    <Form.Control
                                        as="textarea"  // This changes the input to a textarea
                                        name="message"
                                        value={contactData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message"
                                        required
                                    />
                                </Form.Group>

                                <div className='d-flex justify-content-center'>
                                    <Button id='loginbtn' type="submit" className='mt-4' disabled={isLoading}>
                                        Send Message
                                    </Button>
                                </div>
                            </Form>
                            <div className='text-center mt-4'>
                                {isLoading && <Spinner animation="border" className='blueText' />}
                            </div>
                        </Col>

                        :
                        <Col className='m-5 d-flex justify-content-center flex-column align-items-center'>
                            <h1 style={{ color: '#2D3092' }}>Thank you for<br /> contact us.<br /> We will answer<br /> you soon :)<br /></h1>
                            <Button id='loginbtn' onClick={() => { navigate('/') }} className='mt-4'>Home</Button>
                        </Col>}
                    <Col xs={12} md={6} style={{ height: '100vh' }}>
                        <img className="w-100 h-100" src={contactImg} alt="contact" />
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default Contact
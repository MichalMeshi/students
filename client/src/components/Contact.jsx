import React, { useState } from 'react'
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import '../stylesheets/bluebutton.css'
import '../stylesheets/login.css'
import { useNavigate } from 'react-router';

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
        <Container className='d-flex justify-content-center mt-4'>
            {!emailSent ? <Card style={{ width: '24em' }} className='p-3'>
                <h4>Contact us when you want :)</h4>
                <Form onSubmit={contactUsInEmail}>
                    {/* <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="subject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject"
                            value={contactData.subject}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"  // This changes the input to a textarea
                            value={contactData.message}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className='d-flex justify-content-center'>
                        <Button id='loginbtn' type="submit" className='mt-4' disabled={isLoading}>
                            Send
                        </Button>
                    </div>
                </Form>
                <div className='text-center mt-4'>
                    {isLoading && <Spinner animation="border" className='blueText' />}
                </div>
                {/* {error ? <Alert variant="danger">{error}</Alert> : ""} */}
            </Card> :
                <div>
                    <h1>Thank you for contact us, we will answer you soon:)</h1>
                    <Button id='loginbtn' onClick={() => { navigate('/') }}>Home</Button>
                </div>
            }
        </Container>
    )
}

export default Contact
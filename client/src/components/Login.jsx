import React, { useContext, useState } from 'react'
import { Card, Form, Button, Modal } from 'react-bootstrap'
import { fetchUser } from '../service/httpService';
import { Link, useNavigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');

    const { login } = useContext(ProfileContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login");
        try {
            const res = await login(formData);
            if (res)
                navigate('/');
            else
                alert(res.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const forgotPassword = async (e) => {
        e.preventDefault();
        console.log("send email in forgot password");
        setIsClicked(false);
        try {
            const response = await fetch('http://localhost:3000/users/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log(data.msg);
                navigate('/verify');
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='my-3'>Login</h1>
            <Card style={{ width: "24em", background: 'black', color: 'white' }} className="d-flex flex-column justify-content-center align-items-center">
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password || ''} onChange={handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-center w-100">
                        <Button variant="secondary" type="submit" className="w-50">
                            Login
                        </Button>
                    </div>
                </Form>
                <p><Link onClick={() => setIsClicked(true)}>Forgot Password?</Link></p>
                <Modal show={isClicked} onHide={() => setIsClicked(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={forgotPassword}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Get link to reset password
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <h6>Not User? Need to <Link to='/register'>Register</Link></h6>
            </Card>
        </div>
    )
}

export default Login;


import React, { useContext, useState } from 'react'
import { Card, Form, Button, Modal } from 'react-bootstrap'
import { fetchUser } from '../service/httpService';
import { Link, useNavigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';
// import { CiLogin } from "react-icons/ci";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

import '../stylesheets/login.css'
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
        // <div className='d-flex flex-column justify-content-center align-items-center'>
        //     <h1 className='my-3'>Login</h1>
            <Card style={{ width: "24em", textAlign:"center" }} className="d-flex flex-column justify-content-center align-items-center p-4 ">
                <HiOutlineDocumentArrowDown color='#2d3092' size={60}/>
                <p>Enter your user connection details</p>
                <Form style={{ width: "24em"}} onSubmit={handleSubmit} className="w-100 d-flex flex-column justify-content-center align-items-center ">
                    <Form.Group className=" w-100 mb-3 d-flex flex-column justify-content-center align-items-center " controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='w-75' type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className=" w-100 mb-3 d-flex flex-column justify-content-center align-items-center " controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  className='w-75'  type="password" name="password" value={formData.password || ''} onChange={handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-center w-100 mb-2">
                        <Button id='loginbtn' type="submit" className="w-25">
                            Sign In
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
                <h6>Need an account ? please <Link to='/register'>Register</Link></h6>
            </Card>
        // </div>
    )
}

export default Login;


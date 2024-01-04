import React, { useContext, useEffect, useState } from 'react'
import { Card, Form, Button, Modal, Alert, Spinner } from 'react-bootstrap'
import { fetchUser } from '../service/httpService';
import { Link, useNavigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';
// import { CiLogin } from "react-icons/ci";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { IoLogInOutline } from "react-icons/io5";

import '../stylesheets/login.css'
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const { login } = useContext(ProfileContext);
    const [isLoading, setIsLoading] = useState(false); // add this state variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login");
        try {
            const res = await login(formData);
            console.log("res", res);
            if (res)
                navigate('/personalArea');
            else {
                console.log("in else");
                setError("Wrong email or password");
            }
        } catch (error) {
            console.log("in catch", error.message);
            setError(error.message);
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
        setIsLoading(true); // set isLoading to true
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
                setIsLoading(false);
                // navigate('/verify');
                const newUrl = window.location.href + 'verify'; // Append '/verify' to current URL
                const newTab = window.open(newUrl, '_blank'); // Open new URL in a new tab
                // Focus on the new tab
                if (newTab) {
                    newTab.focus();
                    setIsClicked(false);
                }
            }

        } catch (error) {
            setError(error.message);
        }
    }


    return (
        // <div className='d-flex flex-column justify-content-center align-items-center'>
        //     <h1 className='my-3'>Login</h1>

        <div style={{ width: "20em", textAlign: "center" }} className="d-flex flex-column justify-content-center align-items-center p-2 ">
            <IoLogInOutline color='#2d3092' size={60} />
            <p>Enter your user connection details</p>
            <Form style={{ width: "24em" }} onSubmit={handleSubmit} className="w-100 d-flex flex-column justify-content-center align-items-center ">
                <Form.Group className=" w-100 mb-3 d-flex flex-column justify-content-center align-items-center " controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className='w-75' type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className=" w-100 mb-3 d-flex flex-column justify-content-center align-items-center " controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='w-75' type="password" name="password" value={formData.password || ''} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex justify-content-center w-100 mb-2">
                    <Button id='loginbtn' type="submit" className="w-25">
                        Sign In
                    </Button>
                </div>
            </Form>
            <p><Link onClick={() => setIsClicked(true)}>Forgot Password?</Link></p>
            <Modal show={isClicked} onHide={() => { setIsClicked(false); setIsLoading(false); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset your password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={forgotPassword} className='text-center'>
                        <Form.Group className=" w-100 mb-3 d-flex flex-column justify-content-center align-items-center " controlId="email">
                            <Form.Label>Enter your email</Form.Label>
                            <Form.Control
                                className='w-75'
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button id='getLink' type="submit" disabled={isLoading}>
                            Email me a code to reset password
                        </Button>
                    </Form>
                    <div className='text-center mt-4'>
                        {isLoading && <Spinner animation="border" className='blueText' />}
                        {/* <Spinner animation="border" className='blueText' /> */}
                    </div>
                </Modal.Body>
            </Modal>
            {/* <h6>Need an account ? please <Link to='/register'>Register</Link></h6> */}
            {error ? <Alert variant="danger">{error}</Alert> : ""}
        </div>
        // </div>
    )
}

export default Login;


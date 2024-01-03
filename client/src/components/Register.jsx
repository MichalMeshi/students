import React, { useContext, useState } from 'react'
import { Card, Form, Button, Alert,Row,Col } from 'react-bootstrap'
import { fetchUser } from '../service/httpService';
import { useNavigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';
import { LuPenSquare } from "react-icons/lu";
import '../stylesheets/register.css'
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        college: '',
        address: '',
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    })
    const { register } = useContext(ProfileContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            if (res) {
                navigate('/personalArea')
            }
            else {
                setError("Something went wrong in registration");
            }
        } catch (error) {
            setError(error.message);
        }
    }



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        // <div className='d-flex flex-column justify-content-center align-items-center'>
        //     <h1 className='my-3'>REGISTER</h1>
        <div style={{ width: "22em",textAlign:"center"}} className="d-flex flex-column justify-content-center align-items-center p-4">
            <LuPenSquare color='#2d3092' size={50} />
            <p>Please fill the details below</p>
            <Form onSubmit={handleSubmit} className="w-100" autoComplete="off">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                </Form.Group>
                <Row>
                    <Col xs={6} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password || ''} onChange={handleChange} required />
                </Form.Group>
                </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6}>
                <Form.Group className="mb-3" controlId="formBasicCollege">
                    <Form.Label>College</Form.Label>
                    <Form.Control type="text" name="college" value={formData.college || ''} onChange={handleChange} required />
                </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address || ''} onChange={handleChange} required />
                </Form.Group>
                </Col>
                </Row>
                <div className="d-flex justify-content-center w-100">
                    <Button id='registerbtn' variant="secondary" type="submit" className="w-50">
                        Sign Up
                    </Button>
                </div>
            </Form>
            {error ? <Alert variant="danger">{error}</Alert> : ""}

        </div>
        // </div>
    )
}

export default Register;


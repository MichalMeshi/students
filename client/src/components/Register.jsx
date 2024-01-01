import React, { useContext, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { fetchUser } from '../service/httpService';
import { useNavigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        college: '',
        address: '',
        image: ''
    })
    const { register } = useContext(ProfileContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("register");
        try {
            const res = await register(formData);
            if (res) {
                navigate('/')
            }
            else {
                alert("error in regsiter")
            }
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

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='my-3'>REGISTER</h1>
            <Card style={{ width: "24em", background: 'black', color: 'white' }} className="d-flex flex-column justify-content-center align-items-center">
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCollege">
                        <Form.Label>College</Form.Label>
                        <Form.Control type="text" placeholder="College" name="college" value={formData.college || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" name="address" value={formData.address || ''} onChange={handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-center w-100">
                        <Button variant="secondary" type="submit" className="w-50">
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default Register;


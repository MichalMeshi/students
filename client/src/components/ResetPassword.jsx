import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate()
    const {resetToken} = useParams();
    const [error, setError] = useState("");
    console.log(resetToken);
    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };
    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/reset-password/${resetToken}`, {
                method: 'POST',
                body: JSON.stringify(passwords),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            if (data.user) {
                navigate('/login');
                localStorage.setItem("token", data.token)
            } else {
                setError("reset password failed");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <Form onSubmit={resetPassword}>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={passwords.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>
            {error? <Alert variant="danger">{error}</Alert>:""}   
        </div>
    )
}

export default ResetPassword
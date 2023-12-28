import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VerifyToken = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const verifyToken = async (e) => {
        console.log("clicked");
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/verify/${token}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                console.log("verify token successfully");
                const url = `/reset-password/${token}`;
                console.log({ url });
                navigate(`/reset-password/${token}`);
            } else {
                console.log("verify failed");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <Form onSubmit={verifyToken}>
                <Form.Group controlId="token">
                    <Form.Label>Token</Form.Label>
                    <Form.Control
                        type="token"
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Verify Token
                </Button>
            </Form>
        </div>
    )
}

export default VerifyToken
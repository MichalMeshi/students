import React from 'react'

const Register = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='my-3'>REGISTER</h1>
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
                        <Button variant="secondary" type="submit" className="w-25">
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default Register;


import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/bluebutton.css'
const CodeVerification = () => {
    const [codes, setCodes] = useState(['', '', '', '', '']); // Array to hold 5 codes
    const navigate = useNavigate();
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]; // Refs for each input

    const handleChange = (index, value) => {
        if (value.length > 1) return; // Limit input to one character
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);
        if (value && index < 4) {
            refs[index + 1].current.focus(); // Move focus to next input
        }
    };

    const handleBackspace = (index) => {
        if (index > 0) {
            refs[index - 1].current.focus(); // Move focus to previous input
            const newCodes = [...codes];
            newCodes[index - 1] = ''; // Clear value of previous input
            setCodes(newCodes);
        }
    };

    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('Text').trim();
        if (pastedText.length === 5) { // Assuming the pasted code length is 5
            const newCodes = pastedText.split('');
            setCodes(newCodes);
            refs[0].current.focus(); // Focus back on the first input
        }
    };

    const verifyCode = (e) => {
        e.preventDefault();
        const codeValue = codes.join(''); // Combine codes to form a single code value
        console.log('Verifying code:', codeValue); // Log the code for verification
        const url = `/reset-password/${codeValue}`;
        navigate(url);
    };

    return (
        <Container className='d-flex justify-content-center mt-4'>
            <Card style={{ width: '24em' }} className='p-3'>
                <Form onSubmit={verifyCode}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {codes.map((code, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={code}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !code) {
                                        handleBackspace(index);
                                    }
                                }}
                                onPaste={index === 0 ? handlePaste : undefined}
                                ref={refs[index]}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            />
                        ))}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <Button id='loginbtn' type="submit">
                            Verify Code
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default CodeVerification;

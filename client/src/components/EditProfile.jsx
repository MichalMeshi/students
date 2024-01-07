import React, { useContext, useEffect, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import '../stylesheets/bluebutton.css'
import '../stylesheets/editProfile.css'

const EditProfile = ({ setEdit }) => {
    const { profileData, updateUserProfile } = useContext(ProfileContext); // Assuming you have a method to set profileData
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: profileData.name,
        email: profileData.email,
        password: profileData.password,
        college: profileData.college,
        address: profileData.address,
        image: profileData.image
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await handleUpload();
        console.log({ formData });
        await updateUserProfile({ ...formData, image: imgUrl }); // Call the updateUserProfile method from context
        setEdit(false); // Close the modal after saving changes
    };
    const handleFileChange = async (event) => {
        setImageFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        const imgToProfile = new FormData();
        imgToProfile.append('file', imageFile);
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: imgToProfile,
            });
            const a = await response.json();
            const imgUrl = a.secure_url;
            // setFormData(prevState => ({ ...prevState, image: imgUrl }));
            return imgUrl;
        } catch (error) {
            setError(`Error during file upload: ${error}`);
        }
    };
    return (
        <div>
            <Modal show={true} onHide={() => setEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                        <Form.Group controlId="formImg" className='w-75 text-center'>
                            <Form.Label className='lableColor'>Image </Form.Label>
                            <Form.Control
                                type="file"
                                placeholder=""
                                name="image"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="name" className='w-75 text-center'> 
                            <Form.Label className='lableColor'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className='w-75 text-center'>
                            <Form.Label className='lableColor'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="college" className='w-75 text-center'>
                            <Form.Label className='lableColor'>College</Form.Label>
                            <Form.Control
                                type="text"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address" className='w-75 text-center'>
                            <Form.Label className='lableColor'>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button id='loginbtn' type="submit"  className='mt-3'>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {error ? <Alert variant="danger">{error}</Alert> : ""}
        </div>
    );
};

export default EditProfile;

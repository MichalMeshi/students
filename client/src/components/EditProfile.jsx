import React, { useContext, useEffect, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

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
                <Form onSubmit={handleSubmit}>
                    {/* <Form.Group controlId="name">
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                    <Form.Group controlId="formImg">
                        <Form.Label>Image </Form.Label>
                        <Form.Control
                            type="file"
                            placeholder=""
                            name="image"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="college">
                        <Form.Label>College</Form.Label>
                        <Form.Control
                            type="text"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
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

import React, { useContext, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import { Button, Modal, Form } from 'react-bootstrap';

const EditProfile = ({ setEdit }) => {
    const { profileData, updateUserProfile } = useContext(ProfileContext); // Assuming you have a method to set profileData

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
        await updateUserProfile(formData); // Call the updateUserProfile method from context
        setEdit(false); // Close the modal after saving changes
    };

    return (
        <Modal show={true} onHide={() => setEdit(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
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
                    {/* <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
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
    );
};

export default EditProfile;

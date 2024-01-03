import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ForumContext from '../context/ForumContext';

const AddPost = ({ openPostModal, setOpenPostModal, courseId }) => {
    const { addPost, postData, handleChange } = useContext(ForumContext);

    const submit = (e) => {
        e.preventDefault();
        addPost(courseId);
        setOpenPostModal(false);

    }


    console.log(postData);

    return (
        <Modal show={openPostModal} onHide={() => setOpenPostModal(false)}>
            <Modal.Header closeButton>
                profile
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={postData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="info">
                        <Form.Label>More info...</Form.Label>
                        <Form.Control
                            type="text"
                            name="info"
                            value={postData.info}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="field">
                        <Form.Label>Field</Form.Label>
                        <Form.Control
                            type="text"
                            name="field"
                            value={postData.field}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Post
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPost
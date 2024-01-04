import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ForumContext from '../context/ForumContext';
import '../stylesheets/bluebutton.css'

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
                New post
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit} className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Group controlId="title" className='w-75 text-center'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={postData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="info" className='w-75 text-center'>
                        <Form.Label>More info...</Form.Label>
                        <Form.Control
                            type="text"
                            name="info"
                            value={postData.info}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="field" className='w-75 text-center'>
                        <Form.Label>Field</Form.Label>
                        <Form.Control
                            type="text"
                            name="field"
                            value={postData.field}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button id='loginbtn' type="submit" className='mt-3'>
                        Post
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPost
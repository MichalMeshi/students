import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ModalContactDitails(props) {
    const { openLocationModal, setOpenLocationModal } = props;

    return (
        <Modal show={openLocationModal} onHide={() => setOpenLocationModal(false)}>
            <Modal.Header closeButton>
                Add Summary:
            </Modal.Header>
            <Modal.Body>
                <p>Hi!</p>
            </Modal.Body>

        </Modal>



    )
}

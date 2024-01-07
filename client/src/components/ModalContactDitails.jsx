import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ModalContactDitails(props) {
    const { openLocationModal, setOpenLocationModal, userId} = props;

    return (
        <Modal show={openLocationModal} onHide={() => setOpenLocationModal(false)}>
            <Modal.Header closeButton>
            Contact Information:
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>                
                    <h1 className='display-6'><strong>{userId.name}</strong></h1>
                <p className='fs-4'>{userId.email}</p>
                <p className='fs-5'>{userId.address}</p>
</div>

            </Modal.Body>

        </Modal>



    )
}

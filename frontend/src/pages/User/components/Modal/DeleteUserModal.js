import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';

function DeleteUserModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='danger' onClick={handleShow}>Delete</Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form or content here */}
          <p>Your form content goes here.</p>
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteUserModal;

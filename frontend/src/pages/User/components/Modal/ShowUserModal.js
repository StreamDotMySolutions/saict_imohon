import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';

function ShowUserModal({id}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Show</Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Show User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form or content here */}
          <p>Your form content goes here.</p>
          id is {id}
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

export default ShowUserModal;

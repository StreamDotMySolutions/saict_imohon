import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RefreshAlert = () => {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prevent the default dialog
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';

      // Show your custom modal
      setShowModal(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to leave this page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { setShowModal(false); window.location.reload(); }}>
            Leave Page
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RefreshAlert;

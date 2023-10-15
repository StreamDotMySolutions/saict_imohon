import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import axios from '../../../../libs/axios';
import useUserStore from '../../stores/UserStore';
import Form from '../Form/Form';
import { setFormError , resetStore } from '../libs/include'

export default function CreateUserModal() {
    const user = useUserStore()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetStore()
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
      e.preventDefault();
        const fieldNames = ['name', 'email', 'nric', 'password'];
        const formData = new FormData();

        // create payload
        fieldNames.forEach((fieldName) => {
          const value = user?.[fieldName]?.value;
          if (value !== null && value !== '' && value !== undefined) {
            formData.append(fieldName, value) // only append if has value
          }
        });

        axios({
            url: user.store_url,  // user store API
            method: 'post', // method is POST
            data: formData, // payload is formData
        })
        .then( response => {
            useUserStore.setState({ refresh: true }) // useEffect trigger
            handleClose() // close modal
        })
        .catch( error => {
          if (error.response && error.response.status === 422) {
            // Handle status code 422 errors here
            handleValidationErrors(fieldNames, error.response.data.errors, setFormError);
          } else {
            // Handle other errors (e.g., network issues, server errors)
            console.error(error);
          }
        })
    };

  return (
    <>
      <Button onClick={handleShow}>Create</Button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form />
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function validateFields(user) {
  const errors = [];

  if (!user.name?.value) {
    setFormError('name', 'Name is required');
    errors.push('Name');
  }

  if (!user.email?.value) {
    setFormError('email', 'Email is required');
    errors.push('Email');
  }

  if (!user.nric?.value) {
    setFormError('nric', 'NRIC is required');
    errors.push('NRIC');
  }

  if (!user.password?.value) {
    setFormError('password', 'Password is required');
    errors.push('Password');
  }

  return errors;
}

function handleValidationErrors(fieldNames, validationErrors, setFormError) {
  //const fieldNames = ['name', 'email', 'nric', 'password'];

  fieldNames.forEach((fieldName) => {
    if (validationErrors[fieldName]) {
      setFormError(fieldName, ` ${validationErrors[fieldName]}`);
    }
  });
}

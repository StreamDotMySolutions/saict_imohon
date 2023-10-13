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
      const errors = validateFields(user);
    
      if (errors.length === 0) {
        // Form is valid, proceed with submission
         //send formdata using FormData()
        const formData = new FormData()
        formData.append('name', user?.name?.value )
        formData.append('email', user?.email?.value )
        formData.append('nric',  user?.nric.value )
        formData.append('password',  user?.password.value )

        axios({
            url: user.store_url,  // user store API
            method: 'post', // method is POST
            data: formData, // payload is formData
        })
        .then( response => {
            useUserStore.setState({ refresh: true }) // useEffect trigger
            //console.log(response)
            handleClose() // close modal
        })
        .catch( error => {
            console.error(error)
        })

        handleClose() // close modal
        resetStore() // reset store
      }

     
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


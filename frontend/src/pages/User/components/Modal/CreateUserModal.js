import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalFooter ,Row} from 'react-bootstrap'
import axios from '../../../../libs/axios'
import useUserStore from '../../stores/UserStore'
import Form from '../Form/Form'
import { setFormError , resetStore } from '../libs/include'
import DisplayMessage from '../../../../components/DisplayMessage'

export default function CreateUserModal({role}) {

    const user = useUserStore()
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const handleClose = () => {
        setShow(false)
        setError(false)
        resetStore()
    }
    const handleShow = () => {
      setError(false)
      setShow(true);
    }

    const handleSubmit = (e) => {
      setMessage(null)
      setError(false)
      e.preventDefault();
        const fieldNames = [

                    'role',
                    'email', 
                    'password',

                    'name', 
                    'occupation',
                    'nric', 
                    'phone',
                    'address',

                    'user_department_id'
                  ];
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
            //console.log('refresh - true')
            setMessage(response.data.message)
            useUserStore.setState({ refresh: true }) // useEffect trigger
            handleClose() // close modal
        })
        .catch( error => {
          if (error.response && error.response.status === 422) {
            // Handle status code 422 errors here
            console.warn(error.response.data.errors)
            handleValidationErrors(fieldNames, error.response.data.errors, setFormError);
            setError(true)
          } else {
            // Handle other errors (e.g., network issues, server errors)
            console.error(error);
          }
        })
    };

  
  return (
    <>
      { message && <DisplayMessage variant='success' message={message} />}
      <Button onClick={handleShow}>Create</Button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form />
        </Modal.Body>
        <ModalFooter>
          <Row className='text-danger'>
            { error &&
            <>
            Please check all tabs for error
            </>}
          </Row>
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

function handleValidationErrors(fieldNames, validationErrors, setFormError) {
  //const fieldNames = ['name', 'email', 'nric', 'password'];

  fieldNames.forEach((fieldName) => {
    if (validationErrors[fieldName]) {
      setFormError(fieldName, ` ${validationErrors[fieldName]}`);
    }
  });
}

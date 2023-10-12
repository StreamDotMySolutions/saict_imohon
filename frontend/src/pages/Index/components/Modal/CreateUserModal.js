import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import axios from '../../../../libs/axios';
import useUserStore from '../../stores/UserStore';
import Form from '../Form/Form';
import { setFormError , resetStore } from '../libs/include'

function CreateUserModal() {
    const user = useUserStore()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetStore()
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
      
        e.preventDefault()
        if (user.name?.value == undefined ) {
            setFormError('name','Name is required')
        }

        if (user.email?.value == undefined) {
            setFormError('email','Email is required')
        }

        if (user.nric?.value == undefined) {
            setFormError('nric','nric is required')
        }


        if (user.password?.value == undefined) {
            setFormError('password','password is required')
        }

        if(
            user.name?.value == undefined ||
            user.email?.value == undefined ||
            user.nric?.value == undefined ||
            user.password?.value == undefined 
        ) return

        // console.log(user)
        // //send formdata using FormData()
        // const formData = new FormData()
        // formData.append('name',  useUserStore.getState('name') )

        // axios({
        //     url: user.store_url,  // Laravel route 
        //     method: 'post', // method is POST
        //     data: formData, // payload is formData
        // })
        // .then( response => {
        //     useUserStore.setState({ refresh: true }) // useEffect trigger
        //     console.log(response)
        //             handleClose()
        // })
        // .catch( error => {
        //     console.error(error)
        // })

        handleClose()
        resetStore()

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

export default CreateUserModal;
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import useUserStore from '../../stores/UserStore';
import axios from '../../../../libs/axios';
import UserForm from '../Form/Form';

function EditUserModal({id}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function handleEditClick({id}){
    setShow(true)
    fetchData(id)
    console.log('fetch data for ' + id)
  }

  return (
    <>
      <Button onClick={ () => handleEditClick({id}) }>Edit</Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm />
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



function fetchData(id){
  const store = useUserStore.getState()
  axios({
    url: `${store.show_url}/${id}`,
  })
  .then( response =>{
    console.log(response)

    useUserStore.setState({

                                role:{
                                        value: response.data?.user?.role
                                     },
                                email:{
                                        value: response.data?.user?.email
                                      },
                                name: {
                                        value: response.data?.user?.profile?.name
                                      },
                          occupation: {
                                        value: response.data?.user?.profile?.occupation
                                      },     
                                nric: {
                                        value: response.data?.user?.profile?.nric
                                      },      
                              phone: {
                                        value: response.data?.user?.profile?.phone
                                      },      
                            address:  {
                                        value: response.data?.user?.profile?.address
                                      },                                          
                  user_department_id: {
                                        value: response.data?.user?.profile?.user_department_id
                                      },  
              })
  })
  .then ( error => {
    console.warn(error)
  })
}

export default EditUserModal;

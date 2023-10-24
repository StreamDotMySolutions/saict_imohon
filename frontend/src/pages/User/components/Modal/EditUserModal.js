import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalFooter, Row } from 'react-bootstrap'
import useUserStore from '../../stores/UserStore'
import axios from '../../../../libs/axios'
import UserForm from '../Form/Form'
import { setFormError , resetStore } from '../libs/include'
import DisplayMessage from '../../../../components/DisplayMessage'

function EditUserModal({id}) {

  const user = useUserStore()
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [component, setComponent] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [message, setMessage] = useState(false)

  const handleClose = () => {
    setShow(false)
    setError(false)
    resetStore()
    //console.log('store reset')
  }
  
  function handleEditClick({id}){
    setShow(true)
    fetchData(id)
    //console.log('fetch data for ' + id)
  }

  function handleSaveClick({id}){
    //console.log(id)
    sendData()
  }

  function fetchData(id){
    setIsloading(true)
    const store = useUserStore.getState()
    axios({
      url: `${store.show_url}/${id}`,
    })
    .then( response =>{
      //console.log(response)
  
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

      //now assign the Form
      setComponent(<UserForm />)
      setIsloading(false)
    })
    .catch ( error => {
      console.warn(error)
    })
  }

  function sendData() {
    setMessage(null)
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
      formData.append('_method', 'put')

      // create payload
      fieldNames.forEach((fieldName) => {
        const value = user?.[fieldName]?.value;
        if (value !== null && value !== '' && value !== undefined) {
          formData.append(fieldName, value) // only append if has value
        }
      });

      axios({
          url: `${user.update_url}/${id}`,  // user update API
          method: 'post', // method is POST
          data: formData, // payload is formData
      })
      .then( response => {
          //console.log(response.data)
     
          useUserStore.setState({ refresh: true }) // useEffect trigger
          handleClose() // close modal

          setMessage(response.data.message)
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
          
          setError(true)
        }
      })
  };



  return (
    <>
      { message && <DisplayMessage variant='success' message={message} />}
      
      <Button onClick={ () => handleEditClick({id}) }>Edit</Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <UserForm /> */}
          { isLoading ?  'loading...' : component }
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
          <Button variant="primary" onClick={ () => handleSaveClick({id})}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default EditUserModal;

function handleValidationErrors(fieldNames, validationErrors, setFormError) {
  //const fieldNames = ['name', 'email', 'nric', 'password'];

  fieldNames.forEach((fieldName) => {
    if (validationErrors[fieldName]) {
      setFormError(fieldName, ` ${validationErrors[fieldName]}`);
    }
  });
}

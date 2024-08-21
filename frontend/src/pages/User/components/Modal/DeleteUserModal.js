import React, { useState } from 'react'
import { Button, Modal, ModalFooter } from 'react-bootstrap'
import useUserStore from '../../stores/UserStore'
import axios from '../../../../libs/axios'
import DisplayMessage from '../../../../components/DisplayMessage'

function DeleteUserModal({id}) {
  const store = useUserStore()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  

  function handleDeleteClick({id}){

    //console.log(id)

    const formData = new FormData()
    formData.append('_method', 'delete')
    axios({
      url: `${store.delete_url}/${id}`,
      method: 'post',
      data: formData
    })
    .then( (response) => { 
      setMessage(response.data.message)
      useUserStore.setState({ refresh: true }) 
    })
    .catch()

    handleClose()
  }
  return (
    <>
     { message && <DisplayMessage variant='success' message={message} />}
      <Button size={'sm'} variant='danger' onClick={handleShow}>Delete</Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          {/* Add your form or content here */}
          <h2>Adakah anda pasti ?</h2>
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="danger" onClick={ () => handleDeleteClick({id})}>
            Hapus
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteUserModal;

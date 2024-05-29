import { useState, useEffect} from 'react'
import { Table,Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'
import MohonData from '../components/MohonData'
import { Navigate } from 'react-router-dom'

export default function ApprovalModal({id,count,step}) {

    const store = useMohonStore()
    //const errors = store.errors
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [managers, setManagers] = useState([])
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData() // empty store data
      setShow(true) // show the modal

      // get managers
      axios( `${store.mohonApprovalUrl}/list-managers`)
      .then ( response => {
        setManagers(response.data.managers)
        console.log(response)
      })
      .catch ( error => {
        console.warn(error)
      })
      .finally(
      )
    }



    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      
      const formData = new FormData()

      // step = 1 ( user submitted to Pelulus 1)
      //formData.append('step', 1 );

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'post');


      // append manager_id value
      if (store.getValue('manager_id') != null ) {
        formData.append('manager_id', store.getValue('manager_id'));
      }

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      axios({ 
          method: 'post',
          url : `${store.userApprovalUrl}/${id}`,
          data: formData
        })
        .then( response => {
          //console.log(response)
          setIsLoading(false)

          // set MohonIndex listener to true
          store.setValue('refresh', true)
          store.setValue('redirect', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            handleCloseClick();
          }, 500);
        })
        .catch( error => {
          console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
            
          }
        })
    }

    // redirect to store-items
    if( store.getValue('redirect') === true ) {
      store.setValue('redirect', false)
      return <Navigate to={`/mohon/${id}`} replace />
    }

  
    return (
      <>
        {count === 0 ? (
          <Button disabled  variant="info" onClick={handleShowClick}>
            Mohon
          </Button>
        ) : (
          <Button disabled={step !== 0}  variant="info" onClick={handleShowClick}>
            Mohon
          </Button>
        )}
          
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h5>Maklumat Pelulus</h5>
            <InputSelect 
                  fieldName='manager_id' 
                  options = {managers}
                  placeholder='Sila Pilih Ketua Jabatan'  
                  icon='fa-solid fa-person'
                  isLoading={isLoading}
                />
            <br />
            <h5>Maklumat Pemohon</h5>
            <MohonData id={id} />
          </Modal.Body>

          <Modal.Footer>
            <Form.Check
                className='me-4'
                isInvalid={errors?.hasOwnProperty('acknowledge')}
                reverse
                disabled={step !== 0}
                label="Saya mengesahkan telah memeriksa permohonan ini"
                type="checkbox"
                onClick={ () => useMohonStore.setState({errors:null}) }
                onChange={ (e) => store.setValue('acknowledge', true) }
              />
            <Button 
                disabled={isLoading}
                variant="secondary" 
                onClick={handleCloseClick}>
                Tutup
            </Button>

            <Button 
              disabled={step !== 0 || isLoading}
              variant="primary" 
              onClick={handleSubmitClick}>
              Mohon
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }


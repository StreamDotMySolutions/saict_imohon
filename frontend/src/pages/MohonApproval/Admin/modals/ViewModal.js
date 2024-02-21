import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'

export default function ViewModal({id}) {

    const store = useMohonStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([]) // MohonItems
    const [step, setStep] = useState('') // Step

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(id)
      //console.log( `${store.submitUrl}/${id}`)
      axios({
            'method' : 'get',
            'url' : `${store.submitUrl}/${id}`
      })
      .then( response => {
          //console.log(response.data)
          let mohon = response.data.mohon
          store.setValue('title', mohon.title) // set formValue
          store.setValue('description', mohon.description) // set formValue
          setItems(mohon.mohon_items)
          setStep(mohon.mohon_approval.step)

          // items
          setIsLoading(false)
      })
        .catch ( error => {
          console.warn(error)
          setIsLoading(false)
      })

        setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

    const handleApproveClick = () => {
      store.setValue('status', 'approved')
      handleSubmitClick()
    }

    const handleRejectClick = () => {
      store.setValue('status', 'rejected')
      handleSubmitClick()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // status
      if (store.getValue('status') != null ) {
        formData.append('status', store.getValue('status'));
      }

      // method PUT ( to simulate PUT in Laravel )
      // formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.bossApprovalUrl}/${id}`, // role = admin approve mohon to step = 3 && status = approved || rejected
          data: formData
        })
        .then( response => {
          //console.log(response)

          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            setIsLoading(false)
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

    return (
      <>
        <Button size="sm" variant="outline-info" onClick={handleShowClick}>
          Lihat
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputText 
              fieldName='title' 
              placeholder='Tajuk permohonan'  
              icon='fa-solid fa-pencil'
              isLoading={'true'}
            />
            <br />
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-question'
              rows='3'
              isLoading={'true'}
            />
            <br />

            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Description</th>
                        {/* <th style={{ 'width': '20px'}}>Agihan</th> */}
                 
                    </tr>
                </thead>

                <tbody>
                    {items?.map((item,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{item.id}</span></td>
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.description}</td>
                            {/* <td className='text-center'>
                              <Form.Check // prettier-ignore
                                type='checkbox'
                              />
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>

          </Modal.Body>
          
          <Modal.Footer>
          <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              //disabled={step !== 2}
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useMohonStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

            <Button 
              //disabled={ isLoading || step !== 2}
              variant="success" 
              onClick={handleApproveClick}>
              Mohon
            </Button>

            <Button 
              //disabled={ isLoading || step !== 2}
              variant="danger" 
              onClick={handleRejectClick}>
              Gagal
            </Button>

            <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


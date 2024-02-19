import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'

export default function ViewModal({id}) {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([]) // MohonItems
  
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
          console.log(response.data)
          let mohon = response.data.mohon
          store.setValue('title', mohon.title) // set formValue
          store.setValue('description', mohon.description) // set formValue
          setItems(mohon.mohon_items)

          // items
          setIsLoading(false)
      })
        .catch ( error => {
          console.warn(error)
          setIsLoading(false)
      })

        setShow(true) // show the modal
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // ackknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.managerApprovalUrl}/${id}`, // role = mnager approve mohon to step = 2 && status = approved
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
          //console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
    }

    const handleCloseClick = () => {
      handleClose()
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
              rows='6'
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
                 
                    </tr>
                </thead>

                <tbody>
                    {items?.map((item,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{item.id}</span></td>
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.description}</td>
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
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useMohonStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

          <Button 
              disabled={isLoading}
              variant="success" 
              onClick={handleCloseClick}>
              Lulus
            </Button>

            <Button 
              disabled={isLoading}
              variant="danger" 
              onClick={handleCloseClick}>
              Batal
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


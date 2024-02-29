import { useState, useEffect} from 'react'
import { Table,Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'


export default function ApprovalModal({id,count,step}) {

    const store = useMohonStore()
    //const errors = store.errors
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
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
          store.setValue('user', mohon.user.name) // set formValue
          store.setValue('department', mohon.user.user_profile.user_department.name) // set formValue
          store.setValue('description', mohon.description) // set formValue
          store.setValue('items', mohon.mohon_items) // set formValue
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

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // step = 1 ( user submitted to Pelulus 1)
      //formData.append('step', 1 );

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'post');

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
          <InputText 
              fieldName='user' 
              placeholder='Pemohon'  
              icon='fa-solid fa-user'
              isLoading={'true'}
            />
            <br />
            <InputText 
              fieldName='department' 
              placeholder='Jabatan'  
              icon='fa-solid fa-building'
              isLoading={'true'}
            />
            <br />
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
                    {store.getValue('items')?.map((item,index) => (
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


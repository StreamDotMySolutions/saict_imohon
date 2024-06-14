import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table, Badge} from 'react-bootstrap'
import { InputSelect, InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function RequestApprovalModal({agihanRequestId}) {

    const store = useMohonStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [bosses, setBosses] = useState([])
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(agihanRequestId)

        //console.log( `${store.submitUrl}`)
        axios({
            'method' : 'get',
            'url' : `${store.mohonDistributionUrl}/${agihanRequestId}`
        })
        .then( response => {
          console.log(response)
          setBosses(response.data.bossUsers) // set bosses

          let mohon = response.data.mohon
          setItems(mohon.mohon_distribution_items) // set items
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


      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // boss_id
      if (store.getValue('boss_id') != null ) {
        formData.append('boss_id', store.getValue('boss_id'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'post');

      axios({ 
          method: 'post',
          url : `${store.bossApprovalUrl}/${agihanRequestId}`,
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
 
        <Button variant="info" onClick={handleShowClick}>
          Mohon
        </Button>
      
          
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title> Lihat Permohonan Agihan </Modal.Title>
          </Modal.Header>

          <Modal.Body>

          <h5>Maklumat Pelulus</h5>
            <InputSelect
                  fieldName='boss_id' 
                  options = {bosses}
                  placeholder='Sila Pilih Pelulus 2'  
                  icon='fa-solid fa-person'
                  isLoading={isLoading}
                />
            <Table className='border rounded mt-3' style={{backgroundColor:"#f0f0f0"}}>
              <thead>
                  <tr>
                      <th>ID</th>
                
                      <th>PERALATAN</th>
                      <th>JENIS</th>
                      <th>PENERIMA</th>
                      <th>JAWATAN</th>
                      <th>NAMA BANGUNAN</th>
                      <th>TINGKAT</th>
                      <th>LOKASI</th>
                      <th>VENDOR</th>
                      <th>MAKLUMAT TAMBAHAN</th>
                  </tr>
              </thead>
              <tbody>
                {items.length > 0 && items?.map( (item,index) => (
                  <tr key={index}>
                      <td><Badge>{item.id}</Badge></td>
          
                      <td>{item.category.name}</td>
                      <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                      <td>{item.mohon_item?.name}</td>
                      <td>{item.mohon_item?.occupation}</td>
                      <td>{item.mohon_item?.building_name}</td>
                      <td>{item.mohon_item?.building_level}</td>
                      <td>{item.mohon_item?.location}</td>
                      <td>{item.inventory?.vendor}</td>
                      <td>{item.mohon_item?.description}</td>
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
                disabled={isLoading}
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
              disabled={isLoading}
              variant="primary" 
              onClick={handleSubmitClick}>
              Mohon Agihan
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }


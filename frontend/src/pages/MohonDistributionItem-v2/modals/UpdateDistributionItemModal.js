import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table} from 'react-bootstrap'
import axios from '../../../libs/axios'
import useMohonItemStore from '../store'
import { PicName, PicPhone, DateStart, DateEnd, InputCheck } from '../components/Input'

export default function UpdateDistributionItemModal({mohonDistributionItemId}) {

    const store = useMohonItemStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [data, setData] = useState()
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data

      // get mohonDistributionItem detail
      axios(`${store.mohonDistributionItemUrl}/show/${mohonDistributionItemId}`)
      .then( response => {
        //console.log(response)
        let delivery = response.data.item.mohon_distribution_item_delivery
        store.setValue('pic_name', delivery.pic_name)
        store.setValue('pic_phone', delivery.pic_phone)
        store.setValue('date_start', delivery.date_start)
        store.setValue('date_end', delivery.date_end)
      })
      .catch( error => {
        console.warn(error)
      })
      .finally(
        setIsLoading(false)
      )

      setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // Pic Name
      if (store.getValue('pic_name') != null ) {
        formData.append('pic_name', store.getValue('pic_name'));
      }

      // Pic Phone
      if (store.getValue('pic_phone') != null ) {
        formData.append('pic_phone', store.getValue('pic_phone'));
      }

      // Date Start
      if (store.getValue('date_start') != null ) {
        formData.append('date_start', store.getValue('date_start'));
      }

      // Date End
      if (store.getValue('date_end') != null ) {
        formData.append('date_end', store.getValue('date_end'));
      }

      // ackknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'post');

      axios({ 
          method: 'post',
          url : `${store.mohonDistributionItemDeliveryUrl}/${mohonDistributionItemId}/updateOrCreate`,
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
        .finally(
          console.log(store.errors)
        )
    }

  
    return (
      <>
 
        <Button size={'sm'} variant="outline-primary" onClick={handleShowClick}>
          Kemaskini
        </Button>
      
          
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Kemaskini maklumat peralatan agihan</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Col>
              <PicName />
            </Col>
            <Col className='mt-2'>
              <PicPhone />
            </Col>
            <Col className='mt-2'>
              <DateStart />
            </Col>
            <Col className='mt-2'>
              <DateEnd />
            </Col>
          
          </Modal.Body>
          
          <Modal.Footer>
 
            <InputCheck isLoading={isLoading} />

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
              Kemaskini
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }


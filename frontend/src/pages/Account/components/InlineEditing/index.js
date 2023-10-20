import { useState } from 'react'
import { Form,Row,Col,Button} from 'react-bootstrap'
import axios from '../../../../libs/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const InlineEditing = ({store,fieldValue,fieldName, setRefresh}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [value, setValue] = useState(fieldValue);

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    const handleInputClick = () => {
        setIsEditing(true)
        console.log('edit')
    }

    const handleInputChange = (e) => {
        setIsDisabled(false)
        setValue(e.target.value)
    }

    const handleSaveClick = () => {
        console.log('saving')
        console.log(value)

        //Send to server
        const formData = new FormData();
    
        formData.append('_method', 'put');
        formData.append(fieldName, value);
        
        axios({
          url: `${store.update_url}`,
          method: 'post',
          data: formData,
        })
          .then((response) => {      
            setRefresh(true)
          })
          .catch((error) => {
            console.error(error);
          });
        
        // Exit the editing mode
        setIsEditing(false);
    }

    return (
        <div className='mt-2'>

            <Row md={6}>
                <Col md={4} className='p-2'>
                    <Form.Group>
                        <Form.Label>{fieldName}</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        
                        
                            <Form.Control 
                                className='form-control-plaintext border border-1 p-2'
                                value={value}
                                onClick={ handleInputClick }
                                onChange={ handleInputChange }
                                style={isEditing ? { backgroundColor: 'lightyellow' } : {}}
                            />
                            {isEditing && (
                                <>
                                <Button disabled={isDisabled} className='ms-2 me-2 border border-1 border-success text-success' onClick={ (e) => handleSaveClick(e) } variant='light' ><FontAwesomeIcon icon="fa-solid fa-save" /></Button> 
                            
                                <Button className='border border-1 border-danger text-danger' onClick={handleCancelClick} variant='light' ><FontAwesomeIcon icon="fa-solid fa-times" /></Button> 
                                </>
                            )}
                        </div>

                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
};

export default InlineEditing;
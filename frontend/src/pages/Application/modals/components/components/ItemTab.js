import {useEffect,useState} from 'react'
import useApplicationStore from '../../../stores/ApplicationStore'
import { Row,Col,Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../../../libs/axios'

const ItemTab = () => {
    const store = useApplicationStore()
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    
    return (
        <div>

            <Row className='col-6 mt-4 mb-3'>
                <Item label={'PC'} fieldName={'pc'} />
            </Row>

            <Row className='col-6 mt-4 mb-3'>
                <Item label={'NB'} fieldName={'nb'} />
            </Row>

            <Row className='col-6 mt-4 mb-3'>
                <Item label={'PBWN'} fieldName={'pbwn'} />
            </Row>

            <Row className='col-6 mt-4 mb-3'>
                <Item label={'PCN'} fieldName={'pcn'} />
            </Row>

        </div>
    );
};

export default ItemTab;


function Item({label,fieldName}){
    const store = useApplicationStore()
    const errors = store.errors

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text className='fs-3' style={{'width':'100px'}}>{label}</InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila nyatakan jumlah unit'
                        value={ store.getValue(fieldName) ? store.getValue(fieldName) : '' }
                        name={fieldName}
                        size='md' 
                    
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => store.setValue(fieldName, e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty(fieldName) &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.fieldName ? errors.fieldName : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}
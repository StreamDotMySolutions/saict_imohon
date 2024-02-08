import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge,Button,Row,Col,Form, InputGroup } from 'react-bootstrap'
import { React, useState, useEffect} from 'react'
import useMohonStore from '../../store'

export function Title(){
    const store = useMohonStore()
    const errors = store.errors
    const fieldName ='title'

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-pencil"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder={'Tajuk permohonan'}
                        value={store.getValue('title')}
                        name={fieldName}
                        size='md' 
                        readOnly={store.readonly}
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => { 
                          store.setValue(fieldName, e.target.value)                         
                        } }
                    />
                    {
                        errors?.hasOwnProperty(fieldName) &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors[fieldName] ? errors[fieldName] : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}
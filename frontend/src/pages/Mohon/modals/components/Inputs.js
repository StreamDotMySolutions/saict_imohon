import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge,Button,Row,Col,Form, InputGroup } from 'react-bootstrap'
import { React, useState, useEffect} from 'react'
import useMohonStore from '../../store'

export function InputText({fieldName, placeholder, icon}){
    const store = useMohonStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={icon}></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder={placeholder}
                        value={store.getValue(fieldName)}
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

export function InputTextarea({fieldName, placeholder, icon, rows}){
    const store = useMohonStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={icon}></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        as="textarea" 
                        rows={rows}
                        placeholder={placeholder}
                        value={store.getValue(fieldName)}
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


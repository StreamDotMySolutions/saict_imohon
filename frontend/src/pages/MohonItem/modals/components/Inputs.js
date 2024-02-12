import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge,Button,Row,Col,Form, InputGroup } from 'react-bootstrap'
import { React, useState, useEffect} from 'react'
import useMohonStore from '../../store'

export function InputText({fieldName, placeholder, icon, isLoading}){
    const store = useMohonStore()
    //const errors = store.errors
    const errors = store.getValue('errors')

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={icon}></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder={placeholder}
                        value={store.getValue(fieldName) ||  ''}
                        name={fieldName}
                        size='md' 
                        readOnly={isLoading}
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

export function InputTextarea({fieldName, placeholder, icon, rows, isLoading}){
    const store = useMohonStore()
    //const errors = store.errors
    const errors = store.getValue('errors')

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={icon}></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        as="textarea" 
                        rows={rows}
                        placeholder={placeholder}
                        value={store.getValue(fieldName) ||  ''}
                        name={fieldName}
                        size='md' 
                        readOnly={isLoading}
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

export function InputSelect({fieldName, placeholder, icon, isLoading, options}){
    const store = useMohonStore()
    //const errors = store.errors
    const errors = store.getValue('errors')

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={icon}></FontAwesomeIcon></InputGroup.Text>
                    <Form.Select
                        name={fieldName}
                        size='md' 
                        readOnly={isLoading}
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => { 
                          store.setValue(fieldName, e.target.value)                         
                        } }
                    >
                        <option>{placeholder}</option>
                        {options?.map((option,index) => (
                            <option value={option.id}>{option.name}</option>
                        ))}
             
                    </Form.Select>
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


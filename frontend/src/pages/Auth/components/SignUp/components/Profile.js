import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import { Form,InputGroup,Button,Row,Col, Alert } from 'react-bootstrap'
import axio from '../../../../../libs/axios';
import useAuthStore from '../../../stores/AuthStore';

const Profile = () => {
    const store = useAuthStore()
    const errors = store.errors

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState(null)
    //const [errors, setErrors] = useState([]); // validation errors

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState(null)

    const handleClickSubmit = () => {}

    return (
        <div>
                <InputGroup hasValidation className='mb-3'>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-user"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Nama penuh'
                        name='name'
                         
                        type="text" 
                        required 
                        isInvalid={errors?.hasOwnProperty('name')}
                        onChange={ (e) => useAuthStore.setState({ name: { value: e.target.value}} )}  
                    />

                    {
                        errors?.hasOwnProperty('name') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.name ? errors.name : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>

                <InputGroup hasValidation className='mb-3'>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-briefcase"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Jawatan'
                        name='occupation'
                         
                        type="text" 
                        required 
                        isInvalid={errors?.hasOwnProperty('occupation')}
                        onChange={ (e) => useAuthStore.setState({ occupation: { value: e.target.value}} )}  
                    />

                    {
                        errors?.hasOwnProperty('occupation') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.occupation ? errors.occupation : null }
                                </Form.Control.Feedback>
                            )
                    } 
                </InputGroup>

                <InputGroup hasValidation className='mb-3'>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-id-card"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='No Kad Pengenalan ( xxxxxx-xx-xxxx )'
                        name='nric'
                        type="text" 
                        required 
                        isInvalid={errors?.hasOwnProperty('nric')}
                        onChange={ (e) => useAuthStore.setState({ nric: { value: e.target.value}} )}  
                    />
                    {
                        errors?.hasOwnProperty('nric') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.nric ? errors.nric : null }
                                </Form.Control.Feedback>
                            )
                    } 
                </InputGroup>

                <InputGroup hasValidation className='mb-3'>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='No telefon'
                        name='phone'
                         
                        type="text" 
                        required 
                        isInvalid={errors?.hasOwnProperty('phone')}
                        onChange={ (e) => useAuthStore.setState({ phone: { value: e.target.value}} )}  
                    />
                    {
                        errors?.hasOwnProperty('phone') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.phone ? errors.phone : null }
                                </Form.Control.Feedback>
                            )
                    } 
                </InputGroup>

                <InputGroup hasValidation className='mb-3'>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-address-card"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Alamat'
                        name='address'
                        as='textarea'
                        rows={5}
                        required 
                        isInvalid={errors?.hasOwnProperty('address')}
                        onChange={ (e) => useAuthStore.setState({ address: { value: e.target.value}} )}  
                    />
                    {
                        errors?.hasOwnProperty('address') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.address ? errors.address : null }
                                </Form.Control.Feedback>
                            )
                    } 
                </InputGroup>

        </div>
    );
};

export default Profile;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form,InputGroup,Button,Row,Col, Alert } from 'react-bootstrap'
import axios from '../../../../libs/axios'

const EmailPassword = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState(null)
    const [email, setEmail] = useState(null)

    const handleInputChange = (e) =>{
        //console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handleClickSubmit = () => {
        postData()
    }

    const postData = () => {

        setIsError(false) 
        setIsSuccess(false)
        setIsLoading(true)

        const formData = new FormData
        formData.append('email', email)
        axios({
            url:  process.env.REACT_APP_BACKEND_URL + '/password/email',
            method: 'post',
            data: formData
        })
        .then( response => {
            console.log(response)
            setIsSuccess(true)
            setIsLoading(false)
        })
        .catch( error => {
            console.warn(error)
            setIsLoading(false)
            setIsError(true)
            
            if(error.response.data == 'passwords.throttled'){
                setMessage('Server is busy, please wait and try again.')
            } else {
                setMessage(error.response.data.message)
            }
           
        })
    }

    return (
        <div>
                {
                isError ? (
                    <Alert variant='danger'>{message ? message : 'Server Error.'}</Alert>
                ) : isSuccess ? (
                    <Alert variant='success'>
                    Pautan reset password telah berjaya di hantar, sila periksa email anda dan ikuti arahan di sana.
                    </Alert>
                ) : (
                    <></>
                )}

                {!isSuccess && !isError && !isLoading && (

                    <Alert variant='info'>
                        Sila masukkan email anda dan kami akan hantar pautan untuk reset password.
                    </Alert>
                )}

                { isLoading && (
                    <Alert variant='warning'>
                          <i className="fa-solid fa-sync fa-spin"></i>{' '}sedang memproses...
                    </Alert>
                )}

            { 
            isSuccess ? 
            (
                <>
                <Link to='/sign-in'><FontAwesomeIcon icon="fa-solid fa-reply"></FontAwesomeIcon>{' '}Log Masuk</Link>
                </>
            ) : (
                <Form>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-envelope"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        size='lg' 
                        type="text" 
                        required 
                        isInvalid={isError}
                        onChange={handleInputChange} 
                    />
                    <Form.Control.Feedback type="invalid">
                        
                    </Form.Control.Feedback>
                </InputGroup>

                <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2'>
                    <Col>
                        <Button 
                            disabled={isLoading}
                            onClick={handleClickSubmit}
                            size='lg' 
                            className='login-button'>Hantar</Button>
                        <span className='fs-6 ms-4'>
                            <Link to='/sign-in'><FontAwesomeIcon icon="fa-solid fa-reply"></FontAwesomeIcon>{' '}Log Masuk</Link>
                        </span>
                    </Col>
                </Row>
            </Form>
            ) 
            } 

        </div>
    );
};

export default EmailPassword;
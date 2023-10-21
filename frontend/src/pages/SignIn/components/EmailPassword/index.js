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
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handleClickSubmit = () => {
        postData()
    }

    const postData = () => {

        setIsError(false) 
        setIsSuccess(false)

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
        })
        .catch( error => {
            console.warn(error)
            setIsError(true)
            setMessage(error.response.data.message)
        })
    }

    return (
        <div>
                {
                isError ? (
                    <Alert variant='danger'>{message}</Alert>
                ) : isSuccess ? (
                    <Alert variant='success'>
                    Pautan reset berjaya di hantar, sila periksa email anda.
                    </Alert>
                ) : (
                    
                    <Alert variant='info'>
                    Sila masukkan email anda dan kami akan hantar pautan untuk reset password.
                    </Alert>
                )
                }

            { 
            isSuccess ? 
            (
                <>
                <Link to='/sign-in'><FontAwesomeIcon icon="fa-solid fa-reply"></FontAwesomeIcon>{' '}Sign In</Link>
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
                        Invalid Email.
                    </Form.Control.Feedback>
                </InputGroup>

                <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2'>
                    <Col>
                        <Button 
                            onClick={handleClickSubmit}
                            size='lg' 
                            className='login-button'>Submit</Button>
                        <span className='fs-6 ms-4'>
                            <Link to='/sign-in'><FontAwesomeIcon icon="fa-solid fa-reply"></FontAwesomeIcon>{' '}Sign In</Link>
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
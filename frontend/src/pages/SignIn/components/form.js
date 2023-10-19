import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../../stores/AuthStore'
import axios from '../../../libs/axios'

const Form = () => {
    // set system variables
    const [message, setMessage] = useState(''); // system message
    const [invalid, setInvalid] = useState(true)
    const [errors, setErrors] = useState([]); // validation errors
    const [isLoading, setIsLoading] = useState(false)
    const isLoggedIn = useAuthStore( (state) => state.isLoggedIn ) // get state
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn) // set state

    // handle form submission
    function handleSubmit(event){
        event.preventDefault()
        setMessage('authentication with server ...')

        // clear the message & errors
        setMessage(null)
        setErrors(null)
        setInvalid(false)
        setIsLoading(true)

        const url =   process.env.REACT_APP_BACKEND_URL + '/login'
        const formData = new FormData(event.target);

        axios({
            url: url,
            method: 'post',
            data: formData
        })
        .then(response => {
            //console.log(response.data)
            setMessage(response.message)
            localStorage.setItem('token', response.data.token) // localstorate
            useAuthStore.setState({user : response.data.user}) // AuthStore

            setIsLoggedIn(true) // store
            setIsLoading(false)
        })
        .catch( error => {
            if( error.response?.status == 422 ){
                setErrors(error.response.data.errors)
            } else {
                setMessage(error.message)
            }
            setIsLoading(false)
        })
    }

    // redirect
    if (isLoggedIn === true) {
        return <Navigate to='/' replace />
    }

    // JSX return
    return (
        <>
        <form  onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label"><FontAwesomeIcon icon="fa-solid fa-envelope" /> Email address</label>
            <input 
                required
                name="email" 
                type="email" 
                id="email" 
                className={"form-control form-control-lg" + (errors?.hasOwnProperty('email') ? ' is-invalid' : '')}
                placeholder="Enter a valid email address" 
            />
            {errors?.hasOwnProperty('email') ? <span className="invalid-feedback" >
                <strong>
                    { errors.email ? errors.email : null }
                </strong></span> : null 
            }  
    
          </div>

          <div className="form-outline mb-3">
          <label className="form-label" ><FontAwesomeIcon icon="fa-solid fa-lock" /> Password</label>
            <input 
                required
                name="password" 
                type="password" 
                id="password" 
                className={"form-control form-control-lg" + (errors?.hasOwnProperty('password') ? ' is-invalid' : '')}
                placeholder="Enter password" />
            {errors?.hasOwnProperty('password') ? <span className="invalid-feedback" >
                <strong>
                    { errors.password ? errors.password : null }
                </strong></span> : null 
            }  
          </div>
        
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg login-button w-50">
                { isLoading ? 
                <>
                <i className="fa-solid fa-sync fa-spin"></i>
                </>
                :
                <>
                Login <FontAwesomeIcon icon="fas fa-sign-in" />
                </>
                }
                
            
            </button>
          </div>

          <div className='mt-4 pt-2' >
            {  message ? <span className="text-danger"><FontAwesomeIcon icon="fas fa-exclamation-triangle" />{' '}{message}</span>  : null }
          </div>

       </form>
        </>
    )
}

export default Form
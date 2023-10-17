import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../../stores/AuthStore'
import axios from '../../../libs/axios'

const Form = () => {
    // set system variables
    const [message, setMessage] = React.useState(''); // system message
    const [invalid, setInvalid] = React.useState(true)
    const [errors, setErrors] = React.useState([]); // validation errors
    const isLoggedIn = useAuthStore( (state) => state.isLoggedIn ) // get state
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn) // set state

    // handle form submission
    function handleSubmit(event){
        setMessage('authentication with server ...')

        // clear the message & errors
        setMessage(null)
        setErrors(null)
        setInvalid(false)

        event.preventDefault()
        

        // use fetch to send
        // http post to /api/test
        // retrieve the returned
        // message and display
        // back at dom id = message

        const url =   process.env.REACT_APP_BACKEND_URL + '/login'
        const data = new FormData(event.target);
        const options = {
            method: 'post',
            body: data
        }

        fetch(url,options)
        .then(response => {

            // response.ok status 200-299
            if(response.ok) {
     
                return response.json()
            } 
            return Promise.reject(response); // reject the promise
        })
        .then(json => {
 
            //console.log(json)
            // authentication success
            setMessage(json.message)

            //save token to localstorage
            localStorage.setItem('token', json.token)

            // update the global store
            setIsLoggedIn(true)
        })
        .catch( error =>{

            //console.error(error)
            // field validations at 422
            // wrong username/password at 401
            // laravel validations error
            if(error.status === 422 || error.status === 401 ){
                error.json().then((json) => {                  
                    // validation errors
                    // errors set in Laravel JSON
                    if('errors' in json){
                        setInvalid(true)
                        console.log(json.errors)
                        setErrors(json.errors)
                        console.log(json.errors.email)
                    }
                    // server message 
                    setMessage(json.message)
                })
            } else {
                setMessage(error.statusText)
            }
        })
    }

    // redirect
    if (isLoggedIn === true) {
        return <Navigate to='/home' replace />
    }

    // JSX return
    return (
        <>
        <form  onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label"><FontAwesomeIcon icon="fa-solid fa-envelope" /> Email address</label>
            <input 
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
            <button type="submit" className="btn btn-primary btn-lg login-button">Login <FontAwesomeIcon icon="fas fa-sign-in" /></button>
          </div>

          <div className='mt-4 pt-2' >
            {  message ? <span className="text-danger"><strong>{message}</strong></span>  : null }
          </div>

       </form>
        </>
    )
}

export default Form
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navigate,Link } from 'react-router-dom'
//import { useAuthStore } from '../../../../stores/AuthStore'
import useAuthStore from '../../stores/AuthStore'
import axios from '../../../../libs/axios'
import { Row } from 'react-bootstrap'

const SignInForm = () => {
    // set system variables
    const store = useAuthStore()
    const [message, setMessage] = useState(''); // system message
    const [invalid, setInvalid] = useState(true)
    const [unauthorized, setUnauthorized] = useState(false)
    const [errors, setErrors] = useState([]); // validation errors
    const [isLoading, setIsLoading] = useState(false)
    
    // const isLoggedIn = useAuthStore( (state) => state.isLoggedIn ) // get state
    // const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn) // set state
    // const isAuthenticated = useAuthStore( (state) => state.isAuthenticated ) // get state

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
            useAuthStore.setState({user : response.data.user}) // user data
            useAuthStore.setState({isAuthenticated : true}) // system wide

            //setIsLoggedIn(true) // store
            setIsLoading(false)
        })
        .catch( error => {
            if( error.response?.status == 401 ){
                setUnauthorized(true)
            }

            if( error.response?.status == 422 ){
                setErrors(error.response.data.errors)
            } else {
                setMessage(error.message)
            }
            setIsLoading(false)
        })
    }

    // redirect
    //if (isLoggedIn === true) {
    if(store.isAuthenticated === true) {
        return <Navigate to='/' replace />
    }

    // if (unauthorized === true) {
    //     return <Navigate to='/unauthorized' replace />
    // }

    // JSX return
    return (
        <>
        <h1>Log in guna Email</h1>
        <form  onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label"><FontAwesomeIcon icon="fa-solid fa-envelope" /> Alamat Emel</label>
            <input 
                required
                name="email" 
                type="email" 
                id="email" 
                className={"form-control form-control-lg" + (errors?.hasOwnProperty('email') ? ' is-invalid' : '')}
                placeholder="masukkan alamat emel anda" 
            />
            {errors?.hasOwnProperty('email') ? <span className="invalid-feedback" >
                <strong>
                    { errors.email ? errors.email : null }
                </strong></span> : null 
            }  
    
          </div>

          <div className="form-outline mb-3">
          <label className="form-label" ><FontAwesomeIcon icon="fa-solid fa-lock" /> Katalaluan</label>
            <input 
                required
                name="password" 
                type="password" 
                id="password" 
                className={"form-control form-control-lg" + (errors?.hasOwnProperty('password') ? ' is-invalid' : '')}
                placeholder="masukkan katalaluan anda" />
            {errors?.hasOwnProperty('password') ? <span className="invalid-feedback" >
                <strong>
                    { errors.password ? errors.password : null }
                </strong></span> : null 
            }  
          </div>
        
          <div className="text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg login-button">
                { isLoading ? 
                <>
                <i className="fa-solid fa-sync fa-spin"></i>
                </>
                :
                <>
                Log Masuk
                </>
                }
                
            
            </button>
            {' '}
            
            <span className='fs-6 ms-4'>
                <Link to='/sign-in-by-nric'><FontAwesomeIcon icon="fa-solid fa-id-card" />{' '}Log In Guna Kad Pengenalan</Link>

                <Link className='ms-3' to='/password/email'><FontAwesomeIcon icon="fa-solid fa-question" />{' '}Lupa katalaluan</Link>
                
                <Link className='ms-3' to='/sign-up'><FontAwesomeIcon icon="fa-solid fa-pencil" />{' '}Pendaftaran</Link>
            </span>     
          </div>

          <div className='mt-4 pt-2' >
            {  message ? <span className="text-danger"><FontAwesomeIcon icon="fas fa-exclamation-triangle" />{' '}{message}</span>  : null }
          </div>

         </form>
        </>
    )
}

export default SignInForm
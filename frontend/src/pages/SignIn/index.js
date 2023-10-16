import React from 'react'
import './style.css'
import login_logo from './img/login.webp'
import rtm from './img/rtm_logo.png'
import Form from './form'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SignIn = () => {

return (
<>
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={login_logo}
          className="img-fluid" alt="Content Management System" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h2 className="text-muted"> <img src={rtm} width="100" /> i Mohon </h2>
        <Form />
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

    <div className="text-white mb-3 mb-md-0">
      Copyright  <img src={rtm} height="20" /> RTM MALAYSIA <FontAwesomeIcon icon="fas fa-copyright" /> 2023. All rights reserved.
    </div>

    <div>
      <p className="text-white">Seksyen Aplikasi dan Teknologi Maklumat</p>
    </div>

  </div>
</section>
</>
)} 

export default SignIn

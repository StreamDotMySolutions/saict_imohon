import React, { useState, useEffect } from 'react';
import './assets/style.css';
import login_logo from './assets/img/login.webp';
import rtm from './assets/img/rtm_logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Alert } from 'react-bootstrap';

const MOBILE_BREAKPOINT = 768; // Bootstrap md

const SignUpLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Alert variant="warning" className="text-center p-4">
            <FontAwesomeIcon icon="fa-solid fa-desktop" style={{ fontSize: '2.5rem' }} className="mb-3 d-block mx-auto" />
            <Alert.Heading>Paparan Desktop Disyorkan</Alert.Heading>
            <p className="mb-0">
              Sistem ini lebih sesuai dilihat menggunakan komputer atau tablet.<br />
              Sila guna peranti desktop untuk pengalaman terbaik.
            </p>
          </Alert>
        </Container>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Hakcipta <img src={rtm} height="20" alt="RTM Logo" /> RTM MALAYSIA <FontAwesomeIcon icon="fas fa-copyright" /> 2024.
          </div>
          <div>
            <p className="text-white">Seksyen Aplikasi ICT</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="min-vh-100 d-flex flex-column">
        <div className="container-fluid flex-grow-1 d-flex align-items-center">
          <div className="row d-flex justify-content-center align-items-center w-100">
            {/* <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={login_logo} className="img-fluid" alt="Content Management System" />
            </div> */}
            <div className="col-6 offset-xs-3 mt-3">
              <h2 className="text-muted mb-3 text-center">
                <img src={rtm} width="100px" alt="RTM Logo" /> iMOHON
              </h2>
              <Outlet />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Hakcipta <img src={rtm} height="20" alt="RTM Logo" /> RTM MALAYSIA <FontAwesomeIcon icon="fas fa-copyright" /> 2024.
          </div>
          <div>
            <p className="text-white">Seksyen Aplikasi ICT</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpLayout;

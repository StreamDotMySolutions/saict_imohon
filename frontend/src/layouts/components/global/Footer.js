import React from "react";
import { NavLink,Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer className="py-3 bg-light">
      <div className="container">
      <div className="social-media-container">
      
      </div>
      <div className="row mt-3">
        <Col md={4}>
          <ul className="list-unstyled">
            <li>
              <NavLink className="text-dark text-decoration-none hover-link" to="/keselamatan">
              <FontAwesomeIcon icon="fa-solid fa-lock" />{' '}Dasar Keselamatan
              </NavLink>
     
            </li>
            <li>
              <NavLink className="text-dark text-decoration-none hover-link" to="/penafian">
              <FontAwesomeIcon icon="fa-solid fa-hand" />{' '}Penafian
              </NavLink>
            </li>
            <li>
              <NavLink className="text-dark text-decoration-none hover-link" to="/privasi">
              <FontAwesomeIcon icon="fa-solid fa-user-lock" />{' '}Dasar Privasi
              </NavLink>
            </li>

          </ul>
        </Col>
        <Col md={4}>
          
            <h5>Jabatan Penyiaran Malaysia</h5>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />{' '}
            Tingkat 12, Menara Angkasapuri, Angkasapuri Kota Media, 50614 Kuala Lumpur
            <br />
            <br />
            <FontAwesomeIcon icon="fa-solid fa-envelope" /> {' '}
             itsupport@rtm.gov.my 
            <br />
            <FontAwesomeIcon icon="fa-solid fa-phone" /> {' '}
            Tel: 03 - 2288 7703 <br />

          
        </Col>
        <Col md={4}>
          
          <FontAwesomeIcon icon="fa-solid fa-copyright" />{' '}Hak Cipta Terpelihara &copy; 2023 
          <br />
          Jabatan Penyiaran Malaysia
          <br />
          Seksyen Aplikasi ICT
          
          <p className="text-end">
            <a href="#" className="text-secondary text-decoration-none">
            <FontAwesomeIcon icon="fas fa-arrow-up" /> {' '}Kembali ke atas
            </a>
          </p>
        </Col>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

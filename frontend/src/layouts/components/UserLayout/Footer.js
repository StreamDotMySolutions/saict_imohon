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
            <li>
              <NavLink className="text-dark text-decoration-none hover-link" to="/teknologi">
              <FontAwesomeIcon icon="fa-solid fa-computer" />{' '}Teknologi
              </NavLink>
            </li>
          </ul>
        </Col>
        <Col md={4}>
          
            <h5>Jabatan Penyiaran Malaysia</h5>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />{' '}
            Angkasapuri Kota Media <br />
            50614 Kuala Lumpur <br />
            <FontAwesomeIcon icon="fa-solid fa-phone" /> {' '}
            Tel: 03 - 2288 8796 <br />
            <FontAwesomeIcon icon="fa-solid fa-fax" /> {' '}
            Faks: 03 - 2282 1927
          
        </Col>
        <Col md={4}>
          
          <FontAwesomeIcon icon="fa-solid fa-copyright" />{' '}Hak Cipta Terpelihara &copy; 2023 Seksyen Aplikasi ICT, Jabatan Penyiaran Malaysia
          
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

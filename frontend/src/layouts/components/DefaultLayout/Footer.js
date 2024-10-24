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
        <Link  to="https://www.tiktok.com/@beritartm?_t=8eNzEzhj1YV&_r=1">
          <FontAwesomeIcon icon={faTiktok} className="social-media-icon tiktok-icon"/>
        </Link>
        <Link  to="https://www.facebook.com/BeritaRTM">
          <FontAwesomeIcon icon={faFacebook} className="social-media-icon facebook-icon"/>
        </Link>
        <Link  to="https://www.youtube.com/channel/UCjUxj4cyy_F0tVCT8WfmdZQ" >
          <FontAwesomeIcon icon={faYoutube} className="social-media-icon youtube-icon"/>
        </Link>
        <Link  to="https://twitter.com/beritartm?lang=en">
          <FontAwesomeIcon icon={faTwitter} className="social-media-icon twitter-icon"/>
        </Link>
        <Link  to="https://www.instagram.com/beritartm/?hl=en">
          <FontAwesomeIcon icon={faInstagram} className="social-media-icon instagram-icon"/>
        </Link>
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

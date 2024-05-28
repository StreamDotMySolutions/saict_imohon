import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerifySuccess = () => {
    return (
    <Alert variant='warning'>
        <h1><FontAwesomeIcon icon="fa-solid fa-check" /> {' '}Email berjaya disahkan</h1>
        Email anda berjaya disahkan. Hanya perlu menunggu pengesahan admin sahaja.
        <hr />
        <Link to='/sign-in-by-nric'>
            <FontAwesomeIcon icon="fa-solid fa-reply" /> Laman utama
        </Link>
    </Alert>
    );
};

export default VerifySuccess;
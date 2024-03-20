import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerifyFailed = () => {
    return (
    <Alert variant='warning'>
        <h1><FontAwesomeIcon icon="fa-solid fa-close" /> {' '}Email gagal disahkan</h1>
        <hr />
        <Link to='/sign-in'>
            <FontAwesomeIcon icon="fa-solid fa-reply" /> Laman utama
        </Link>
    </Alert>
    );
};

export default VerifyFailed;
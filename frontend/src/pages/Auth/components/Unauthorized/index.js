import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to '/sign-in-by-nric' after 3 seconds (optional)
        const timer = setTimeout(() => {
            navigate('/sign-in-by-nric');
        }, 1000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
    <Alert variant='warning'>
        <h1><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {' '}Selesai log keluar</h1>
        Anda telah keluar daripada akaun sistem ini.
        <hr />
        <Link to='/sign-in'>
            <FontAwesomeIcon icon="fa-solid fa-reply" /> Laman utama
        </Link>
    </Alert>
    );
};

export default Unauthorized;
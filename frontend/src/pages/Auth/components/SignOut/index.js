import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/AuthStore';
import axios from '../../../../libs/axios';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignOut = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        const performSignOut = async () => {
            localStorage.clear(); // Clear all local storage items
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`);
                localStorage.clear(); // Clear all local storage items
                logout();
                navigate('/sign-in-by-nric');
            } catch (error) {
                console.error('Error during logout:', error);
                // Optionally, set an error state to display an error message to the user
            }
        };

        performSignOut();
    }, [logout, navigate]);

    if (!isAuthenticated) {
        navigate('/sign-in-by-nric');
        return null;
    }

    return (
        <Alert variant='info'>
            <h1><FontAwesomeIcon icon="fa-sync fa-spin" /> Sedang keluar...</h1>
            Sistem sedang memproses.
            <hr />
            <Link to='/sign-in'>
                <FontAwesomeIcon icon="fa-reply" /> Laman utama
            </Link>
        </Alert>
    );
};

export default SignOut;

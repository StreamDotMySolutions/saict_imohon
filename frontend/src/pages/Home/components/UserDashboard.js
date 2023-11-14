import React from 'react';
import { Row,Col } from 'react-bootstrap';
import Dashboard from '../../Application/Dashboard';

const UserDashboard = () => {
    return (<>
        <h3>Mohon</h3>
        <hr />
        <Dashboard />

        <h3>Terima</h3>
        <hr />
        <Dashboard />
        </>);
};

export default UserDashboard;
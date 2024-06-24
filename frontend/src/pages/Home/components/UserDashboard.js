import React from 'react';
import LegendPermohonan from '../../Info/LegendPermohonan';
import StatusPermohonan from '../../Info/StatusPermohonan';
const UserDashboard = () => {
    return (<>
        <h3>Sistem iMohon</h3>
        <hr />
        <LegendPermohonan />
        <br />
        <StatusPermohonan />
        </>);
};

export default UserDashboard;
import React from 'react';
import LegendPermohonan from '../../Info/LegendPermohonan';
import StatusPermohonan from '../../Info/StatusPermohonan';

const ManagerDashboard = () => {
    return (<>
       <h3>Sistem iMohon</h3>
        <hr />
        <LegendPermohonan />
        <br />
        <StatusPermohonan />
        </>);
};

export default ManagerDashboard;
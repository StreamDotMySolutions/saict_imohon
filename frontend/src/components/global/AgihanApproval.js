import React, { useState, useEffect } from 'react';

export function AgihanApprovalStatus({ step, currentStatus }) {
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('');
    //console.log(step)
    useEffect(() => {
        // Use useEffect to set the user based on the step
        switch (step) {
            case 0:
                setUser('Admin');
                break;
            case 1:
                setUser('Pelulus 2');
                break;   
            case 2:
                setUser('Pelulus 2');
            break;   
            default:
                setUser('Admin');
                break;
        }
    }, [step]); // Only run the effect if 'step' changes

    useEffect(() => {
        // Use useEffect to set the status based on the  currentStatus
        switch (currentStatus) {
            case 'pending':
                setStatus('menunggu');
                break;
            case 'approved':
                setStatus('lulus');
                break;
            case 'rejected':
                setStatus('gagal');
                break;
            default:
                setStatus('belum mohon');
                break;

        }
    }, [currentStatus]); // Only run the effect if 'currentStatus' changes

    return (
        <>
            {/* <button style={{ 'width': '180px'}} size="sm" type="button" className="btn btn-outline-secondary text-start">
                {user} <span class="badge bg-secondary">{status}</span>
            </button> */}
            {/* {step}| {currentStatus} */}

            <div  className="text-center p-2 rounded border border-1 border-light border-secondary">
                <small>{user} <span className="badge bg-secondary">{status}</span></small>
            </div>
        </>
    );
}

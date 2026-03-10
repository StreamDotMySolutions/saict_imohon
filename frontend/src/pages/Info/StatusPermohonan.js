import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge } from 'react-bootstrap';

const STEPS = [
    {
        icon: 'fas fa-pen',
        color: '#6c757d',
        badge: 'bg-secondary',
        label: 'Draf',
        actor: 'Pengguna',
        desc: 'Permohonan telah dibuat tetapi belum dihantar. Pengguna masih boleh menambah atau mengedit senarai peralatan.',
    },
    {
        icon: 'fas fa-paper-plane',
        color: '#0d6efd',
        badge: 'bg-primary',
        label: 'Menunggu Kelulusan Pelulus 1',
        actor: 'Pengurus',
        desc: 'Permohonan telah dihantar kepada Pelulus 1 (Pengurus). Menunggu semakan dan kelulusan.',
    },
    {
        icon: 'fas fa-user-check',
        color: '#0dcaf0',
        badge: 'bg-info',
        label: 'Disemak oleh Pelulus 1',
        actor: 'Pengurus',
        desc: 'Pelulus 1 telah menyemak permohonan. Proses kelulusan sedang berjalan.',
    },
    {
        icon: 'fas fa-check-circle',
        color: '#198754',
        badge: 'bg-success',
        label: 'Diluluskan oleh Pelulus 1',
        actor: 'Admin',
        desc: 'Pelulus 1 telah meluluskan permohonan. Admin akan menyediakan agihan peralatan berdasarkan permohonan ini.',
    },
    {
        icon: 'fas fa-boxes',
        color: '#fd7e14',
        badge: 'bg-warning text-dark',
        label: 'Agihan Sedang Disediakan',
        actor: 'Admin → Pelulus 2',
        desc: 'Admin sedang menyediakan senarai agihan peralatan dan memilih vendor. Setelah siap, agihan akan dihantar kepada Pelulus 2 untuk kelulusan.',
    },
    {
        icon: 'fas fa-truck',
        color: '#0d6efd',
        badge: 'bg-primary',
        label: 'Agihan Diluluskan — Penghantaran Dijadualkan',
        actor: 'Admin → Pengguna',
        desc: 'Pelulus 2 telah meluluskan agihan. Admin akan menetapkan tarikh dan maklumat penghantaran peralatan.',
    },
    {
        icon: 'fas fa-flag-checkered',
        color: '#198754',
        badge: 'bg-success',
        label: 'Selesai — Peralatan Diterima',
        actor: 'Pengguna',
        desc: 'Pengguna telah mengesahkan penerimaan peralatan. Proses permohonan telah selesai sepenuhnya.',
    },
];

const StatusPermohonan = () => {
    return (
        <div className="p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h4><FontAwesomeIcon icon={'fas fa-route'} /> Aliran Proses Permohonan</h4>
            <hr />
            <p className='text-muted'>Berikut adalah aliran keseluruhan proses permohonan dari mula hingga selesai.</p>

            <div className='mt-3'>
                {STEPS.map((step, index) => (
                    <div key={index} className='d-flex mb-3'>
                        {/* Step indicator */}
                        <div className='d-flex flex-column align-items-center me-3' style={{ minWidth: '40px' }}>
                            <div
                                className='rounded-circle d-flex align-items-center justify-content-center text-white'
                                style={{ width: '40px', height: '40px', backgroundColor: step.color, flexShrink: 0 }}
                            >
                                <FontAwesomeIcon icon={step.icon} />
                            </div>
                            {index < STEPS.length - 1 && (
                                <div style={{ width: '2px', flexGrow: 1, backgroundColor: '#dee2e6', marginTop: '4px' }} />
                            )}
                        </div>

                        {/* Step content */}
                        <div className='p-2 border rounded bg-white mb-1 flex-grow-1'>
                            <div className='d-flex align-items-center gap-2 flex-wrap'>
                                <Badge bg='' className={step.badge}>Langkah {index + 1}</Badge>
                                <strong>{step.label}</strong>
                            </div>
                            <div className='mt-1'>
                                <small className='text-muted'>
                                    <FontAwesomeIcon icon='fas fa-user' /> {step.actor}
                                </small>
                            </div>
                            <p className='mb-0 mt-1 text-secondary' style={{ fontSize: '0.9rem' }}>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusPermohonan;

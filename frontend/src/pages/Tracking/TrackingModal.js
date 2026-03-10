import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../libs/axios';

const STAGES = [
    { key: 'mohon', label: 'Permohonan', icon: 'fa-solid fa-file-pen' },
    { key: 'agihan', label: 'Pengagihan', icon: 'fa-solid fa-boxes-stacked' },
    { key: 'penghantaran', label: 'Penghantaran', icon: 'fa-solid fa-truck' },
    { key: 'penerimaan', label: 'Penerimaan', icon: 'fa-solid fa-clipboard-check' },
];

const stepLevelLabel = (step) => {
    switch (step) {
        case 0: return 'Draf';
        case 1: return 'Permohonan dihantar';
        case 2: return 'Semakan Pelulus 1';
        case 3: return 'Semakan Admin';
        case 4: return 'Selesai';
        default: return '-';
    }
};

const approvalStatusBadge = (status) => {
    switch (status) {
        case 'approved': return <Badge bg='success'>Lulus</Badge>;
        case 'rejected': return <Badge bg='danger'>Tolak</Badge>;
        case 'pending': return <Badge bg='warning' text='dark'>Dalam Tindakan</Badge>;
        default: return <Badge bg='secondary'>{status}</Badge>;
    }
};

function computeStages(mohon) {
    const items = mohon.mohon_items ?? [];
    const distributionRequests = mohon.mohon_distribution_requests ?? [];

    // Collect all distribution items across all requests
    const allDistItems = distributionRequests.flatMap(dr => dr.mohon_distribution_items ?? []);
    const deliveredItems = allDistItems.filter(di => di.mohon_distribution_item_delivery);
    const acceptedItems = allDistItems.filter(di => di.mohon_distribution_item_acceptance);

    // Boss approvals
    const allApprovals = distributionRequests.flatMap(dr => dr.mohon_distribution_approvals ?? []);
    const bossApproved = allApprovals.some(a => a.step === 2 && a.status === 'approved');

    // Mohon: always complete
    const mohonStatus = 'complete';

    // Agihan
    let agihanStatus = 'pending';
    if (allDistItems.length > 0 && bossApproved) agihanStatus = 'complete';
    else if (allDistItems.length > 0) agihanStatus = 'in-progress';

    // Penghantaran
    let deliveryStatus = 'pending';
    if (allDistItems.length > 0 && deliveredItems.length === allDistItems.length) deliveryStatus = 'complete';
    else if (deliveredItems.length > 0) deliveryStatus = 'in-progress';

    // Penerimaan
    let acceptanceStatus = 'pending';
    if (allDistItems.length > 0 && acceptedItems.length === allDistItems.length) acceptanceStatus = 'complete';
    else if (acceptedItems.length > 0) acceptanceStatus = 'in-progress';

    return {
        statuses: [mohonStatus, agihanStatus, deliveryStatus, acceptanceStatus],
        allDistItems,
        deliveredItems,
        acceptedItems,
        distributionRequests,
        allApprovals,
        bossApproved,
    };
}

const StepperVisual = ({ statuses }) => {
    const colorMap = {
        complete: '#198754',
        'in-progress': '#ffc107',
        pending: '#dee2e6',
    };
    const textMap = {
        complete: '#fff',
        'in-progress': '#000',
        pending: '#6c757d',
    };

    return (
        <div className='d-flex align-items-center justify-content-center my-4'>
            {STAGES.map((stage, i) => (
                <React.Fragment key={i}>
                    {i > 0 && (
                        <div style={{
                            flex: 1, height: 3, maxWidth: 120,
                            backgroundColor: statuses[i] !== 'pending' ? colorMap[statuses[i]] : '#dee2e6',
                        }} />
                    )}
                    <div className='d-flex flex-column align-items-center' style={{ minWidth: 80 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: '50%',
                            backgroundColor: colorMap[statuses[i]],
                            color: textMap[statuses[i]],
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.85rem', fontWeight: 600,
                            border: statuses[i] === 'in-progress' ? '3px solid #ffc107' : 'none',
                        }}>
                            {statuses[i] === 'complete'
                                ? <FontAwesomeIcon icon='fa-solid fa-check' />
                                : <FontAwesomeIcon icon={stage.icon} style={{ fontSize: '0.75rem' }} />}
                        </div>
                        <small className='mt-1 text-center' style={{
                            fontSize: '0.7rem', fontWeight: 600,
                            color: statuses[i] === 'complete' ? '#198754' : statuses[i] === 'in-progress' ? '#b8860b' : '#6c757d',
                        }}>
                            {stage.label}
                        </small>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const SectionHeader = ({ title, icon }) => (
    <h6 className='text-muted text-uppercase mb-2 mt-4 d-flex align-items-center gap-2'
        style={{ fontSize: '0.7rem', letterSpacing: '0.08em', borderBottom: '1px solid #dee2e6', paddingBottom: '6px' }}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {title}
    </h6>
);

export default function TrackingModal({ mohonRequestId, referenceNo }) {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [show, setShow] = useState(false);
    const [mohon, setMohon] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!show) return;
        setLoading(true);
        axios(`${apiUrl}/global/mohon-requests/${mohonRequestId}`)
            .then(response => setMohon(response.data.mohon))
            .catch(error => console.warn(error))
            .finally(() => setLoading(false));
    }, [show, mohonRequestId]);

    const handleClose = () => { setShow(false); setMohon(null); };

    const stages = mohon ? computeStages(mohon) : null;
    const user = mohon?.user;
    const mohonApprovals = mohon?.mohon_approvals ?? [];

    return (
        <>
            <Button size='sm' variant='outline-primary' onClick={() => setShow(true)}>
                <FontAwesomeIcon icon='fa-solid fa-timeline' className='me-1' />
                Jejak
            </Button>

            <Modal size='xl' show={show} onHide={handleClose} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '1rem' }}>
                        <FontAwesomeIcon icon='fa-solid fa-timeline' className='me-2 text-primary' />
                        Penjejakan &mdash; {referenceNo}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && <div className='text-center py-5 text-muted'>Memuatkan...</div>}
                    {!loading && mohon && stages && (
                        <>
                            {/* Stepper Visual */}
                            <StepperVisual statuses={stages.statuses} />

                            {/* Stage 1: Permohonan */}
                            <SectionHeader title='Peringkat 1 - Permohonan' icon='fa-solid fa-file-pen' />
                            <Row className='g-2 mb-2'>
                                <Col xs={6} md={3}>
                                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                                        <Card.Body className='py-2 px-3'>
                                            <div className='text-muted' style={{ fontSize: '0.72rem' }}>Pemohon</div>
                                            <div className='fw-semibold' style={{ fontSize: '0.85rem' }}>{user?.name ?? '-'}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                                        <Card.Body className='py-2 px-3'>
                                            <div className='text-muted' style={{ fontSize: '0.72rem' }}>Jabatan</div>
                                            <div className='fw-semibold' style={{ fontSize: '0.85rem' }}>{user?.user_profile?.user_department?.name ?? '-'}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                                        <Card.Body className='py-2 px-3'>
                                            <div className='text-muted' style={{ fontSize: '0.72rem' }}>Jumlah Peralatan</div>
                                            <div className='fw-semibold' style={{ fontSize: '0.85rem' }}>{mohon.mohon_items_count ?? (mohon.mohon_items?.length ?? 0)} unit</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{ backgroundColor: '#f8f9fa' }}>
                                        <Card.Body className='py-2 px-3'>
                                            <div className='text-muted' style={{ fontSize: '0.72rem' }}>Tarikh</div>
                                            <div className='fw-semibold' style={{ fontSize: '0.85rem' }}>{mohon.created_at}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Table hover responsive size='sm'>
                                <thead className='table-light'>
                                    <tr>
                                        <th>Peranan</th>
                                        <th>Peringkat</th>
                                        <th className='text-center'>Status</th>
                                        <th>Justifikasi</th>
                                        <th className='text-center'>Tarikh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mohonApprovals.map((item, index) => (
                                        <tr key={index}>
                                            <td><Badge bg='dark'>{item.user?.roles?.[0]?.name?.toUpperCase() ?? '-'}</Badge></td>
                                            <td><small className='text-muted'>{stepLevelLabel(item.step)}</small></td>
                                            <td className='text-center'>{approvalStatusBadge(item.status)}</td>
                                            <td><small>{item.message || '-'}</small></td>
                                            <td className='text-center'><small>{item.created_at}</small></td>
                                        </tr>
                                    ))}
                                    {mohonApprovals.length === 0 && (
                                        <tr><td colSpan={5} className='text-center text-muted py-2'>Tiada rekod kelulusan.</td></tr>
                                    )}
                                </tbody>
                            </Table>

                            {/* Stage 2: Pengagihan */}
                            <SectionHeader title='Peringkat 2 - Pengagihan' icon='fa-solid fa-boxes-stacked' />
                            {stages.distributionRequests.length === 0 ? (
                                <p className='text-muted' style={{ fontSize: '0.85rem' }}>Tiada agihan lagi.</p>
                            ) : (
                                stages.distributionRequests.map((agihan, i) => (
                                    <div key={i} className='mb-3'>
                                        <div className='d-flex align-items-center gap-2 mb-1'>
                                            <Badge bg='info'>{agihan.reference_no ?? `Agihan #${agihan.id}`}</Badge>
                                            <small className='text-muted'>{agihan.created_at}</small>
                                        </div>
                                        {/* Boss approval */}
                                        {agihan.mohon_distribution_approvals?.length > 0 && (
                                            <Table hover responsive size='sm' className='mb-2'>
                                                <thead className='table-light'>
                                                    <tr>
                                                        <th>Pelulus</th>
                                                        <th className='text-center'>Status</th>
                                                        <th>Justifikasi</th>
                                                        <th className='text-center'>Tarikh</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {agihan.mohon_distribution_approvals.map((a, j) => (
                                                        <tr key={j}>
                                                            <td><Badge bg='dark'>{a.boss?.name ?? '-'}</Badge></td>
                                                            <td className='text-center'>{approvalStatusBadge(a.status)}</td>
                                                            <td><small>{a.message || '-'}</small></td>
                                                            <td className='text-center'><small>{a.created_at}</small></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                        {/* Items */}
                                        {agihan.mohon_distribution_items?.length > 0 && (
                                            <Table responsive size='sm' style={{ backgroundColor: '#f8f9fa' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Bil.</th>
                                                        <th>Penerima</th>
                                                        <th>Peralatan</th>
                                                        <th>Vendor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {agihan.mohon_distribution_items.map((di, k) => (
                                                        <tr key={k}>
                                                            <td><Badge bg='secondary'>{k + 1}</Badge></td>
                                                            <td><small>{di.mohon_item?.name ?? '-'}</small></td>
                                                            <td><small>{di.category?.name ?? '-'}</small></td>
                                                            <td><small>{di.inventory?.vendor ?? '-'}</small></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                    </div>
                                ))
                            )}

                            {/* Stage 3: Penghantaran */}
                            <SectionHeader title='Peringkat 3 - Penghantaran' icon='fa-solid fa-truck' />
                            {stages.allDistItems.length === 0 ? (
                                <p className='text-muted' style={{ fontSize: '0.85rem' }}>Tiada item untuk dihantar.</p>
                            ) : (
                                <Table hover responsive size='sm'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Bil.</th>
                                            <th>Penerima</th>
                                            <th>Peralatan</th>
                                            <th className='text-center'>Status</th>
                                            <th className='text-center'>Tarikh Mula</th>
                                            <th className='text-center'>Tarikh Selesai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stages.allDistItems.map((di, i) => {
                                            const delivery = di.mohon_distribution_item_delivery;
                                            return (
                                                <tr key={i}>
                                                    <td><Badge bg='secondary'>{i + 1}</Badge></td>
                                                    <td><small>{di.mohon_item?.name ?? '-'}</small></td>
                                                    <td><small>{di.category?.name ?? '-'}</small></td>
                                                    <td className='text-center'>
                                                        {delivery
                                                            ? <Badge bg='success'>Dihantar</Badge>
                                                            : <Badge bg='warning' text='dark'>Belum</Badge>}
                                                    </td>
                                                    <td className='text-center'><small>{delivery?.date_start ?? '-'}</small></td>
                                                    <td className='text-center'><small>{delivery?.date_end ?? '-'}</small></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            )}

                            {/* Stage 4: Penerimaan */}
                            <SectionHeader title='Peringkat 4 - Penerimaan' icon='fa-solid fa-clipboard-check' />
                            {stages.allDistItems.length === 0 ? (
                                <p className='text-muted' style={{ fontSize: '0.85rem' }}>Tiada item untuk diterima.</p>
                            ) : (
                                <Table hover responsive size='sm'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Bil.</th>
                                            <th>Penerima</th>
                                            <th>Peralatan</th>
                                            <th className='text-center'>Status</th>
                                            <th>No. Siri</th>
                                            <th className='text-center'>Tarikh Pemasangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stages.allDistItems.map((di, i) => {
                                            const acceptance = di.mohon_distribution_item_acceptance;
                                            return (
                                                <tr key={i}>
                                                    <td><Badge bg='secondary'>{i + 1}</Badge></td>
                                                    <td><small>{di.mohon_item?.name ?? '-'}</small></td>
                                                    <td><small>{di.category?.name ?? '-'}</small></td>
                                                    <td className='text-center'>
                                                        {acceptance
                                                            ? <Badge bg='success'>Diterima</Badge>
                                                            : <Badge bg='warning' text='dark'>Belum</Badge>}
                                                    </td>
                                                    <td><small>{acceptance?.serial_number ?? '-'}</small></td>
                                                    <td className='text-center'><small>{acceptance?.installation_date ?? '-'}</small></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' size='sm' onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

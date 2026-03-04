import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Row, Table } from 'react-bootstrap';
import axios from '../../libs/axios';
import { useParams } from 'react-router-dom';
import JustificationModal from '../Mohon/modals/JustificationModal';

const stepLabel = (step, status) => {
    if (step === 0) return { text: 'Draf', bg: 'secondary' };
    if (step === 1 && status === 'pending') return { text: 'Menunggu Pelulus 1', bg: 'warning' };
    if (step === 2 && status === 'approved') return { text: 'Diluluskan', bg: 'success' };
    if (step === 2 && status === 'rejected') return { text: 'Ditolak', bg: 'danger' };
    if (step === 3 && status === 'pending') return { text: 'Dalam Proses Admin', bg: 'warning' };
    if (step === 3 && status === 'approved') return { text: 'Diluluskan', bg: 'success' };
    if (step === 4 && status === 'approved') return { text: 'Selesai', bg: 'success' };
    if (step === 4 && status === 'rejected') return { text: 'Ditolak', bg: 'danger' };
    return { text: 'Belum Memohon', bg: 'secondary' };
};

const approvalStatusBadge = (status) => {
    switch (status) {
        case 'approved': return <Badge bg='success'>Lulus</Badge>;
        case 'rejected': return <Badge bg='danger'>Tolak</Badge>;
        case 'pending':  return <Badge bg='warning' text='dark'>Dalam Tindakan</Badge>;
        default:         return <Badge bg='secondary'>{status}</Badge>;
    }
};

const agihanStatusBadge = (status) => {
    switch (status) {
        case 'approved': return <Badge bg='success'>Lulus</Badge>;
        case 'rejected': return <Badge bg='danger'>Tolak</Badge>;
        case 'pending':  return <Badge bg='warning' text='dark'>Dalam Tindakan</Badge>;
        default:         return <Badge bg='secondary'>{status ?? '-'}</Badge>;
    }
};

const SectionHeader = ({ title }) => (
    <h6 className='text-muted text-uppercase mb-2 mt-4'
        style={{ fontSize: '0.7rem', letterSpacing: '0.08em', borderBottom: '1px solid #dee2e6', paddingBottom: '6px' }}>
        {title}
    </h6>
);

const InfoCard = ({ label, value }) => (
    <Col xs={6} md={4}>
        <Card className='h-100' style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body className='py-2 px-3'>
                <div className='text-muted' style={{ fontSize: '0.72rem' }}>{label}</div>
                <div className='fw-semibold' style={{ fontSize: '0.9rem' }}>{value ?? '-'}</div>
            </Card.Body>
        </Card>
    </Col>
);

const ShowAgihan = ({ mohonRequestId: propMohonRequestId }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { mohonRequestId: paramMohonRequestId } = useParams();
    const mohonRequestId = propMohonRequestId || paramMohonRequestId;

    const [mohon, setMohon] = useState(null);

    useEffect(() => {
        axios(`${apiUrl}/global/mohon-requests/${mohonRequestId}`)
            .then(response => setMohon(response.data.mohon))
            .catch(error => console.warn(error));
    }, [mohonRequestId]);

    if (!mohon) return <div className='text-center py-5 text-muted'>Memuatkan...</div>;

    const approval = mohon.mohon_approval;
    const { text: statusText, bg: statusBg } = stepLabel(approval?.step, approval?.status);
    const items = mohon.mohon_items ?? [];
    const mohonApprovals = mohon.mohon_approvals ?? [];
    const distributionRequests = mohon.mohon_distribution_requests ?? [];
    const user = mohon.user;

    return (
        <div>
            {/* Header */}
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <div>
                    <h5 className='mb-1 fw-bold'>{mohon.reference_no ?? `Permohonan #${mohon.id}`}</h5>
                    <Badge bg={statusBg} text={statusBg === 'warning' ? 'dark' : undefined}>
                        {statusText}
                    </Badge>
                </div>
                <div className='text-muted' style={{ fontSize: '0.8rem' }}>
                    {mohon.created_at}
                </div>
            </div>

            <hr className='mt-2 mb-3' />

            {/* Maklumat Pemohon */}
            <SectionHeader title='Maklumat Pemohon' />
            <Row className='g-2 mb-3'>
                <InfoCard label='Nama' value={user?.name} />
                <InfoCard label='Kad Pengenalan' value={user?.nric} />
                <InfoCard label='Telefon' value={user?.user_profile?.phone} />
                <InfoCard label='Jabatan' value={user?.user_profile?.user_department?.name} />
                <InfoCard label='Jumlah Peralatan' value={`${mohon.mohon_items_count} unit`} />
                <InfoCard label='Tarikh Permohonan' value={mohon.created_at} />
            </Row>

            {/* Senarai Peralatan */}
            <SectionHeader title={`Senarai Peralatan Dimohon (${items.length} unit)`} />
            <Table hover responsive size='sm' className='mb-3'>
                <thead className='table-light'>
                    <tr>
                        <th style={{ width: '30px' }}>Bil.</th>
                        <th>Peralatan</th>
                        <th>Jenis</th>
                        <th>Penerima</th>
                        <th>Jawatan</th>
                        <th>Telefon</th>
                        <th>Bangunan</th>
                        <th>Tingkat</th>
                        <th>Lokasi</th>
                        <th className='text-center'>Justifikasi</th>
                        <th className='text-center'>Status Agihan</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const delivery = item.mohon_distribution_item?.mohon_distribution_item_delivery;
                        const acceptance = item.mohon_distribution_item?.mohon_distribution_item_acceptance;
                        return (
                            <tr key={index}>
                                <td><Badge bg='secondary'>{index + 1}</Badge></td>
                                <td>{item.category?.name}</td>
                                <td>
                                    <Badge bg={item.type === 'new' ? 'success' : 'warning'} text={item.type === 'new' ? undefined : 'dark'}>
                                        {item.type === 'new' ? 'Baharu' : 'Ganti'}
                                    </Badge>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.occupation}</td>
                                <td>{item.mobile}</td>
                                <td>{item.building_name}</td>
                                <td>{item.building_level}</td>
                                <td>{item.location}</td>
                                <td className='text-center'>
                                    {item.description
                                        ? <JustificationModal message={item.description} />
                                        : <span className='text-muted'>-</span>}
                                </td>
                                <td className='text-center'>
                                    {acceptance ? (
                                        <Badge bg='success'>Diterima</Badge>
                                    ) : delivery ? (
                                        <Badge bg='warning' text='dark'>Dalam Penghantaran</Badge>
                                    ) : (
                                        <Badge bg='secondary'>Belum Diagih</Badge>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={11} className='text-center text-muted py-3'>Tiada peralatan.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Kelulusan & Agihan side by side */}
            <Row className='g-3'>
                {/* Kelulusan Permohonan */}
                <Col md={6}>
                    <SectionHeader title='Kelulusan Permohonan' />
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
                </Col>

                {/* Agihan */}
                <Col md={6}>
                    <SectionHeader title='Agihan' />
                    {distributionRequests.length === 0 ? (
                        <p className='text-muted'>Tiada agihan lagi.</p>
                    ) : (
                        distributionRequests.map((agihan, i) => (
                            <div key={i} className='mb-3'>
                                <div className='d-flex align-items-center gap-2 mb-1'>
                                    <Badge bg='primary'>{agihan.reference_no ?? `#${agihan.id}`}</Badge>
                                    <small className='text-muted'>{agihan.created_at}</small>
                                </div>
                                <Table hover responsive size='sm'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th className='text-center'>Status</th>
                                            <th>Justifikasi</th>
                                            <th className='text-center'>Tarikh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agihan.mohon_distribution_approvals?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='text-center'>{agihanStatusBadge(item.status)}</td>
                                                <td><small>{item.message || '-'}</small></td>
                                                <td className='text-center'><small>{item.created_at}</small></td>
                                            </tr>
                                        ))}
                                        {(!agihan.mohon_distribution_approvals || agihan.mohon_distribution_approvals.length === 0) && (
                                            <tr><td colSpan={3} className='text-center text-muted py-2'>Tiada kelulusan agihan.</td></tr>
                                        )}
                                    </tbody>
                                </Table>

                                {/* Peralatan dalam agihan */}
                                {agihan.mohon_distribution_items?.length > 0 && (
                                    <Table responsive size='sm' style={{ backgroundColor: '#f8f9fa' }}>
                                        <thead>
                                            <tr>
                                                <th>Penerima</th>
                                                <th>Peralatan</th>
                                                <th>Vendor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {agihan.mohon_distribution_items.map((di, k) => (
                                                <tr key={k}>
                                                    <td><small>{di.mohon_item?.name}</small></td>
                                                    <td><small>{di.category?.name}</small></td>
                                                    <td><small>{di.inventory?.vendor ?? '-'}</small></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </div>
                        ))
                    )}
                </Col>
            </Row>
        </div>
    );
};

function stepLevelLabel(step) {
    switch (step) {
        case 0: return 'Draf';
        case 1: return 'Permohonan dihantar';
        case 2: return 'Semakan Pelulus 1';
        case 3: return 'Semakan Admin';
        case 4: return 'Selesai';
        default: return '-';
    }
}

export default ShowAgihan;

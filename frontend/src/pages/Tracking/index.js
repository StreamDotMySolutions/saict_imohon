import React, { useEffect, useState } from 'react';
import { Badge, Button, Container, Form, InputGroup, Pagination, Table } from 'react-bootstrap';
import axios from '../../libs/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrackingModal from './TrackingModal';
import useAuthStore from '../Auth/stores/AuthStore';

const STAGES = ['Mohon', 'Agihan', 'Penghantaran', 'Penerimaan'];

function getStageStatuses(mohon) {
    const distCount = mohon.mohon_distribution_items_count ?? 0;
    const deliveryCount = mohon.mohon_distribution_items_with_delivery_count ?? 0;
    const acceptanceCount = mohon.mohon_distribution_items_with_acceptance_count ?? 0;

    // Mohon: always complete (step=4 approved is prerequisite)
    const mohonStatus = 'complete';

    // Agihan: check if distribution items exist
    let agihanStatus = 'pending';
    if (distCount > 0) agihanStatus = 'complete';

    // Penghantaran
    let deliveryStatus = 'pending';
    if (distCount > 0 && deliveryCount === distCount) deliveryStatus = 'complete';
    else if (deliveryCount > 0) deliveryStatus = 'in-progress';

    // Penerimaan
    let acceptanceStatus = 'pending';
    if (distCount > 0 && acceptanceCount === distCount) acceptanceStatus = 'complete';
    else if (acceptanceCount > 0) acceptanceStatus = 'in-progress';

    return [mohonStatus, agihanStatus, deliveryStatus, acceptanceStatus];
}

const statusColor = (status) => {
    if (status === 'complete') return '#198754';
    if (status === 'in-progress') return '#ffc107';
    return '#dee2e6';
};

const statusTextColor = (status) => {
    if (status === 'complete') return '#fff';
    if (status === 'in-progress') return '#000';
    return '#6c757d';
};

const CompactStepper = ({ mohon }) => {
    const statuses = getStageStatuses(mohon);
    return (
        <div className='d-flex align-items-center justify-content-center gap-0'>
            {STAGES.map((stage, i) => (
                <React.Fragment key={i}>
                    {i > 0 && (
                        <div style={{
                            width: 20, height: 2,
                            backgroundColor: statuses[i] === 'complete' ? '#198754' : statuses[i] === 'in-progress' ? '#ffc107' : '#dee2e6'
                        }} />
                    )}
                    <div
                        title={stage}
                        style={{
                            width: 24, height: 24, borderRadius: '50%',
                            backgroundColor: statusColor(statuses[i]),
                            color: statusTextColor(statuses[i]),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: 600,
                            border: statuses[i] === 'in-progress' ? '2px solid #ffc107' : 'none',
                            flexShrink: 0,
                        }}
                    >
                        {statuses[i] === 'complete'
                            ? <FontAwesomeIcon icon='fa-solid fa-check' style={{ fontSize: '0.55rem' }} />
                            : i + 1}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const Tracking = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const role = useAuthStore(s => s.user?.role);
    const trackingUrl = role === 'admin' ? `${apiUrl}/admin/tracking` : `${apiUrl}/user/tracking`;
    const [mohons, setMohons] = useState([]);
    const [links, setLinks] = useState([]);
    const [pageUrl, setPageUrl] = useState(null);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const url = pageUrl ?? trackingUrl;
        const params = search ? `${url.includes('?') ? '&' : '?'}search=${encodeURIComponent(search)}` : '';
        axios({ method: 'get', url: `${url}${params}` })
            .then(response => {
                const data = response.data.items;
                setMohons(data.data);
                setLinks(data.links);
            })
            .catch(error => console.warn(error));
    }, [pageUrl, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPageUrl(null);
        setSearch(searchInput);
    };

    return (
        <Container>
            <h4 className='mb-1'>Penjejakan</h4>
            <p className='text-muted'>
                {role === 'admin'
                    ? 'Jejak status permohonan dari awal hingga penerimaan.'
                    : 'Jejak status permohonan jabatan anda dari awal hingga penerimaan.'}
            </p>
            <hr />

            <Form onSubmit={handleSearch} className='mb-3'>
                <InputGroup style={{ maxWidth: 400 }}>
                    <Form.Control
                        size='sm'
                        placeholder='Cari no. rujukan atau nama pemohon...'
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    <Button variant='outline-secondary' size='sm' type='submit'>
                        <FontAwesomeIcon icon='fa-solid fa-search' />
                    </Button>
                </InputGroup>
            </Form>

            {/* Legend */}
            <div className='d-flex gap-3 mb-3' style={{ fontSize: '0.75rem' }}>
                {[
                    { label: 'Selesai', color: '#198754', textColor: '#fff' },
                    { label: 'Dalam Proses', color: '#ffc107', textColor: '#000' },
                    { label: 'Belum', color: '#dee2e6', textColor: '#6c757d' },
                ].map((item, i) => (
                    <div key={i} className='d-flex align-items-center gap-1'>
                        <div style={{
                            width: 14, height: 14, borderRadius: '50%',
                            backgroundColor: item.color, flexShrink: 0
                        }} />
                        <span className='text-muted'>{item.label}</span>
                    </div>
                ))}
            </div>

            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>ID Mohon</th>
                        <th>Pemohon</th>
                        <th>Jabatan</th>
                        <th className='text-center'>Progress</th>
                        <th className='text-center'>Tarikh</th>
                        <th className='text-center'>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {mohons?.map((mohon, index) => (
                        <tr key={index}>
                            <td>
                                <Badge bg='primary'>
                                    {mohon.reference_no ?? `#${mohon.id}`}
                                </Badge>
                            </td>
                            <td>{mohon.user?.name}</td>
                            <td>{mohon.user?.user_profile?.user_department?.name ?? '-'}</td>
                            <td className='text-center'>
                                <CompactStepper mohon={mohon} />
                            </td>
                            <td className='text-center'>
                                <small>{mohon.created_at}</small>
                            </td>
                            <td className='text-center'>
                                <TrackingModal mohonRequestId={mohon.id} referenceNo={mohon.reference_no ?? `#${mohon.id}`} />
                            </td>
                        </tr>
                    ))}
                    {mohons?.length === 0 && (
                        <tr>
                            <td colSpan={6} className='text-center text-muted py-4'>
                                Tiada permohonan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className='d-flex justify-content-end'>
                <Pagination className='mt-3'>
                    {links?.map((page, index) => (
                        <Pagination.Item
                            key={index}
                            active={page.active}
                            disabled={page.url === null}
                            onClick={() => page.url && setPageUrl(page.url)}
                        >
                            <span dangerouslySetInnerHTML={{ __html: page.label }} />
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </Container>
    );
};

export default Tracking;

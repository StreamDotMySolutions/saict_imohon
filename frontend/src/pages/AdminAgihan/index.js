import React, { useEffect, useState } from 'react';
import { Badge, Button, Container, Nav, Pagination, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../../libs/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReportingModal from '../Reporting/ReportingModal';
import AgihanDraftModal from './AgihanDraftModal';

const TABS = [
    { key: 'baharu',   label: 'Baharu',   bg: 'warning', text: 'dark'  },
    { key: 'menunggu', label: 'Menunggu', bg: 'info',    text: 'white' },
    { key: 'lulus',    label: 'Lulus',    bg: 'success', text: 'white' },
    { key: 'gagal',    label: 'Gagal',    bg: 'danger',  text: 'white' },
];

const AdminAgihan = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab') ?? 'baharu';
    const [mohons, setMohons] = useState([]);
    const [links, setLinks] = useState([]);
    const [pageUrl, setPageUrl] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Reset pagination whenever tab changes (including via navigate())
    useEffect(() => {
        setPageUrl(null);
    }, [tab]);

    useEffect(() => {
        const url = pageUrl ?? `${apiUrl}/admin/agihan/mohon?tab=${tab}`;
        axios({ method: 'get', url })
            .then(response => {
                const data = response.data.items;
                setMohons(data.data);
                setLinks(data.links);
            })
            .catch(error => console.warn(error));
    }, [tab, pageUrl, refreshKey]);

    const handleTabChange = (key) => {
        setSearchParams({ tab: key });
        setPageUrl(null);
    };

    return (
        <Container>
            <h4 className='mb-1'>Agihan</h4>
            <p className='text-muted'>Senarai permohonan yang telah diluluskan dan sedia untuk diagih.</p>
            <hr />

            {/* Tabs */}
            <Nav variant='tabs' className='mb-3'>
                {TABS.map(t => (
                    <Nav.Item key={t.key}>
                        <Nav.Link
                            active={tab === t.key}
                            onClick={() => handleTabChange(t.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Badge bg={t.bg} text={t.text} className='me-1'>&nbsp;</Badge>
                            {t.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>ID Mohon</th>
                        <th>Pemohon</th>
                        <th>Jabatan</th>
                        <th className='text-center'>Peralatan Dimohon</th>
                        <th className='text-center'>Peralatan Diagih</th>
                        <th className='text-center'>Tarikh Permohonan</th>
                        <th className='text-center'>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {mohons?.map((mohon, index) => (
                        <tr key={index}>
                            <td>
                                <ReportingModal mohonRequestId={mohon.id} trigger={
                                    <Badge bg='primary' style={{ cursor: 'pointer' }}>
                                        {mohon.reference_no ?? `#${mohon.id}`}
                                    </Badge>
                                } />
                            </td>
                            <td>{mohon.user?.name}</td>
                            <td>{mohon.user?.user_profile?.user_department?.name ?? '-'}</td>
                            <td className='text-center'>{mohon.mohon_items_count}</td>
                            <td className='text-center'>{mohon.mohon_distribution_items_count ?? 0}</td>
                            <td className='text-center'>{mohon.created_at}</td>
                            <td className='text-center'>
                                {tab === 'baharu'
                                    ? <AgihanDraftModal mohonId={mohon.id} referenceNo={mohon.reference_no ?? `#${mohon.id}`} onDelete={() => setRefreshKey(k => k + 1)} />
                                    : <Link to={`/mohon-distribution-requests/${mohon.id}`}>
                                        <Button size='sm' variant='outline-success'>
                                            <FontAwesomeIcon icon='fas fa-boxes-stacked' /> Agihan
                                        </Button>
                                    </Link>
                                }
                            </td>
                        </tr>
                    ))}
                    {mohons?.length === 0 && (
                        <tr>
                            <td colSpan={7} className='text-center text-muted py-4'>
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

export default AdminAgihan;

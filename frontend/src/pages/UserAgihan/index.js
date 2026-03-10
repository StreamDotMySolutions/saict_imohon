import React, { useEffect, useState } from 'react';
import { Badge, Container, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../libs/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserAgihan = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [agihan, setAgihan] = useState([]);
    const [links, setLinks] = useState([]);
    const [paginate, setPaginate] = useState(null);

    const url = paginate ?? `${apiUrl}/user/agihan`;

    useEffect(() => {
        axios(url)
            .then(response => {
                setAgihan(response.data.agihan.data);
                setLinks(response.data.agihan.links);
            })
            .catch(error => console.warn(error));
    }, [url]);

    const statusBadge = (item) => {
        if (item.mohon_distribution_item_acceptance) {
            return <Badge bg='success'>Diterima</Badge>;
        }
        if (item.mohon_distribution_item_delivery) {
            return <Badge bg='warning' text='dark'>Penghantaran Dijadualkan</Badge>;
        }
        return <Badge bg='secondary'>Menunggu Penghantaran</Badge>;
    };

    return (
        <Container>
            <h3>Agihan</h3>
            <p className='text-muted'>Senarai agihan peralatan yang telah diluluskan untuk permohonan anda.</p>
            <hr />

            {agihan.length === 0 ? (
                <div className='text-center text-muted py-5'>
                    <FontAwesomeIcon icon='fas fa-box-open' style={{ fontSize: '2rem' }} />
                    <p className='mt-2'>Tiada agihan yang diluluskan pada masa ini.</p>
                </div>
            ) : (
                agihan.map((request, i) => (
                    <div key={i} className='mb-4 border rounded p-3' style={{ backgroundColor: '#fafafa' }}>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div>
                                <Badge bg='primary' className='me-2'>Permohonan #{request.mohon_request_id}</Badge>
                                <Badge bg='success'>Agihan #{request.id}</Badge>
                            </div>
                            <small className='text-muted'>{request.mohon_distribution_approval?.created_at}</small>
                        </div>

                        <Table size='sm' className='mt-2' bordered hover>
                            <thead className='table-light'>
                                <tr>
                                    <th>Peralatan</th>
                                    <th>Penerima</th>
                                    <th>Vendor</th>
                                    <th className='text-center'>Tarikh Mula</th>
                                    <th className='text-center'>Tarikh Tamat</th>
                                    <th className='text-center'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {request.mohon_distribution_items.map((item, j) => (
                                    <tr key={j}>
                                        <td>{item.category?.name}</td>
                                        <td>{item.mohon_item?.name}</td>
                                        <td>{item.inventory?.vendor ?? '-'}</td>
                                        <td className='text-center'>
                                            {item.mohon_distribution_item_delivery?.date_start ?? '-'}
                                        </td>
                                        <td className='text-center'>
                                            {item.mohon_distribution_item_delivery?.date_end ?? '-'}
                                        </td>
                                        <td className='text-center'>{statusBadge(item)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div className='text-end'>
                            <Link to={`/mohon/${request.mohon_request_id}`} className='btn btn-sm btn-outline-primary'>
                                <FontAwesomeIcon icon='fas fa-eye' /> Lihat Permohonan
                            </Link>
                        </div>
                    </div>
                ))
            )}

            {links.length > 0 && (
                <Pagination className='mt-3'>
                    {links.map((page, i) => (
                        <Pagination.Item
                            key={i}
                            active={page.active}
                            disabled={page.url === null}
                            onClick={() => setPaginate(page.url)}
                        >
                            <span dangerouslySetInnerHTML={{ __html: page.label }} />
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
        </Container>
    );
};

export default UserAgihan;

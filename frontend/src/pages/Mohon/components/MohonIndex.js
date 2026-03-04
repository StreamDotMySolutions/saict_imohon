import React, { useState, useEffect } from 'react'
import { Table, Pagination, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../libs/axios'
import DeleteModal from '../modals/DeleteModal'
import CreateModal from '../modals/CreateModal'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const stepLabel = (step, status) => {
    if (step === 0) return { text: 'Draf', bg: 'secondary' };
    if (step === 1 && status === 'pending') return { text: 'Menunggu Pelulus 1', bg: 'warning' };
    if (step === 2 && status === 'approved') return { text: 'Lulus Pelulus 1', bg: 'primary' };
    if (step === 2 && status === 'rejected') return { text: 'Ditolak', bg: 'danger' };
    if (step === 3 && status === 'pending') return { text: 'Dalam Proses Admin', bg: 'warning' };
    if (step === 3 && status === 'approved') return { text: 'Diluluskan', bg: 'success' };
    return { text: 'Tidak Diketahui', bg: 'secondary' };
};

const canDelete = (step, status) =>
    step === 0 || (step === 2 && status === 'rejected');

const MohonIndex = () => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        axios({
            method: 'get',
            url: `${apiUrl}/user/mohon-requests`
        })
        .then(response => {
            setMohons(response.data.mohons)
            store.setValue('refresh', false)
        })
        .catch(error => console.warn(error))
    }, [store.getValue('refresh'), store.url])

    const data = mohons?.data ?? [];

    return (
        <Container>
            {/* Page header */}
            <Row className='align-items-center mb-3'>
                <Col>
                    <h3 className='mb-0'>Permohonan Saya</h3>
                    <small className='text-muted'>Senarai semua permohonan peralatan yang telah anda buat.</small>
                </Col>
                <Col xs='auto'>
                    <CreateModal />
                </Col>
            </Row>
            <hr />

            {data.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <Table hover responsive>
                        <thead className='table-light'>
                            <tr>
                                <th style={{ width: '50px' }}>No.</th>
                                <th>Nama</th>
                                <th className='text-center'>Peralatan Mohon</th>
                                <th className='text-center'>Peralatan Agihan</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Tarikh Permohonan</th>
                                <th className='text-center'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((mohon, index) => {
                                const { text, bg } = stepLabel(
                                    mohon.mohon_approval?.step,
                                    mohon.mohon_approval?.status
                                );
                                const deletable = canDelete(
                                    mohon.mohon_approval?.step,
                                    mohon.mohon_approval?.status
                                );

                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <Badge bg='primary'>{mohon.numbering}</Badge>
                                        </td>
                                        <td>{mohon.user?.name}</td>
                                        <td className='text-center'>{mohon.mohon_items_count}</td>
                                        <td className='text-center'>{mohon.mohon_distribution_items_count}</td>
                                        <td className='text-center'>
                                            <Badge bg={bg} text={bg === 'warning' ? 'dark' : undefined}>
                                                {text}
                                            </Badge>
                                        </td>
                                        <td className='text-center'>{mohon.created_at}</td>
                                        <td className='text-center'>
                                            <Link to={`/mohon/${mohon.id}`}>
                                                <Button size='sm' variant='outline-primary' className='me-1'>
                                                    <FontAwesomeIcon icon='fas fa-eye' /> Lihat
                                                </Button>
                                            </Link>
                                            {deletable && (
                                                <DeleteModal
                                                    id={mohon.id}
                                                    step={mohon.mohon_approval?.step}
                                                    status={mohon.mohon_approval?.status}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    <div className='d-flex justify-content-end mt-2'>
                        <PaginatorLink items={mohons} />
                    </div>
                </>
            )}
        </Container>
    );
};

const EmptyState = () => (
    <div className='text-center py-5 text-muted'>
        <FontAwesomeIcon icon='fas fa-clipboard' style={{ fontSize: '3rem', opacity: 0.3 }} />
        <p className='mt-3 mb-1 fs-5'>Tiada permohonan lagi.</p>
        <p className='mb-3'>Klik butang di bawah untuk membuat permohonan pertama anda.</p>
        <CreateModal />
    </div>
);

function PaginatorLink({ items }) {
    const handlePaginationClick = (url) => {
        useMohonStore.setState({ url })
    }

    const links = items?.links?.map((page, index) => (
        <Pagination.Item
            key={index}
            active={page.active}
            disabled={page.url === null}
            onClick={() => handlePaginationClick(page.url)}
        >
            <span dangerouslySetInnerHTML={{ __html: page.label }} />
        </Pagination.Item>
    ))

    return <Pagination className='mt-3'>{links}</Pagination>
}

export default MohonIndex;

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Alert, Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const MohonShow = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { mohonRequestId } = useParams();
    const [mohon, setMohon] = useState(null);

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/global/mohon-requests/${mohonRequestId}` })
            .then(response => setMohon(response.data.mohon))
            .catch(error => console.warn(error));
    }, [mohonRequestId]);

    if (!mohon) return <div className='text-center py-5 text-muted'>Memuatkan...</div>;

    const approval = mohon.mohon_approval;
    const { text: statusText, bg: statusBg } = stepLabel(approval?.step, approval?.status);

    return (
        <Container>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge bg='secondary'>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item active">Butiran Permohonan</li>
                </ol>
            </nav>

            {/* Page header */}
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <div>
                    <h4 className='mb-1'>{mohon.reference_no ?? `Permohonan #${mohon.id}`}</h4>
                    <Badge bg={statusBg} text={statusBg === 'warning' ? 'dark' : undefined} className='fs-6'>
                        {statusText}
                    </Badge>
                </div>
                <div className='d-flex gap-2'>
                    <Link to={`/mohon-items/${mohon.id}`}>
                        <Button size='sm' variant='outline-primary'>
                            <FontAwesomeIcon icon='fas fa-tools' /> Peralatan
                        </Button>
                    </Link>
                    {mohon.mohon_distribution_requests?.length > 0 ? (
                        <Link to={`/agihan/${mohon.id}`}>
                            <Button size='sm' variant='outline-success'>
                                <FontAwesomeIcon icon='fas fa-boxes-stacked' /> Agihan
                            </Button>
                        </Link>
                    ) : (
                        <Button size='sm' variant='outline-secondary' disabled>
                            <FontAwesomeIcon icon='fas fa-boxes-stacked' /> Agihan
                        </Button>
                    )}
                </div>
            </div>

            <hr />

            {/* Notifikasi tiada peralatan */}
            {mohon.mohon_items_count === 0 && approval?.step === 0 && (
                <Alert variant='warning' className='d-flex align-items-center gap-2'>
                    <FontAwesomeIcon icon='fas fa-circle-exclamation' />
                    <span>
                        Permohonan ini belum mempunyai peralatan. Sila{' '}
                        <Alert.Link as={Link} to={`/mohon-items/${mohon.id}?create=true`}>
                            tambah peralatan
                        </Alert.Link>{' '}
                        sebelum menghantar permohonan.
                    </span>
                </Alert>
            )}

            {/* Maklumat Pemohon */}
            <h6 className='text-muted text-uppercase mb-2'>Maklumat Pemohon</h6>
            <Row className='g-2 mb-4'>
                {[
                    { label: 'Kad Pengenalan', value: mohon.user?.nric },
                    { label: 'Telefon', value: mohon.user?.user_profile?.phone },
                    { label: 'Jabatan', value: mohon.user?.user_profile?.user_department?.name },
                    { label: 'Jumlah Peralatan', value: `${mohon.mohon_items_count} unit` },
                    { label: 'Tarikh Permohonan', value: mohon.created_at },
                ].map(({ label, value }) => (
                    <Col xs={6} md={4} lg={3} key={label}>
                        <Card className='h-100' style={{ backgroundColor: '#f8f9fa' }}>
                            <Card.Body className='py-2 px-3'>
                                <div className='text-muted' style={{ fontSize: '0.75rem' }}>{label}</div>
                                <div className='fw-semibold'>{value ?? '-'}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Senarai Peralatan */}
            <h6 className='text-muted text-uppercase mb-2'>Senarai Peralatan Dimohon</h6>
            <Table hover responsive className='mb-4'>
                <thead className='table-light'>
                    <tr>
                        <th>Peralatan</th>
                        <th>Jenis</th>
                        <th>Penerima</th>
                        <th>Jawatan</th>
                        <th>Telefon</th>
                        <th>Bangunan</th>
                        <th>Tingkat</th>
                        <th>Lokasi</th>
                        <th className='text-center'>Status Agihan</th>
                    </tr>
                </thead>
                <tbody>
                    {mohon.mohon_items?.map((item, index) => {
                        const delivery = item.mohon_distribution_item?.mohon_distribution_item_delivery;
                        const acceptance = item.mohon_distribution_item?.mohon_distribution_item_acceptance;
                        return (
                            <tr key={index}>
                                <td>{item.category?.name}</td>
                                <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                <td>{item.name}</td>
                                <td>{item.occupation}</td>
                                <td>{item.mobile}</td>
                                <td>{item.building_name}</td>
                                <td>{item.building_level}</td>
                                <td>{item.location}</td>
                                <td className='text-center'>
                                    {acceptance ? (
                                        <Badge bg='success'>Diterima</Badge>
                                    ) : delivery ? (
                                        <Badge bg='warning' text='dark'>
                                            {delivery.date_start} – {delivery.date_end}
                                        </Badge>
                                    ) : (
                                        <Badge bg='secondary'>Belum Diagih</Badge>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Row className='g-3'>
                {/* Kelulusan Permohonan */}
                <Col md={6}>
                    <h6 className='text-muted text-uppercase mb-2'>Kelulusan Permohonan</h6>
                    <Table hover responsive>
                        <thead className='table-light'>
                            <tr>
                                <th>Peranan</th>
                                <th>Status</th>
                                <th>Justifikasi</th>
                                <th className='text-center'>Tarikh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mohon.mohon_approvals?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.user?.roles?.[0]?.name.toUpperCase()}</td>
                                    <td>{approvalStatusBadge(item.status)}</td>
                                    <td>{item.message}</td>
                                    <td className='text-center'>{item.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                {/* Kelulusan Agihan */}
                <Col md={6}>
                    <h6 className='text-muted text-uppercase mb-2'>Kelulusan Agihan</h6>
                    {mohon.mohon_distribution_requests?.length > 0 ? (
                        mohon.mohon_distribution_requests.map((agihan, i) => (
                            <Table hover responsive key={i}>
                                <thead className='table-light'>
                                    <tr>
                                        <th>Status</th>
                                        <th>Justifikasi</th>
                                        <th className='text-center'>Tarikh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agihan.mohon_distribution_approvals?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{approvalStatusBadge(item.status)}</td>
                                            <td>{item.message}</td>
                                            <td className='text-center'>{item.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ))
                    ) : (
                        <p className='text-muted'>Tiada agihan lagi.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MohonShow;

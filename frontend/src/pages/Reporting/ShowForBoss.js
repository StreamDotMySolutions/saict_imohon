import { useEffect, useState } from 'react'
import { Badge, Card, Col, Row, Table } from 'react-bootstrap'
import axios from '../../libs/axios'
import JustificationModal from '../Mohon/modals/JustificationModal'

const ShowForBoss = ({ mohonRequestId: propMohonRequestId }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [mohon, setMohon] = useState(null)

    useEffect(() => {
        axios(`${apiUrl}/global/mohon-requests/${propMohonRequestId}`)
            .then(response => setMohon(response.data.mohon))
            .catch(error => console.warn(error))
    }, [])

    if (!mohon) return <p className='text-muted text-center py-4'>Memuatkan...</p>

    const user = mohon.user
    const items = mohon.mohon_items ?? []
    const distributionRequests = mohon.mohon_distribution_requests ?? []

    return (
        <div>
            {/* ── Maklumat Pemohon ─────────────────────────────────── */}
            <div className='mb-4'>
                <h6 className='text-uppercase text-muted mb-2'>Maklumat Pemohon</h6>
                <Table size='sm' borderless style={{ maxWidth: 480 }} className='mb-0'>
                    <tbody>
                        <InfoRow label='No. Rujukan' value={mohon.reference_no ?? `#${mohon.id}`} />
                        <InfoRow label='Pemohon' value={user?.name} />
                        <InfoRow label='Emel' value={user?.email} />
                        <InfoRow label='Jabatan' value={user?.user_profile?.user_department?.name} />
                        <InfoRow label='Tarikh Permohonan' value={mohon.created_at} />
                    </tbody>
                </Table>
            </div>

            {/* ── Peralatan Dipohon ────────────────────────────────── */}
            <div className='mb-4'>
                <h6 className='text-uppercase text-muted mb-2'>
                    Peralatan Dipohon ({items.length} unit)
                </h6>
                <Table size='sm' hover responsive>
                    <thead className='table-light'>
                        <tr>
                            <th style={{ width: 40 }}>No.</th>
                            <th>Penerima</th>
                            <th>Jawatan</th>
                            <th>No. Telefon</th>
                            <th>Bangunan</th>
                            <th>Tingkat</th>
                            <th>Lokasi</th>
                            <th>Peralatan</th>
                            <th>Jenis</th>
                            <th>Justifikasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 && (
                            <tr><td colSpan={10} className='text-center text-muted py-3'>Tiada peralatan.</td></tr>
                        )}
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className='text-center align-middle'>{index + 1}</td>
                                <td className='align-middle'>{item.name}</td>
                                <td className='align-middle'>{item.occupation}</td>
                                <td className='align-middle'>{item.mobile ?? '-'}</td>
                                <td className='align-middle'>{item.building_name ?? '-'}</td>
                                <td className='align-middle'>{item.building_level ?? '-'}</td>
                                <td className='align-middle'>{item.location ?? '-'}</td>
                                <td className='align-middle'>{item.category?.name}</td>
                                <td className='align-middle'>
                                    <Badge
                                        bg={item.type === 'new' ? 'success' : 'warning'}
                                        text={item.type === 'new' ? undefined : 'dark'}
                                    >
                                        {item.type === 'new' ? 'Baharu' : 'Ganti'}
                                    </Badge>
                                </td>
                                <td className='align-middle'>
                                    <JustificationModal message={item.description} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* ── Maklumat Agihan ──────────────────────────────────── */}
            {distributionRequests.length > 0 && (
                <div className='mb-2'>
                    <h6 className='text-uppercase text-muted mb-2'>Maklumat Agihan</h6>
                    {distributionRequests.map((req, reqIndex) => {
                        const approval = req.mohon_distribution_approvals?.[0]
                        return (
                            <Card key={reqIndex} className='mb-3 shadow-sm'>
                                <Card.Header className='d-flex align-items-center justify-content-between py-2'>
                                    <strong>{req.reference_no ?? `Agihan #${req.id}`}</strong>
                                    {approval && (
                                        <Badge
                                            bg={approval.status === 'approved' ? 'success' : approval.status === 'rejected' ? 'danger' : 'warning'}
                                            text={approval.status === 'pending' ? 'dark' : undefined}
                                        >
                                            {approval.status === 'approved' ? 'Diluluskan' : approval.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                                        </Badge>
                                    )}
                                </Card.Header>
                                <Card.Body className='p-0'>
                                    <Table size='sm' hover className='mb-0'>
                                        <thead className='table-light'>
                                            <tr>
                                                <th>Penerima</th>
                                                <th>Peralatan</th>
                                                <th>Vendor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {req.mohon_distribution_items?.map((dItem, dKey) => (
                                                <tr key={dKey}>
                                                    <td>{dItem.mohon_item?.name ?? '-'}</td>
                                                    <td>{dItem.category?.name ?? '-'}</td>
                                                    <td>{dItem.inventory?.vendor ?? '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const InfoRow = ({ label, value }) => (
    <tr>
        <td className='text-muted' style={{ width: 160 }}>{label}</td>
        <td className='fw-semibold'>{value ?? '-'}</td>
    </tr>
)

export default ShowForBoss

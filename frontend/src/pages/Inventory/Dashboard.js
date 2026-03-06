import { useEffect, useState } from 'react'
import { Badge, Card, Col, Row, Table } from 'react-bootstrap'
import axios from '../../libs/axios'

const InventoryDashboard = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [inventories, setInventories] = useState([])
    const [byCategory, setByCategory] = useState([])

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/admin/inventories/dashboard` })
            .then(response => setInventories(response.data.inventories))
        axios({ method: 'get', url: `${apiUrl}/admin/requested-items/dashboard` })
            .then(response => setByCategory(response.data.by_category))
    }, [])

    return (
        <>
            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>No.</th>
                        <th>Vendor</th>
                        <th>No. Kontrak</th>
                        <th>Kategori</th>
                        <th className='text-center'>Jumlah Inventori</th>
                        <th className='text-center'>Dicadangkan</th>
                        <th className='text-center'>Disahkan Agihan</th>
                        <th className='text-center'>Baki</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories?.map((item, index) => {
                        const baki = (item.total ?? 0) - (item.disahkan_count ?? 0)
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.vendor}</td>
                                <td>{item.contract_number ?? '-'}</td>
                                <td>{item.category?.name ?? '-'}</td>
                                <td className='text-center'>
                                    <Badge bg='primary'>{item.total ?? 0}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg='warning' text='dark'>{item.dicadangkan_count ?? 0}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg='success'>{item.disahkan_count ?? 0}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg={baki > 0 ? 'info' : 'secondary'} text={baki > 0 ? 'dark' : 'white'}>{baki}</Badge>
                                </td>
                            </tr>
                        )
                    })}
                    {inventories?.length === 0 && (
                        <tr>
                            <td colSpan={8} className='text-center text-muted py-4'>Tiada rekod.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Legend */}
            <div className='d-flex gap-3 mt-2' style={{ fontSize: '0.82rem', color: '#666' }}>
                <span><Badge bg='primary'>n</Badge> Jumlah unit dalam inventori (kontrak)</span>
                <span><Badge bg='warning' text='dark'>n</Badge> Dicadangkan dalam agihan (belum disahkan)</span>
                <span><Badge bg='success'>n</Badge> Disahkan agihan (diluluskan Pelulus 2)</span>
                <span><Badge bg='info' text='dark'>n</Badge> Baki tersedia</span>
            </div>

            {/* Peralatan Dimohon mengikut Kategori */}
            <h6 className='mt-5 mb-3'>Peralatan Dimohon mengikut Kategori</h6>
            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>No.</th>
                        <th>Kategori</th>
                        <th className='text-center'>Jumlah Dimohon</th>
                        <th className='text-center'>Diluluskan Agihan</th>
                        <th className='text-center'>Telah Diterima</th>
                        <th className='text-center'>Baki</th>
                    </tr>
                </thead>
                <tbody>
                    {byCategory?.map((row, index) => {
                        const baki = row.total - row.diterima
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.category}</td>
                                <td className='text-center'>
                                    <Badge bg='primary'>{row.total}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg='info'>{row.agihan}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg='success'>{row.diterima}</Badge>
                                </td>
                                <td className='text-center'>
                                    <Badge bg={baki > 0 ? 'warning' : 'secondary'} text={baki > 0 ? 'dark' : 'white'}>{baki}</Badge>
                                </td>
                            </tr>
                        )
                    })}
                    {byCategory?.length === 0 && (
                        <tr>
                            <td colSpan={6} className='text-center text-muted py-4'>Tiada rekod.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className='d-flex gap-3 mt-2' style={{ fontSize: '0.82rem', color: '#666' }}>
                <span><Badge bg='primary'>n</Badge> Jumlah peralatan dimohon</span>
                <span><Badge bg='info'>n</Badge> Diluluskan agihan</span>
                <span><Badge bg='success'>n</Badge> Telah diterima pengguna</span>
                <span><Badge bg='warning' text='dark'>n</Badge> Baki belum diterima</span>
            </div>
        </>
    )
}

export default InventoryDashboard

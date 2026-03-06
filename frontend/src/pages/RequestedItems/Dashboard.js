import { useEffect, useState } from 'react'
import { Badge, Table } from 'react-bootstrap'
import axios from '../../libs/axios'

const RequestedItemsDashboard = ({ apiUrl }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios({ method: 'get', url: apiUrl })
            .then(response => setData(response.data.by_category))
    }, [apiUrl])

    return (
        <>
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
                    {data?.map((row, index) => {
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
                    {data?.length === 0 && (
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

export default RequestedItemsDashboard

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

const LegendPermohonan = () => {
    return (
        <div>
            <div className=" p-2 bd-highlight border rounded" style={{backgroundColor:'#f0f0f0'}}>
            <h3><FontAwesomeIcon icon={'fas fa-clipboard-list'}/> {' '}PENERANGAN</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Penerangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'><Badge>#ID</Badge></td>
                            <td>Merujuk kepada ID permohonan. ID ialah unik.</td>
                        </tr>
                        <tr>
                            <td className='text-center'><strong>Nama</strong></td>
                            <td>
                               Merujuk kepada individu yang membuat permohonan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'><strong>Peralatan Mohon</strong></td>
                            <td>
                                Merujuk kepada jumlah peralatan yang dimohon.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'><strong>Peralatan Agihan</strong></td>
                            <td>
                               Merujuk kepada jumlah peralatan yang telah diagihkan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'><strong>Status Terkini Permohonan</strong></td>
                            <td>
                                Merujuk kepada status terkini kelulusan permohonan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'><strong><Button variant={'outline-info'} size={'sm'}>Lihat</Button></strong></td>
                            <td>
                                Melihat dan mengurus permohonan secara lebih detail.
                            </td>
                        </tr>

                        <tr>
                            <td className='text-center'><strong><Button variant={'outline-danger'} size={'sm'}>Hapus</Button></strong></td>
                            <td>
                                Memadam permohonan ( hanya boleh dihapus sebelum permohonan dibuat ke Pelulus-1 atau permohonan ditolak oleh Pelulus-1)
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default LegendPermohonan;
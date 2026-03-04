import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';

const LegendPermohonan = () => {
    return (
        <div className="p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h4><FontAwesomeIcon icon={'fas fa-info-circle'} /> Tentang Sistem iMohon</h4>
            <hr />
            <p>
                Sistem <strong>iMohon</strong> adalah platform pengurusan permohonan dan pengagihan peralatan ICT.
                Pengguna boleh membuat permohonan peralatan, dan permohonan tersebut akan melalui proses kelulusan
                sebelum diagihkan kepada pemohon.
            </p>

            <h5 className='mt-4'><FontAwesomeIcon icon={'fas fa-list'} /> Cara Membuat Permohonan</h5>
            <ol className='mt-2'>
                <li>Klik menu <strong>Permohonan</strong> di bar navigasi.</li>
                <li>Klik butang <Button size='sm' variant='primary'>+ Permohonan Baharu</Button> untuk membuat permohonan baru.</li>
                <li>Isikan maklumat permohonan termasuk senarai peralatan yang diperlukan.</li>
                <li>Hantar permohonan kepada <strong>Pelulus 1 (Pengurus)</strong> untuk kelulusan.</li>
            </ol>

            <h5 className='mt-4'><FontAwesomeIcon icon={'fas fa-book'} /> Glosari</h5>
            <Row className='mt-2 g-2'>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong><Badge bg='secondary'>#ID</Badge></strong>
                        <span className='ms-2'>Nombor unik bagi setiap permohonan.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong>Peralatan Mohon</strong>
                        <span className='ms-2'>Jumlah peralatan yang dimohon oleh pemohon.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong>Peralatan Agihan</strong>
                        <span className='ms-2'>Jumlah peralatan yang telah berjaya diagihkan.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong>Pelulus 1</strong>
                        <span className='ms-2'>Pengurus jabatan yang meluluskan permohonan.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong>Pelulus 2</strong>
                        <span className='ms-2'>Pegawai atasan yang meluluskan agihan peralatan.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <strong>Admin</strong>
                        <span className='ms-2'>Pentadbir sistem yang menguruskan agihan peralatan.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <Button variant='outline-info' size='sm'>Lihat</Button>
                        <span className='ms-2'>Melihat butiran permohonan secara terperinci.</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-2 border rounded bg-white'>
                        <Button variant='outline-danger' size='sm'>Hapus</Button>
                        <span className='ms-2'>Memadam permohonan (hanya sebelum dihantar ke Pelulus 1 atau jika ditolak).</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LegendPermohonan;

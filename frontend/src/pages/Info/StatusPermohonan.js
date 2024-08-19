import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'react-bootstrap';

const StatusPermohonan = () => {
    return (
        <div>
            <div className=" p-2 bd-highlight border rounded" style={{backgroundColor:'#f0f0f0'}}>
            <h3><FontAwesomeIcon icon={'fas fas fa-clipboard-list'}/> {' '} STATUS PERMOHONAN</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Peringkat</th>
                            <th>Penerangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'>0</td>
                            <td>User membuat permohonan</td>
                        </tr>
                        <tr>
                            <td className='text-center'>1</td>
                            <td>
                                User telah memohon<br />
                                Menunggu Pelulus 1 mengesahkan permohonan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>2</td>
                            <td>
                                Pelulus satu telah membuat pengesahan<br />
                                Menunggu Admin HQ mengesahkan permohonan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>3</td>
                            <td>
                                Pelulus satu telah meluluskan permohonan<br />
                                Menunggu Admin HQ mengesahkan permohonan.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>4</td>
                            <td>
                                Admin telah meluluskan permohonan<br />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StatusPermohonan;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'react-bootstrap';

const StatusAgihan = () => {
    return (
        <div>
            <div className=" p-2 bd-highlight border rounded" style={{backgroundColor:'#f0f0f0'}}>
            <h3><FontAwesomeIcon icon={'fas fa-question'}/> {' '} STATUS AGIHAN</h3>
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
                            <td>Admin membuat agihan peralatan.</td>
                        </tr>
                        <tr>
                            <td className='text-center'>1</td>
                            <td>
                               Admin membuat permohonan agihan kepada Pelulus-2.
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>2</td>
                            <td>
                               Pelulus-2 mengesahkan permohonan agihan.
                            </td>
                        </tr>
                       
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StatusAgihan;
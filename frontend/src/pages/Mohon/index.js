import React from 'react'
import CreateModal from './modals/CreateModal'
import { Col, Row, Table } from 'react-bootstrap';

const Mohon = () => {
    return (
        <div>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </Table>
    
        </div>
    );
};

export default Mohon;
import React from 'react'
import CreateModal from './modals/CreateModal'
import { Col, Row, Table } from 'react-bootstrap';
import MohonIndex from './components/MohonIndex';

const Mohon = () => {
    return (
        <div>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div>

            <MohonIndex />
    
        </div>
    );
};

export default Mohon;
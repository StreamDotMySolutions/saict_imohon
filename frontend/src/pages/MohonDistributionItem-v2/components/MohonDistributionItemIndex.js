import React, { useState, useEffect } from 'react'
import { Row,Table,Pagination, Button } from 'react-bootstrap'
import useMohonItemStore from '../store'
import axios from '../../../libs/axios'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'
import ViewModal from '../modals/ViewModal'
import CreateModal from '../modals/CreateModal'
import ApprovalModal from '../../MohonDistributionRequest/modals/ApprovalModal'

const MohonDistributionItemIndex = ({agihanRequestId}) => {

    const store = useMohonItemStore()
    const [mohonItems, setMohonItems ] = useState([])

    console.log(store.mohonDistributionUrl)

    useEffect( () => {
        
        axios(`${store.mohonDistributionUrl}/${agihanRequestId}`)
        .then( response => {
            console.log(response)
            setMohonItems(response.data.mohon.mohon_request.mohon_items)
        })
        .catch( error => {
            console.warn(error)
        })
        .finally()
    },[agihanRequestId])




    // from agihanRequestId, get mohonId
    // mohon-distribution/{id}
    
    return (
        <Row className='mt-5 mb-3'>
            <h2>PERMOHONAN</h2>
            <Table>
                <thead>
                    <tr>
                        <th style={{'width':'20px'}}>ID</th>
                        <th style={{'width':'200px'}}>NAMA</th>
                        <th>PERALATAN</th>
                        <th className='text-center'>AGIHAN</th>
                    </tr>
                </thead>
                <tbody>
                {mohonItems?.map((item,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{item.id}</span></td>
                            <td> {item.name}</td>
                            <td> {item.category.name}</td>
                            <td className='text-center'><input type='checkbox' /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Row>
    );
};

export default MohonDistributionItemIndex;
import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Pagination, Button } from 'react-bootstrap';
import useStore from './store';
import axios from '../../libs/axios';
import { Link } from 'react-router-dom';
import ReportingModal from '../MohonApproval/Admin/modals/ReportingModal'

const Index = () => {
    const store = useStore();
    const [mohons, setMohons] = useState([])
    const [links, setLinks] = useState([])
    const [paginate, setPaginate] = useState()
    let apiUrl = paginate ? paginate : `${store.url}/agihan/mohon`;


    useEffect(() => {
        axios(apiUrl) // get mohon data from Agihan controller
        .then( response => {
            //console.log(response)
            let mohon = response.data.items
            setMohons(mohon.data)
            setLinks(mohon.links)
        })
        .catch ( error => {
            console.warn(error)
        })
        .finally();

    }, [paginate]); // Add store.url to dependencies if it can change

    
    /**
     * Paginator Links
     */
    function PaginatorLink ({links}){

        // extract the data from Laravel Paginator JSON
        const paginator = links?.map( (page,index) => 
            <Pagination.Item
                key={index} 
                active={page.active}
                disabled={page.url === null}
                onClick={() => setPaginate(page.url)}
                >
                    <span dangerouslySetInnerHTML={{__html: page.label}} />
            </Pagination.Item>
        );
    
        return  (
        <Pagination className='mt-3'>
            {paginator}
        </Pagination>
        )
    }

    const TableHead = () => {
        return (
            <thead>
                <tr>
                    <th style={{width:'10px'}}>ID</th>
                    <th>JABATAN</th>
                    <th style={{width:'100px'}}>PEMOHON</th>
                    <th style={{width:'200px'}}>TARIKH PERMOHONAN</th>
                    <th style={{width:'200px'}}>JUMLAH PERALATAN</th>
                    <th className="text-center" style={{width:'200px'}}>TINDAKAN</th>
                </tr>
            </thead>
        )
    }
    
    const TableData = () => {
        if(mohons.length > 0 ){
            return mohons.map( (item,index) => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.user?.user_profile?.user_department?.name}</td>
                    <td className='text-center'>{item.user?.name}</td>
                    <td className='text-center'>{item.created_at}</td>
                    <td className='text-center'>{item.mohon_items_count}</td>
                    <td className='text-center'>
                     <ReportingModal id={item.id} />
                    </td>
                </tr>
            )
              
            )
        }

        return null;
          
    };

    return (
        <Container>
            <h2>AGIHAN</h2>
            <hr />
            <h5>Senarai permohonan</h5>

            <Table>
                <TableHead />
                <tbody>
                    <TableData />
                </tbody>
            </Table>


            <div className="d-flex bd-highlight">
                <Row className="ms-auto p-2 bd-highlight">
                    <PaginatorLink links={links} />
                </Row>
            </div>
        </Container>
    );
};

export default Index;

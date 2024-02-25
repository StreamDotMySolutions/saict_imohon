import React, { useState, useEffect} from 'react'
import { Table,Pagination, Button,Row,Col } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../libs/axios'
import { Link, useParams } from 'react-router-dom'


const MohonRequest = () => {
    const { mohonRequestId } = useParams()
    const store = useMohonStore()
    const [response, setResponse] = useState([])

    //console.log(store.mohonUrl)

    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${store.mohonRequestUrl}/${mohonRequestId}` // eg GET http://localhost:8000/api/mohon/123
                } 
            )
            .then( response => { // response block
                //console.log(response.data.mohon)   // output to console  
                setResponse(response.data.mohon) // assign data to const = mohons
                store.setValue('refresh', false ) // set MohonIndex listener back to FALSE
            })
            .catch( error => { // error block
                console.warn(error) // output to console
            })
      },
        [
            store.getValue('refresh'), // Form action listener
            store.url // pagination listener
        ] 

    ) // useEffect()

    return (
        <div>
            <Row>
                <Col>

                    <div className='p-3 border border-1 rounded'>
                        <h5>Maklumat Pemohon</h5>
                        <hr />
                        <Table>
                            <tr>
                                <th style={{ 'width': '120px'}}>Nama:</th>
                                <td>{response.user?.name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{response.user?.email}</td>
                            </tr>
                            <tr>
                                <th>Jabatan:</th>
                                <td>{response.user?.user_profile?.user_department?.name}</td>
                            </tr>
                       </Table>
                    </div>
                    <div className='mt-2 p-3 border border-1'>
                        <h5>Maklumat Permohonan</h5>
                        <hr />
                       <Table>

                           <tr>
                                <th>Jumlah peralatan:</th>
                                <td>{response.mohon_items_count} unit</td>
                            </tr>

                            <tr>
                                <th>Tajuk:</th>
                                <td>{response.title}</td>
                            </tr>

                            <tr>
                                <th>Butiran:</th>
                                <td>{response.description}</td>
                            </tr>

                            <tr>
                                <th>Tarikh:</th>
                                <td>{response.created_at}</td>
                            </tr>
                        </Table>
                    </div>
                </Col>
                <Col>
                    
                    <div className='p-3 border border-1'>
                        <h5>Kelulusan Terkini </h5>
                        <hr />
                        <Table>
                            <tr>
                                <th style={{ 'width': '120px'}}>Peringkat:</th>
                                <td>{response.mohon_approval?.step}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td>{response.mohon_approval?.status}</td>
                            </tr>
                            <tr>
                                <th>Pelulus</th>
                                <td>{response.mohon_approval?.user?.name}</td>
                            </tr>
                            <tr>
                                <th>Tarikh:</th>
                                <td>{response.mohon_approval?.updated_at}</td>
                            </tr>
                        </Table>
                    </div>
                </Col>
            </Row>
     

            <div className='p-3 mt-3 border border-1'>
            <h5>Senarai Peralatan</h5>
            <hr />

            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Description</th>
                 
                    </tr>
                </thead>

                <tbody>
                    {response?.mohon_items?.map((item,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{item.id}</span></td>
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.description}</td>
                   
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>


        </div>
    );
};
export default MohonRequest;


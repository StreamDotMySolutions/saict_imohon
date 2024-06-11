import { Link } from 'react-router-dom'
import MohonIndex from './components/MohonIndex'
import { Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useMohonStore from './store'
import axios from '../../libs/axios'
import { useEffect, useState } from 'react'
import { Table,Pagination, Button,Row,Col } from 'react-bootstrap'
import EditModal from '../Mohon/modals/EditModal'
import DeleteModal from '../Mohon/modals/DeleteModal'

const MohonShow = () => {
    const { mohonRequestId } = useParams()
    const store = useMohonStore()
    const [response, setResponse] = useState([])

    //console.log(`${store.mohonRequestUrl}/${mohonRequestId}`)

    useEffect( () => {
        axios({
            'method' : 'get',
            'url' : `${store.mohonRequestUrl}/${mohonRequestId}`
            })
            .then( response => {
              console.log(response.data.mohon)
              setResponse(response.data.mohon)
            })
            .catch ( error => {
              console.warn(error)
            })
    }, [mohonRequestId])

    function ApprovalLevel({step}){
        const [level,setLevel] = useState('')

        useEffect( () => {
            switch (step) {
                case 0:
                    setLevel('User cipta permohonan');
                    break;
                case 1:
                    setLevel('User mohon kelulusan dari Pelulus 1');
                    break;   
                case 2:
                    setLevel('Di peringkat Pelulus 1');
                break;   
                case 3:
                    setLevel('Pelulus 1 mohon kelulusan dari Admin');
                break;   

                case 4:
                    setLevel('Di peringkat Admin');
                break;   
            }
        })

        return (
            <>
            {level}
            </>
        )
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/mohon'><Badge>Mohon</Badge></Link>
                        
                        </li>
                    <li className="breadcrumb-item"><Badge>{response?.id}</Badge>{' '}{response?.title}</li>
                </ol>
            </nav>
            <div>

            <Row>

            <Row className="mb-3 mt-3 border p-3" style={{backgroundColor:""}}>
                <h2>MAKLUMAT PEMOHON</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>NAMA</th>
                            <th>EMAIL</th>
                            <th>TELEFON</th>
                            <th>JABATAN</th>
                            <th>JUMLAH PERALATAN</th>
                            <th>TARIKH</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{response.user?.name}</td>
                            <td>{response.user?.email}</td>
                            <td>{response.user?.user_profile?.phone}</td>
                            <td>{response.user?.user_profile?.user_department?.name}</td>
                            <td>{response.mohon_items_count} unit</td>
                            <td>{response.created_at}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Row className='border p-3'>
                <div className="d-flex mb-3 mt-3" style={{backgroundColor:""}}>
                    <h5 className="me-auto"><h2>MAKLUMAT PERALATAN YANG DIMOHON</h2></h5>
                    <div className="ms-auto">
                       
                 
                        <Link to={`/mohon-items/${response.id}`}>
                            <Button size='sm'>Peralatan</Button>
                        </Link>
                        {' '}
                            { response?.mohon_distribution_requests?.length > 0 ?
                            <Link to={`/agihan/${response.id}`}>
                                <Button size="sm">Agihan</Button>
                            </Link>
                            :
                                <Button disabled size="sm">Agihan</Button>
                            }
                    </div>
                </div>
                <Table>
                    <thead>
                        <tr>
                        
                            <th>Peralatan</th>
                            <th>Jenis</th>
                            <th>Pemohon</th>
                            <th>Jawatan</th>
                            <th>Telefon</th>
                          
                            <th>Nama Bangunan</th>
                            <th>Tingkat</th>
                            <th>Lokasi</th>
                    
                        </tr>
                    </thead>

                    <tbody>
                        {response?.mohon_items?.map((item,index) => (
                            <tr key={index}>
                     
                                <td>{item.category?.name}</td>
                                <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                <td>{item.name}</td>
                                <td>{item.occupation}</td>
                                <td>{item.mobile}</td>
                               
                                <td>{item.building_name}</td>
                                <td>{item.building_level}</td>
                                <td>{item.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
                

            <Row className="mb-3 mt-3 border p-3" style={{backgroundColor:""}}>
                <h2>MAKLUMAT KELULUSAN PERMOHONAN</h2>
                <Table>
                    <thead>
                        <tr>
                            <th className='col-1'>Peringkat</th>
                            <th className='col-1'>Status</th>
                            <th className='col-8'>Nama</th>
                            <th className='text-center'>Tarikh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response?.mohon_approvals?.map((item,index) => (
                            <tr key={index}>
                              
                                <td className='text-center'>{item.step}</td>
                                <td>{item.status}</td>
                                <td>{item?.user.name}</td>
                                <td className='text-center'>{item.created_at}</td>
                    
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
              


            </Row>

            <Row>
                <Col>
                    <div className='p-3 border border-1 rounded'>
                        <div className="d-flex bd-highlight mb-3">
                            <h5 className="me-auto p-2 bd-highlight">MOHON : Maklumat</h5>
                            <div className="ms-auto p-2 bd-highlight">
                               {/* <EditModal id={response.id}  step={response.mohon_approval?.step} />
                               {' '} */}
                               <DeleteModal id={response.id}  step={response.mohon_approval?.step} />
                            </div>
                        </div>
                        <hr />
                        <Table>
                            <tr>
                                <th style={{ 'width': '120px'}}>Nama</th>
                                <td>{response.user?.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{response.user?.email}</td>
                            </tr>
                            <tr>
                                <th>Jabatan</th>
                                <td>{response.user?.user_profile?.user_department?.name}</td>
                            </tr>
         
                           <tr>
                                <th style={{ 'width': '120px'}}>Jumlah peralatan dimohon</th>
                                <td>{response.mohon_items_count} unit</td>
                            </tr>

                            <tr>
                                <th>Tarikh</th>
                                <td>{response.created_at}</td>
                            </tr>
                        </Table>
                    </div>

                    <div className='p-3 mt-3 border border-1'>
                        <div className="d-flex bd-highlight mb-3">
                            <h5 className="me-auto p-2 bd-highlight">MOHON : Senarai Peralatan</h5>
                            <div className="ms-auto p-2 bd-highlight">
                                
                                <Link to={`/mohon-items/${response.id}`}>
                                    <Button size='sm'>Peralatan</Button>
                                </Link>
                            </div>
                        </div>
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
                </Col>
                <Col>
                <div className='p-3 border border-1 '>
                    <div className="d-flex bd-highlight mb-3">
                        <h5 className="me-auto p-2 bd-highlight">MOHON : Kelulusan</h5>
                        <div className="ms-auto p-2 bd-highlight">

                            { response?.mohon_distribution_requests?.length > 0 ?
                            <Link to={`/agihan/${response.id}`}>
                                <Button size="sm">Agihan</Button>
                            </Link>
                            :
                                <Button disabled size="sm">Agihan</Button>
                            }
                        </div>
                    </div>
                    <hr />
                    {response?.mohon_approvals?.map((approval, index) => {
                        let className = 'p-2 border border-1 rounded-1 mt-2';
                        switch (approval.status) {
                            case 'approved':
                                className += ' bg-success';
                                break;
                            case 'rejected':
                                className += ' bg-danger';
                                break;
                            case 'pending':
                                className += ' bg-warning';
                                break;
                            default:
                                break;
                        }

                        // Check if approval.step is 1 and update className accordingly
                        if (approval.step === 0) {
                            className = 'p-2 border border-1 rounded-1 mt-2 bg-info';
                        }

                        return (
                            <div key={index} className={className}>
                                <Table>
                                    <tr>
                                        <th style={{ 'width': '120px'}}>Peringkat:</th>
                                        <td><ApprovalLevel step={approval?.step} /></td>
                                    </tr>
                                    <tr>
                                        <th>Status:</th>
                                        <td>{approval?.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Nama</th>
                                        <td>{approval?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Tarikh:</th>
                                        <td>{approval?.updated_at}</td>
                                    </tr>
                                </Table>
                            </div>
                        );
                    })}

                </div>
                </Col>
            </Row>
     


        </div>
        </div>
    );
};

export default MohonShow;
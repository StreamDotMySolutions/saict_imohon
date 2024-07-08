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
// import StatusPermohonan from '../Mohon/components/StatusPermohonan'
// import StatusAgihan from '../Mohon/components/StatusAgihan'

const MohonShow = () => {
    const base_url = process.env.REACT_APP_BACKEND_URL
    const { mohonRequestId } = useParams()
    const store = useMohonStore()
    const [response, setResponse] = useState([])

    //console.log(`${store.mohonRequestUrl}/${mohonRequestId}`)

    useEffect( () => {
        axios({
                'method' : 'get',
                //'url' : `${store.mohonRequestUrl}/${mohonRequestId}`
                'url' : `${base_url}/mohon/${mohonRequestId}`
            })
            .then( response => {
                //console.log(`${store.mohonRequestUrl}/${mohonRequestId}`)
                //console.log(response.data.mohon)
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
         

            <Row>

                <Row className="mb-3 mt-3 border p-3" style={{backgroundColor:""}}>
                    <h2>MAKLUMAT PEMOHON</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>KAD PENGENALAN</th>
                                {/* <th>EMAIL</th> */}
                                <th>TELEFON</th>
                                <th>JABATAN</th>
                                <th className='text-center'>JUMLAH PERALATAN</th>
                                <th>TARIKH</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{response.user?.nric}</td>
                                {/* <td>{response.user?.email}</td> */}
                                <td>{response.user?.user_profile?.phone}</td>
                                <td>{response.user?.user_profile?.user_department?.name}</td>
                                <td className='text-center'>{response.mohon_items_count} unit</td>
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
                                <th>Pengguna</th>
                                <th>Jawatan</th>
                                <th>Telefon</th>
                            
                                <th>Nama Bangunan</th>
                                <th>Tingkat</th>
                                <th>Lokasi</th>
                                <th className='text-center'>Agihan</th>
                        
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
                                    <td>
                                    {item.mohon_distribution_item?.mohon_distribution_item_delivery  ?

                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Tarikh Mula</th>
                                                    <th>Tarikh Tamat</th>
                                                    <th>Tarikh Terima</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>{item.mohon_distribution_item?.mohon_distribution_item_delivery?.date_start}</td>
                                                    <td>{item.mohon_distribution_item?.mohon_distribution_item_delivery?.date_end}</td>
                                                    <td>{item.mohon_distribution_item?.mohon_distribution_item_acceptance?.created_at}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        :
                                        <Badge>Agihan belum bermula</Badge>
                                         }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                    

                <Row className="mb-3 mt-3 border p-3" style={{backgroundColor:""}}>
                    {/* <Col>
                            <StatusPermohonan />
                            <br />
                            <StatusAgihan />
                    </Col> */}

                    <Col>

                        <Row className='border rounded mb-3'>
                            <h2>MAKLUMAT KELULUSAN PERMOHONAN</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        {/* <th className='col-1'>Peringkat</th> */}
                                        {/* <th className='col-2'>Nama</th> */}
                                        <th className='col-1'>Status</th>
                                       
                                        <th className='col-10'>Justifikasi</th>
                                        <th className='text-center'>Tarikh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response?.mohon_approvals?.map((item,index) => (
                                        <tr key={index}>
                                        
                                            {/* <td className='text-center'>{item.step}</td> */}
                                            {/* <td>{item?.user.name}</td> */}
                                            <td>{item.status}</td>
                                           
                                            <td>{item?.message}</td>
                                            <td className='text-center'>{item.created_at}</td>
                                
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                        

                        <Row className='border rounded'>

                            {/* <h2>MAKLUMAT KELULUSAN AGIHAN</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className='col-1'>Peringkat</th>
                                        <th className='col-1'>Status</th>
                                        <th className='col-2'>Nama</th>
                                        <th className='col-6'>Justifikasi</th>
                                        <th className='text-center'>Tarikh</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    {response?.mohon_distribution_requests?.map((request) => 
                                        request.mohon_distribution_approvals?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='text-center'>{item.step}</td>
                                                <td>{item.status}</td>
                                                <td>{item?.user?.name ?? 'N/A'}</td>
                                                <td>{item?.message}</td>
                                                <td className='text-center'>{item.created_at}</td>
                                            </tr>
                                        ))
                                    )}

                                </tbody>
                            </Table> */}

                            <h2>MAKLUMAT KELULUSAN AGIHAN</h2>
                            {response?.mohon_distribution_requests?.map((agihan) => 
                            <>
                            
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID Agihan</th>
                                        <th>Tarikh</th>
                                        <th>Kelulusan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Badge>{agihan.id}</Badge></td>
                                        <td>{agihan.created_at}</td>
                                        <td>

                                        <Table className="rounded" style={{backgroundColor:"#f0f0f0"}}>
                                            <thead>
                                                <tr>
                                                    {/* <th className='col-1'>Peringkat</th> */}
                                                    <th className='col-1'>Status</th>
                                                    {/* <th className='col-2'>Nama</th> */}
                                                    <th className='col-9'>Justifikasi</th>
                                                    <th className='text-center'>Tarikh</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                            
                                                
                                                    {agihan.mohon_distribution_approvals?.map((item, index) => (
                                                        <tr key={index}>
                                                            {/* <td className='text-center'>{item.step}</td> */}
                                                            <td>{item.status}</td>
                                                            {/* <td>{item?.user?.name ?? 'N/A'}</td> */}
                                                            <td>{item?.message}</td>
                                                            <td className='text-center'>{item.created_at}</td>
                                                        </tr>
                                                    ))}
                                            

                                            </tbody>
                                        </Table>

                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            </>
                            )}


                        </Row>
                        

                    </Col>
                  
                </Row>
                


            </Row>

            
        </div>
    );
};

export default MohonShow;
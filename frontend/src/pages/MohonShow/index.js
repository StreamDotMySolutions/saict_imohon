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
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item"><Badge>{response?.id}</Badge>{' '}{response?.title}</li>
                </ol>
            </nav>
            <div>
            <Row>
                <Col>
                    <div className='p-3 border border-1 rounded'>
                        <div className="d-flex bd-highlight mb-3">
                            <h5 className="me-auto p-2 bd-highlight">MOHON : Maklumat</h5>
                            <div className="ms-auto p-2 bd-highlight">
                               <EditModal id={response.id}  step={response.mohon_approval?.step} />
                               {' '}
                               <DeleteModal id={response.id}  step={response.mohon_approval?.step} />
                            </div>
                        </div>
           
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
                        <h5>MOHON : Butiran</h5>
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
                            <Link to={`/agihan/${response.id}`}>
                                <Button size="sm">Agihan</Button>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    {response?.mohon_approvals?.map((approval,index) => (
                        <div key={index} className='p-2 border border-1 rounded-1 mt-2'>
                    
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
                    ))}
                </div>
                </Col>
            </Row>
     

  

            <Row>
                <Col>
                
                </Col>

                <Col>
                
                </Col>
            </Row>

        </div>
        </div>
    );
};

export default MohonShow;
import { Link, useParams, useNavigate} from 'react-router-dom'
import useStore from './store'
import { useEffect, useState } from 'react'
import axios from '../../../libs/axios'
import { Button, Container, Pagination, Row, Table } from 'react-bootstrap';
import ReportingModal from '../../MohonApproval/Admin/modals/ReportingModal'
import DeleteModal from './modals/DeleteModal';


const ManageDistributionRequest = () => {

    const store = useStore()
    const [items, setItems] = useState([])
    const [links, setLinks] = useState([])
    const [paginate, setPaginate] = useState()
    let apiUrl = paginate ? paginate : `${store.url}`;

    useEffect( () => {
        axios(apiUrl)
        .then( response => {
            console.log(response)
            let distributions = response.data.items
            setItems(distributions.data)
            setLinks(distributions.links)
        })
        .catch ( error => {
            console.warn(error)
        })
        .finally()
    },[])

    const TableHead = () => {
        return (
            <thead>
                <tr>
                    <th>ID</th>
                    <th className="text-center">PEMOHON</th>
                    <th className="text-center">TARIKH</th>
                    <th className="text-center">TINDAKAN</th>
                </tr>
            </thead>
        )
    }
    
    const TableData = () => {
        if(items.length > 0 ){
            return items.map( (item,index) => (
                <tr>
                    <td>{item.id}</td>
                    <td className='text-center'>{item.user.name}</td>
                    <td className='text-center'>{item.created_at}</td>
             
                    <td className='text-center'>
                        <ReportingModal id={item.mohon_request_id} />
                        {' '}
                        <DeleteModal id={item.id} />
                    </td>
                </tr>
            )
              
            )
        }

        return null;
          
    };

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

    return (
     
        <Container>
            <h2>AGIHAN</h2>

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

export default ManageDistributionRequest;
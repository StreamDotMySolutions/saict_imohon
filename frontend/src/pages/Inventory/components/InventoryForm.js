import { Row,Col } from 'react-bootstrap'
import { Vendor,Email,Phone, Item,Model, Total, DateStart,DateEnd,ReceivedOn} from './Input'
import axios from '../../../libs/axios'
import { useEffect,useState } from 'react'

const InventoryForm = () => {

    const url = process.env.REACT_APP_BACKEND_URL
    const [categories, setCategories] = useState([])

    // get items
    useEffect( () => {

        console.log(url)
        axios({
            'method' : 'get',
            'url' : `${url}/mohon-items/categories`
            })
            .then( response => {
            //console.log(response.data.categories)
            setCategories(response.data.categories)
            })

    } )
    
        //console.log(categories)


    return (<>
        <h3>Peralatan</h3>
        <hr />
        <Row className='p-2'>        
            <Vendor />
        </Row>
        <Row  className='p-2 mb-3'>
            <Col><Email /></Col>
            <Col><Phone /></Col>
        </Row>

        <Row  className='p-2 mb-3'>
            <Col>
                <Item options={categories} />    
            </Col>
            <Col><Model /></Col>
            <Col><Total /></Col>
        </Row>

        <h3>Tarikh</h3>
        <hr />
        <Row  className='p-2'>
            <Col>
                <DateStart />
            </Col>
            
            <Col>
                <DateEnd />
            </Col>
        </Row>

        <Row className='p-2'>
            <Col className='col-6'>
                <ReceivedOn />
            </Col>
        </Row>

    </>);
};

export default InventoryForm;


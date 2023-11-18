import { Row,Col } from 'react-bootstrap'
import { Vendor,Email,Phone, Item,Model, Total, DateStart,DateEnd,ReceivedOn} from './Input';

const InventoryForm = () => {

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
            <Col><Item /></Col>
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


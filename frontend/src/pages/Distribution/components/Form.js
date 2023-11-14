import { Row,Col } from 'react-bootstrap'
import { Vendor,Item, Total, DateStart,DateEnd,ReceivedOn} from './Input';

const DistributionForm = () => {

    return (<>
        <h3>Peralatan</h3>
        <hr />
        <Row  className='p-2 mb-3'>
            <Col><Item /></Col>
            <Col><Total /></Col>
        </Row>

    </>);
};

export default DistributionForm;


import { Row,Col } from 'react-bootstrap'
import { ApplicationId, Item, Total, Description, Department } from './Input';

const DistributionForm = () => {

    return (<>

        <h3>Permohonan</h3>
        <Row  className='p-2 mb-3'>
            <Col><ApplicationId/></Col>
        </Row>
        <Row  className='p-2 mb-3'>
            <Col><Department/></Col>
        </Row>

        <h3>Peralatan</h3>
        <hr />
        <Row  className='p-2 mb-3'>
            <Col><Item /></Col>
            <Col><Total /></Col>
        </Row>
        <Row  className='p-2 mb-3'>
            <Col><Description/></Col>
        </Row>

    </>);
};

export default DistributionForm;


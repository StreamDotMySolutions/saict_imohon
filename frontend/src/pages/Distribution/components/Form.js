import { Row,Col } from 'react-bootstrap'
import { ApplicationId, Item, Total, Description, Department } from './Input';
import useStore from '../store';
import ApplicationInfo from './ApplicationInfo';

const DistributionForm = () => {

    const store = useStore()
    const errors = store.errors    

    return (<>

        <h3>Permohonan</h3>
        <Row  className='p-2 mb-3'>
            <Col xs={3}><ApplicationId/></Col>
        </Row>

        <Row  className='p-2 mb-3'>
            <Col>
                <ApplicationInfo />
            </Col>
        </Row>

        <Row  className='p-2 mb-3'>
            <Col>
                <Department/>
            </Col>
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


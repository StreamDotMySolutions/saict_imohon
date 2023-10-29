import { Row,Col } from 'react-bootstrap'
import { Item,Description ,Type} from './components/Input'

const ItemPCTab = ({fieldName}) => {
    return (
        <div>

            <Row className='mt-4 mb-3'>
               
                <Col>
                    <Item item={fieldName} />
                </Col>

                <Col>
                    <Type item={fieldName} />
                </Col>
            </Row>

            <Row className='mt-4 mb-3'>
                <Description item={fieldName} />
            </Row>

        </div>
    );
};

export default ItemPCTab;
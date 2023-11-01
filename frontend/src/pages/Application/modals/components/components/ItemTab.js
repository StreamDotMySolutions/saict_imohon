import { Badge,Button,Row,Col } from 'react-bootstrap'
import { Item,Description ,Type} from './components/Input'
import { useState } from 'react';

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
            <hr />
            <h2>Maklumat lanjut</h2>
            <ItemDetail />
        </div>
    );
};

export default ItemPCTab;


const ItemDetail = () => {


  return (
    <>
    item detailS
    </>
  );
};

// export default ItemPCTab;

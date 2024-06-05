import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table, Button } from 'react-bootstrap';
import useMohonItemStore from '../store';
import axios from '../../../libs/axios';

const MohonDistributionItemIndex = ({ agihanRequestId }) => {
  const store = useMohonItemStore();
  const [mohonItems, setMohonItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [vendorSelections, setVendorSelections] = useState({});
  const [typeSelections, setTypeSelections] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    axios(`${store.mohonDistributionUrl}/${agihanRequestId}`)
      .then((response) => {
        console.log(response);
        setMohonItems(response.data.mohon.mohon_request.mohon_items);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [agihanRequestId]);

  const handleItemChange = (e, itemId) => {
    const isChecked = e.target.checked;
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
    setSelectedItems((prevState) =>
      isChecked ? [...prevState, itemId] : prevState.filter((id) => id !== itemId)
    );
  };

  const handleVendorChange = (e, itemId) => {
    const vendor = e.target.value;
    setVendorSelections((prevState) => ({
      ...prevState,
      [itemId]: vendor,
    }));
  };

  const handleTypeChange = (e, itemId) => {
    const type = e.target.value;
    setTypeSelections((prevState) => ({
      ...prevState,
      [itemId]: type,
    }));
  };

  const handleSubmit = () => {
    setFormSubmitted(true);

    const invalidItems = selectedItems.filter(
      (itemId) => !vendorSelections[itemId] || !typeSelections[itemId]
    );

    if (invalidItems.length > 0) {
      console.log('Form is invalid: Some items have no vendor or type selected');
      return;
    }

    const payload = {
      selectedItems,
      vendorSelections,
      typeSelections,
    };
    console.log('Submitting payload:', payload);

    // Here you would make your POST request with the payload
    // axios.post('YOUR_ENDPOINT_HERE', payload)
    //     .then(response => {
    //         console.log('Submission successful:', response);
    //     })
    //     .catch(error => {
    //         console.error('Submission error:', error);
    //     });
  };

  return (
    <Row className='mt-5 mb-3'>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col className="text-start"><h2>PERMOHONAN</h2></Col>
          <Col className="text-end">
            <Button onClick={handleSubmit}>Mohon</Button>
          </Col>
        </Row>
      </Container>

      <Table className='mt-3'>
        <thead>
          <tr>
            <th style={{ width: '20px' }}>ID</th>
            <th style={{ width: '200px' }}>NAMA</th>
            <th>PERALATAN</th>
            <th className='text-center'>AGIHAN</th>
            <th className='text-center'>VENDOR</th>
            <th className='text-center'>JENIS</th>
          </tr>
        </thead>
        <tbody>
          {mohonItems?.map((item, index) => (
            <tr key={index}>
              <td><span className="badge bg-primary">{item.id}</span></td>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td className='text-center'>
                <Form.Check
                  name='mohon_item_id'
                  value={item.id}
                  onChange={(e) => handleItemChange(e, item.id)}
                />
              </td>
              <td className='text-center'>
                <FloatingLabel controlId="floatingSelectVendor" label="Sila pilih vendor">
                  <Form.Select
                    name='vendor'
                    onChange={(e) => handleVendorChange(e, item.id)}
                    disabled={!checkedItems[item.id]}
                    isInvalid={formSubmitted && checkedItems[item.id] && !vendorSelections[item.id]}
                  >
                    <option value="">Pilih Vendor</option>
                    <option value="Bessar">Bessar</option>
                    <option value="Berjaya">Berjaya</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Sila pilih vendor.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </td>
              <td className='text-center'>
                <FloatingLabel controlId="floatingSelectType" label="Sila pilih type">
                  <Form.Select
                    name='type'
                    onChange={(e) => handleTypeChange(e, item.id)}
                    disabled={!checkedItems[item.id]}
                    isInvalid={formSubmitted && checkedItems[item.id] && !typeSelections[item.id]}
                  >
                    <option value="">Pilih Jenis</option>
                    <option value="new">Baharu</option>
                    <option value="replacement">Ganti</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Sila pilih jenis.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
};

export default MohonDistributionItemIndex;

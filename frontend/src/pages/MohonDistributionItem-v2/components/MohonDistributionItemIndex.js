import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import useMohonItemStore from '../store';
import axios from '../../../libs/axios';

const MohonDistributionItemIndex = ({ agihanRequestId }) => {
  const store = useMohonItemStore();
  const [mohon, setMohon] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [vendorSelections, setVendorSelections] = useState({});
  const [typeSelections, setTypeSelections] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    axios(`${store.mohonDistributionUrl}/${agihanRequestId}`)
      .then((response) => {
        //console.log(response);
        setMohon(response.data.mohon);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [agihanRequestId, checkedItems, vendorSelections,typeSelections]);

  if (!mohon) {
    return <div>Loading...</div>;
  }

  
  const mohonItems = mohon.mohon_request.mohon_items;
  const mohonDistributionItems = mohon.mohon_distribution_items;

  const handleItemChange = (e, itemId) => {
    const isChecked = e.target.checked;
    setCheckedItems(prevState => ({ ...prevState, [itemId]: isChecked }));

    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';
    const mohon_distribution_id = mohonDistributionItems.find(
      (distributionItem) => distributionItem.mohon_item_id === itemId
    )?.id;

    if (isChecked) {
      const payload = {
        itemId,
        mohon_item_id: itemId,
        category_name,
        category_id,
        vendor: vendorSelections[itemId] || '',
        type: typeSelections[itemId] || '',
      };

      axios.post(`${store.submitUrl}/${agihanRequestId}/create`, payload)
        .then(response => {
          //console.log('Save successful:', response);
        })
        .catch(error => {
          console.error('Save error:', error);
        });
    } else {
      const payload = { itemId, mohon_item_id: itemId, mohon_distribution_id };
      axios.post(`${store.submitUrl}/${agihanRequestId}/remove`, payload)
        .then(response => {
          //console.log('Delete successful:', response);

          // Reset vendor and type selections
          setVendorSelections((prevState) => ({ ...prevState, [itemId]: '' }));
          setTypeSelections((prevState) => ({ ...prevState, [itemId]: '' }));
        })
        .catch(error => {
          console.error('Delete error:', error);
        });
    }
  };

  const handleVendorChange = (e, itemId) => {
    const vendor = e.target.value;
    setVendorSelections((prevState) => ({ ...prevState, [itemId]: vendor }));
    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';
    const mohon_distribution_item_id = mohonDistributionItems.find(
      (distributionItem) => distributionItem.mohon_item_id === itemId
    )?.id;

    const payload = {
      itemId,
      mohon_item_id: itemId,
      category_name,
      category_id,
      mohon_distribution_item_id,
      vendor,
    };

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        //console.log('Vendor update successful:', response);
      })
      .catch(error => {
        //console.error('Vendor update error:', error);
      });
  };

  const handleTypeChange = (e, itemId) => {
    const type = e.target.value;
    setTypeSelections((prevState) => ({ ...prevState, [itemId]: type }));
    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';
    const mohon_distribution_item_id = mohonDistributionItems.find(
      (distributionItem) => distributionItem.mohon_item_id === itemId
    )?.id;

    const payload = {
      itemId,
      mohon_item_id: itemId,
      category_name,
      category_id,
      mohon_distribution_item_id,
      type,
    };

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        //console.log('Type update successful:', response);
      })
      .catch(error => {
        console.error('Type update error:', error);
      });
  };

  return (
    <Row className='mt-5 mb-3'>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col className="text-start"><h2>PERMOHONAN</h2></Col>
        </Row>
      </Container>

      <Table className='mt-3'>
        <thead>
          <tr>
            <th style={{ width: '20px' }}>MOHON ID</th>
            <th style={{ width: '200px' }}>NAMA</th>
            <th>PERALATAN</th>
            <th style={{ width: '20px' }}>MOHON DISTRIBUTION ID</th>
            <th className='text-center'>AGIHAN</th>
            <th className='text-center'>VENDOR</th>
            <th className='text-center'>TYPE</th>
          </tr>
        </thead>
        <tbody>
          {mohonItems?.map((item, index) => (
            <tr key={index}>
              <td>
                <span className="badge bg-primary">{item.id}</span>
              </td>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td>
                {mohonDistributionItems.find(
                  (distributionItem) => distributionItem.mohon_item_id === item.id
                )?.id}
              </td>
              <td className='text-center'>
                <Form.Check
                  name='mohon_item_id'
                  value={item.id}
                  onChange={(e) => handleItemChange(e, item.id)}
                  checked={
                    mohonDistributionItems.some(
                      (distributionItem) => distributionItem.mohon_item_id === item.id
                    )
                  }
                />
              </td>
              <td className='text-center'>
                {mohonDistributionItems.find(
                  (distributionItem) => distributionItem.mohon_item_id === item.id
                )?.vendor_name}
                <FloatingLabel controlId={`floatingSelectVendor${index}`} label="Sila pilih vendor">
                  <Form.Select
                    onChange={(e) => handleVendorChange(e, item.id)}
                    disabled={
                      !mohonDistributionItems.some(
                        (distributionItem) => distributionItem.mohon_item_id === item.id
                      )
                    }
                    value={vendorSelections[item.id] || mohonDistributionItems.find(
                      (distributionItem) => distributionItem.mohon_item_id === item.id
                    )?.vendor_name || ''}
                  >
                    <option value="">Pilih Vendor</option>
                    <option value="Bessar">Bessar</option>
                    <option value="Berjaya">Berjaya</option>
                  </Form.Select>
                </FloatingLabel>
              </td>
              <td className='text-center'>
                {mohonDistributionItems.find(
                  (distributionItem) => distributionItem.mohon_item_id === item.id
                )?.type}

                <FloatingLabel controlId={`floatingSelectType${index}`} label="Sila pilih type">
                  <Form.Select
                    onChange={(e) => handleTypeChange(e, item.id)}
                    disabled={
                      !mohonDistributionItems.some(
                        (distributionItem) => distributionItem.mohon_item_id === item.id
                      )
                    }
                   
                    value={typeSelections[item.id] || mohonDistributionItems.find(
                      (distributionItem) => distributionItem.mohon_item_id === item.id
                    )?.type || ''}
                  >
                    <option value="">Pilih Type</option>
                    <option value="new">New</option>
                    <option value="replacement">Replacement</option>
                  </Form.Select>
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

import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
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
        const items = response.data.mohon.mohon_request.mohon_items;
        setMohonItems(items);

        // Prepopulate form data
        const initialCheckedItems = {};
        const initialVendorSelections = {};
        const initialTypeSelections = {};

        items.forEach(item => {
          if (item.selected) {
            initialCheckedItems[item.id] = true;
            initialVendorSelections[item.id] = item.vendor || '';
            initialTypeSelections[item.id] = item.type || '';
          }
        });

        setCheckedItems(initialCheckedItems);
        setVendorSelections(initialVendorSelections);
        setTypeSelections(initialTypeSelections);
        setSelectedItems(Object.keys(initialCheckedItems).filter(id => initialCheckedItems[id]));
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

    if (isChecked) {
      // Add item to selected items
      setSelectedItems((prevState) => [...prevState, itemId]);

      // Initialize vendor and type selection for the new item if not already set
      setVendorSelections((prevState) => ({
        ...prevState,
        [itemId]: prevState[itemId] || '',
      }));
      setTypeSelections((prevState) => ({
        ...prevState,
        [itemId]: prevState[itemId] || '',
      }));

      // Make API call to add the item
      const payload = {
        itemId,
        vendor: vendorSelections[itemId] || '',
        type: typeSelections[itemId] || '',
      };
      console.log('Adding item:', payload);

      axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
        .then(response => {
          console.log('Add successful:', response);
        })
        .catch(error => {
          console.error('Add error:', error);
        });
    } else {
      // Remove item from selected items
      setSelectedItems((prevState) => prevState.filter((id) => id !== itemId));

      // Reset vendor and type selections
      setVendorSelections((prevState) => {
        const { [itemId]: _, ...rest } = prevState;
        return rest;
      });
      setTypeSelections((prevState) => {
        const { [itemId]: _, ...rest } = prevState;
        return rest;
      });

      // Make API call to delete the item
      const payload = { itemId };
      console.log('Deleting item:', payload);

      axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
        .then(response => {
          console.log('Delete successful:', response);
        })
        .catch(error => {
          console.error('Delete error:', error);
        });
    }
  };

  const handleVendorChange = (e, itemId) => {
    const vendor = e.target.value;
    setVendorSelections((prevState) => ({
      ...prevState,
      [itemId]: vendor,
    }));

    // Make API call to update vendor
    const payload = {
      itemId,
      vendor
    };
    console.log('Updating vendor:', payload);

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        console.log('Vendor update successful:', response);
      })
      .catch(error => {
        console.error('Vendor update error:', error);
      });
  };

  const handleTypeChange = (e, itemId) => {
    const type = e.target.value;
    setTypeSelections((prevState) => ({
      ...prevState,
      [itemId]: type,
    }));

    // Make API call to update type
    const payload = {
      itemId,
      type
    };
    console.log('Updating type:', payload);

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        console.log('Type update successful:', response);
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
            <th style={{ width: '20px' }}>ID</th>
            <th style={{ width: '200px' }}>NAMA</th>
            <th>PERALATAN</th>
            <th className='text-center'>AGIHAN</th>
            <th className='text-center'>VENDOR</th>
            <th className='text-center'>TYPE</th>
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
                  checked={checkedItems[item.id] || false}
                />
              </td>
              <td className='text-center'>
                <FloatingLabel controlId="floatingSelectVendor" label="Sila pilih vendor">
                  <Form.Select
                    name='vendor'
                    onChange={(e) => handleVendorChange(e, item.id)}
                    disabled={!checkedItems[item.id]}
                    isInvalid={formSubmitted && checkedItems[item.id] && !vendorSelections[item.id]}
                    value={vendorSelections[item.id] || ''}
                  >
                    <option value="">Pilih Vendor</option>
                    <option value="Bessar">Bessar</option>
                    <option value="Berjaya">Berjaya</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a vendor.
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
                    value={typeSelections[item.id] || ''}
                  >
                    <option value="">Pilih Type</option>
                    <option value="new">New</option>
                    <option value="replacement">Replacement</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a type.
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

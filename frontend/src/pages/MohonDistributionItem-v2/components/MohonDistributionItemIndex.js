import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import useMohonItemStore from '../store';
import axios from '../../../libs/axios';

const MohonDistributionItemIndex = ({ agihanRequestId }) => {
  const store = useMohonItemStore();
  const [mohons, setMohons] = useState([]);
  const [mohonItems, setMohonItems] = useState([]);
  const [mohonDistributionItems, setMohonDistributionItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [vendorSelections, setVendorSelections] = useState({});
  const [typeSelections, setTypeSelections] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchMohonData = () => {
    axios(`${store.mohonDistributionUrl}/${agihanRequestId}`)
      .then((response) => {
        console.log(response);
        setMohons(response.data.mohon);
        setMohonItems(response.data.mohon.mohon_request.mohon_items);
        setMohonDistributionItems(response.data.mohon.mohon_distribution_items);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    fetchMohonData();
  }, [agihanRequestId]);

  const handleItemChange = (e, itemId) => {
    const isChecked = e.target.checked;
    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';

    setCheckedItems((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));

    const newSelectedItems = isChecked
      ? [...selectedItems, itemId]
      : selectedItems.filter((id) => id !== itemId);
    setSelectedItems(newSelectedItems);

    if (isChecked) {
      // Initialize vendor and type selection for the new item
      setVendorSelections((prevState) => ({
        ...prevState,
        [itemId]: vendorSelections[itemId] || '',
      }));
      setTypeSelections((prevState) => ({
        ...prevState,
        [itemId]: typeSelections[itemId] || '',
      }));

      // Make API call to add the item
      const payload = {
        selectedItems: newSelectedItems.map(id => ({
          itemId: id,
          mohon_item_id: id,  // Append mohon_item_id here
          category_name: mohonItems.find(item => item.id === id)?.category?.name || '',
          category_id: mohonItems.find(item => item.id === id)?.category?.id || '',
        })),
        vendorSelections,
        typeSelections,
      };
      console.log('Saving payload:', payload);

      axios.post(`${store.submitUrl}/${agihanRequestId}/create`, payload)
        .then(response => {
          console.log('Save successful:', response);
          fetchMohonData(); // Update the data after save
        })
        .catch(error => {
          console.error('Save error:', error);
        });
    } else {
      // Remove vendor and type selection for the unchecked item
      setVendorSelections((prevState) => {
        const newState = { ...prevState };
        delete newState[itemId];
        return newState;
      });
      setTypeSelections((prevState) => {
        const newState = { ...prevState };
        delete newState[itemId];
        return newState;
      });

      // Make API call to delete the item
      const payload = { itemId, mohon_item_id: itemId, category_name, category_id };  // Append mohon_item_id here
      console.log('Deleting item:', payload);

      axios.post(`${store.submitUrl}/${agihanRequestId}/remove`, payload)
        .then(response => {
          console.log('Delete successful:', response);
          fetchMohonData(); // Update the data after delete
        })
        .catch(error => {
          console.error('Delete error:', error);
        });
    }
  };

  const handleVendorChange = (e, itemId) => {
    const vendor = e.target.value;
    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';

    setVendorSelections((prevState) => ({
      ...prevState,
      [itemId]: vendor,
    }));

    // Make API call to update vendor
    const payload = {
      itemId,
      mohon_item_id: itemId,  // Append mohon_item_id here
      vendor,
      category_name,
      category_id,
    };
    console.log('Updating vendor:', payload);

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        console.log('Vendor update successful:', response);
        fetchMohonData(); // Update the data after vendor change
      })
      .catch(error => {
        console.error('Vendor update error:', error);
      });
  };

  const handleTypeChange = (e, itemId) => {
    const type = e.target.value;
    const item = mohonItems.find((item) => item.id === itemId);
    const category_name = item?.category?.name || '';
    const category_id = item?.category?.id || '';

    setTypeSelections((prevState) => ({
      ...prevState,
      [itemId]: type,
    }));

    // Make API call to update type
    const payload = {
      itemId,
      mohon_item_id: itemId,  // Append mohon_item_id here
      type,
      category_name,
      category_id,
    };
    console.log('Updating type:', payload);

    axios.post(`${store.submitUrl}/${agihanRequestId}/sync`, payload)
      .then(response => {
        console.log('Type update successful:', response);
        fetchMohonData(); // Update the data after type change
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
                <input type="hidden" name="mohon_item_id" value={item.id} />
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

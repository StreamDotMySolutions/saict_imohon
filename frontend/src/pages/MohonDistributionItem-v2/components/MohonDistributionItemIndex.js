import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table, Badge } from 'react-bootstrap';
import useMohonItemStore from '../store';
import axios from '../../../libs/axios';
import ApprovalModal from '../../MohonDistributionRequest/modals/ApprovalModal';
import RequestApprovalModal from '../../MohonDistributionRequest/modals/RequestApprovalModal';

const MohonDistributionItemIndex = ({ agihanRequestId }) => {
  const store = useMohonItemStore();
  const [mohon, setMohon] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [vendorSelections, setVendorSelections] = useState({});
  const [typeSelections, setTypeSelections] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [vendors, setVendors ] = useState([])
  const [items, setItems ] = useState([])
  const [assignedItems, setAssignedItems ] = useState([])


  // list mohonDistributionRequest under $agihanRequestId
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

  
    // to check mohonDistributionItem being assigned to other MohonDistributionRequest
  // check using mohon_item_id
  useEffect(() => {
    if (mohon) {
      //console.log('check');
      axios(`${store.submitUrl}/${mohon.mohon_request_id}/${agihanRequestId}/check`)
        .then((response) => {
          //console.log(response);
          setAssignedItems(response.data.items)
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [mohon]);
  
  // get vendors
  useEffect(() => {
    axios(`${store.submitUrl}/vendors`)
      .then((response) => {
        //console.log(response);
        setVendors(response.data.items);
      })
      .catch((error) => {
        console.warn(error);
      });
  },[])

  // get agihan
  useEffect( () => {
      //console.log( `${store.submitUrl}/${id}`)
      axios({
        'method' : 'get',
        'url' : `${store.mohonDistributionUrl}/${agihanRequestId}`
    })
    .then( response => {
      let data = response.data.mohon
      setItems(data.mohon_distribution_items) // set formValue
    })
    .catch ( error => {
      console.warn(error)
    })
  },[agihanRequestId, checkedItems, vendorSelections,typeSelections])

  //console.log(`${store.submitUrl}/vendors`)

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
          <Col className="text-end">
          </Col>
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
            {/* <th className='text-center'>TYPE</th> */}
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

                {assignedItems.find(
                  (assignedItem) => assignedItem.mohon_item_id === item.id
                )?.id ? (
                  <p>Item is assigned: {assignedItems.find(
                    (assignedItem) => assignedItem.mohon_item_id === item.id
                  )?.id}</p>
                ) : (
                  <p>Item is not assigned</p>
                )}

              </td>
              <td className='text-center'>
                <Form.Check
                  name='mohon_item_id'
                  value={item.id}
                  disabled={ mohon.mohon_distribution_approval.step != 0 
                            ||
                            assignedItems.some(
                              (assignedItem) => assignedItem.mohon_item_id === item.id
                            )
                          }
                  onChange={(e) => handleItemChange(e, item.id)}
                  checked={
                    mohonDistributionItems.some(
                      (distributionItem) => distributionItem.mohon_item_id === item.id
                    ) ||

                    assignedItems.some(
                      (assignedItem) => assignedItem.mohon_item_id === item.id
                    )
                  
                  }
                />
              </td>
              <td className='text-center'>
                {/* {mohonDistributionItems.find(
                  (distributionItem) => distributionItem.mohon_item_id === item.id
                )?.vendor_name} */}
                <FloatingLabel controlId={`floatingSelectVendor${index}`} label="Sila pilih vendor">
                  <Form.Select
                    onChange={(e) => handleVendorChange(e, item.id)}
                    disabled={
                      !mohonDistributionItems.some(
                        (distributionItem) => distributionItem.mohon_item_id === item.id
                      ) || mohon.mohon_distribution_approval.step != 0
                    }
                    value={vendorSelections[item.id] || mohonDistributionItems.find(
                      (distributionItem) => distributionItem.mohon_item_id === item.id
                    )?.inventory_id  
                    ||
                    assignedItems[item.id] || assignedItems.find(
                      (assignedItem) => assignedItem.mohon_item_id === item.id
                    )?.inventory_id  
                    ||
                    ''}
                  >
                    <option value="">Pilih Vendor</option>
                    {vendors.map((item) => (
                      <option key={item.id} value={item.id}>{item.vendor}</option>
                    ))}

                  </Form.Select>
                </FloatingLabel>
              </td>
              {/* <td className='text-center'>
               

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
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

     <Container className='mt-5 border border-1 p-3 rounded' style={{ backgroundColor:"#fafafa"}}>
      
      <div>
        <Row className="d-flex justify-content-between">
          <Col className="text-start"><h2>AGIHAN</h2></Col>
          <Col className="text-end">
              { mohon.mohon_distribution_approval.step === 0 ?
                <RequestApprovalModal agihanRequestId={agihanRequestId} />
                :
                <>
                <Badge>
                  Sudah dimohon pada { mohon.mohon_distribution_approval.created_at }
                </Badge>
   
                {' '}
                <Badge className='bg-dark'>
                STATUS : { mohon.mohon_distribution_approval.status.toUpperCase() }
                </Badge>
                </>
              }
          </Col>
        </Row>
      </div>

      <Table>
          <thead>
              <tr>
                  <th className='col-3'>NAMA</th>
                  <th className='col-3'>PERALATAN</th>
                  <th className='col-3'>VENDOR</th>
              </tr>
          </thead>
          <tbody>
            {items.length > 0 && items?.map( (item,index) => (
              <tr key={index}>
                  <td>{item.mohon_item.name}</td>
                  <td>{item.category.name}</td>
            
                  <td>{item.inventory?.vendor}</td>
              </tr>
            ))}

          </tbody>
        </Table>
     </Container>
    </Row>
  );
};

export default MohonDistributionItemIndex;

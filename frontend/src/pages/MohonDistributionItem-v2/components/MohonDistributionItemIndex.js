import React, { useState, useEffect } from 'react';
import { Container, Col, FloatingLabel, Form, Row, Table, Badge, Button, Alert } from 'react-bootstrap';
import useMohonItemStore from '../store';
import axios from '../../../libs/axios';
import ApprovalModal from '../../MohonDistributionRequest/modals/ApprovalModal';
import RequestApprovalModal from '../modals/RequestApprovalModal';
import UpdateDistributionItemModal from '../modals/UpdateDistributionItemModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
      })
      .finally(
        store.setValue('refresh', false)
      )
  }, [agihanRequestId, checkedItems, vendorSelections,typeSelections,store.getValue('refresh')]);

  
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
      })
  },[])

  // get agihan
  useEffect( () => {
      //console.log( `${store.submitUrl}/${id}`)
      axios({
        'method' : 'get',
        'url' : `${store.mohonDistributionUrl}/${agihanRequestId}`
    })
    .then( response => {
      //console.log(response)
      let data = response.data.mohon
      setItems(data.mohon_distribution_items) // set formValue
    })
    .catch ( error => {
      console.warn(error)
    })
    .finally(
      store.setValue('refresh', false)
    )
  },[agihanRequestId, checkedItems, vendorSelections,typeSelections, store.getValue('refresh') ])

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

  const pending = "Sedang menunggu kelulusan";
  const approved = "Telah diluluskan";
  const rejected = "Permohonan gagal";

  const approvalStatusMessage = (status) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return pending;
      case "APPROVED":
        return approved;
      case "REJECTED":
        return rejected;
      default:
        return "Status tidak diketahui";
    }
  };

  return (
    <Row>
      <Alert variant='warning'>
        <FontAwesomeIcon icon={'fas fa-info'} style={{fontSize: '1.5rem'}} /> Maklumat <br />
        <hr />
        {' '}
        <ol>
            <li>
                Terdapat 2 senarai :
                    <ol type="i">
                      <li>PERMOHONAN</li>
                      <li>AGIHAN</li>
                    </ol>
            </li>
            <li>
              <strong>PERMOHONAN</strong> mewakili senarai peralatan yang dimohon oleh Permohonan ID <Badge>{mohon.mohon_request_id}</Badge>.
            </li>
            <li>
              Senarai peralatan ini dikumpul dalam Agihan ID <Badge>{mohon.id}</Badge>
            </li>
            <li>
              Untuk menambah peralatan ke dalam Agihan, anda kena pilih <i><strong>Checkbox</strong></i> peralatan di senarai Permohonan
            </li>
            <li>
              Seterusnya pilihan <i><strong>Dropdown</strong></i> untuk nama VENDOR akan tersedia dan anda kena pilih Vendor
            </li>
            <li>
              Untuk membuang peralatan yang telah ditambah, hanya perlu <i><strong>Untick Checkbox</strong></i> di bahagian <strong>Permohonan</strong>.
            </li>
            <li>
              Butang <Button size={'sm'} variant={'info'}>Mohon</Button> hanya boleh ditekan jika Agihan mempunyai peralatan dan telah dipilih Vendor untuk setiap peralatan.
            </li>
            <li className='mt-2'>
            Butang <Button size={'sm'} variant={'primary'}>Kemaskini</Button> hanya boleh ditekan jika Pelulus 2 mengesahkan permohonan Agihan.
            </li>
            
        </ol>
      </Alert>
           
      <Container className='border border-1 p-3 rounded' style={{ backgroundColor:"#fafafa"}}>
     
        <Row className="d-flex justify-content-between">
          <Col className="text-start"><h2>PERMOHONAN</h2></Col>
          <Col className="text-end">
          </Col>
        </Row>
     

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
      </Container>

     <Container className='mt-5 border border-1 p-3 rounded' style={{ backgroundColor:"#fafafa"}}>
      
      <div>
        <Row className="d-flex justify-content-between">
          <Col className="text-start"><h2>AGIHAN</h2></Col>
          <Col className="text-end">
      
              { mohon.mohon_distribution_approval.step === 0 ?
                <>
                  {items && items.length > 0 && items.every(item => item.inventory?.vendor) ? (
                    <RequestApprovalModal agihanRequestId={agihanRequestId} />
                  ) : (
                    <Button variant={'info'} disabled>Mohon</Button>
                  )}
                </>
                
                :
                <>
                <Badge>
                  Sudah dimohon pada { mohon.mohon_distribution_approval.created_at }
                </Badge>
   
                {' '}
                <Badge className='bg-dark'>
                  <FontAwesomeIcon icon={'fas fa-info'} /> : { approvalStatusMessage(mohon.mohon_distribution_approval.status) }
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
                  <th className='col-4'>VENDOR</th>
                  <th>TARIKH MULA</th>
                  <th>TARIKH TAMAT</th>
                  <th className='col-2'>NAMA PIC</th>
                  <th>TELEFON</th>
                  <th className='col-3'><span className='float-end'>TINDAKAN</span></th>
              </tr>
          </thead>
          <tbody>
            {items.length > 0 && items?.map( (item,index) => (
              <tr key={index}>
                  <td>{item.mohon_item?.name}</td>
                  <td>{item?.category.name}</td>
                  <td>{item.inventory?.vendor}</td>
                  <td>{item.mohon_distribution_item_delivery?.date_start}</td>
                  <td>{item.mohon_distribution_item_delivery?.date_end}</td>
                  <td>{item.mohon_distribution_item_delivery?.pic_name}</td>
                  <td>{item.mohon_distribution_item_delivery?.pic_phone}</td>
                  <td>
                    <span  className='float-end'>
                    { mohon.mohon_distribution_approval.status === 'approved'  ?
                      <UpdateDistributionItemModal mohonDistributionItemId={item.id} />
                      :
                      <Button size={'sm'} disabled>Kemaskini</Button>
                    }
                    </span>
                    
                  </td>
              </tr>
            ))}

          </tbody>
        </Table>
     </Container>

  
    </Row>
    
  );
};

export default MohonDistributionItemIndex;

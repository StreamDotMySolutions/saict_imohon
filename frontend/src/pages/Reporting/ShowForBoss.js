import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Pagination, Button, Breadcrumb } from 'react-bootstrap';
import useStore from './store';
import axios from '../../libs/axios';
import { Link, useParams } from 'react-router-dom';

const ShowForBoss = ({ mohonRequestId: propMohonRequestId }) => {

    const { mohonRequestId: paramMohonRequestId } = useParams();
    const mohonRequestId = propMohonRequestId || paramMohonRequestId;
    const store = useStore()
    const [items,setItems] = useState([])
    const [mohonApprovals,setMohonApprovals] = useState([])
    const [distributionRequests,setDistributionRequests] = useState([])
    const [user,setUser] = useState()
    const [mohon,setMohon] = useState()

    // get mohonRequest data from API
    useEffect( () => {
      axios(`${store.url}/mohon/${mohonRequestId}`)
      .then( response => {
          //console.log(response)
          let mohon = response.data.mohon
          setItems(mohon?.mohon_items != null ? mohon?.mohon_items : []);
          setMohonApprovals(mohon?.mohon_approvals != null ? mohon?.mohon_approvals : []);
          setDistributionRequests(mohon?.mohon_distribution_requests != null ? mohon?.mohon_distribution_requests : []);
          setUser(mohon?.user != null ? mohon?.user : null);
          setMohon(mohon);
      })
    },[])


    //console.log(items)

    const BreadcrumbData = () => {
        return (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/agihan-2">Agihan</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Butiran Permohonan</Breadcrumb.Item>
          </Breadcrumb>
        );
      }

    const Department = () => {

      if(user){
        return(
          <Table>
            <thead>
              <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Jabatan</th>
                  <th>Tarikh Permohonan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_profile?.user_department?.name}</td>
                  <td>{mohon.created_at}</td>
                  
              </tr>
            </tbody>
          </Table>
        )
      }
      
    }

    const DistributionRequests = () => {
      return (
        <Table className='mt-3'>
          <thead>
              <tr>
                  <th style={{ 'width': '20px'}}>ID</th>
                  <th>Nama</th>
                  <th className='text-center'>Kelulusan</th>
                  <th className='text-center'>Peralatan</th>
                 
              </tr>
          </thead>

          <tbody>
              {distributionRequests?.map((item,index) => (
                  <tr key={index}>
                      <td> <span className="badge bg-primary">{item.id}</span></td>
                      <td>{item.user.name}</td>
          
                      <td>

                      <Table style={{backgroundColor:"#f0f0f0"}} className='rounded'>
                          <thead>
                            <tr>
                        
                              <th className='text-center'>Peringkat</th>
                              <th className='text-center'>Tarikh</th>
                              <th>Status</th>
                              <th>Mesej</th>
                            </tr>
                          </thead>

                          <tbody>
                            {item.mohon_distribution_approvals.map( (approval, key) => (
                              <tr key={key}>
                                  <td className='text-center'>{approval.step}</td>
                                  <td className='text-center'>{approval.created_at}</td>
                                  <td>{approval.status}</td>
                                  <td>{approval.message}</td>
                              </tr>
                            ))}
                           
                          </tbody>
                        </Table>

                      </td>
               
                      <td>

                        <Table style={{backgroundColor:"#f0f0f0"}} className='rounded'>
                          <thead>
                            <tr>
                        
                              <th>Nama</th>
                              <th>Peralatan</th>
                              <th>Vendor</th>
                            </tr>
                          </thead>

                          <tbody>
                            {item.mohon_distribution_items.map( (distributionItem, key) => (
                              <tr key={key}>
                                  <td>{distributionItem.mohon_item.name}</td>
                                  <td>{distributionItem.category.name}</td>
                                  <td>{distributionItem.inventory.vendor}</td>
                              </tr>
                            ))}
                           
                          </tbody>
                        </Table>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
      )
    }

    const MohonApprovals = () => {
      return (
        <Table className='mt-3'>
          <thead>
              <tr>
                  <th style={{ 'width': '20px'}}>ID</th>
                  <th>Nama</th>
                  <th className='text-center'>Peringkat</th>
                  <th>Status</th>
                  <th>Tarikh</th>
                 
              </tr>
          </thead>

          <tbody>
              {mohonApprovals?.map((item,index) => (
                  <tr key={index}>
                      <td> <span className="badge bg-primary">{item.id}</span></td>
                      <td>{item.user.name}</td>
                      <td className='text-center'>{item.step}</td>
                      <td>{item.status}</td>
                      <td>{item.created_at}</td>
                     
                  </tr>
              ))}
          </tbody>
      </Table>
      )
    }

    const MohonItems = () => {
      return (
        <Table className='mt-3'>
          <thead>
              <tr>
                  <th style={{ 'width': '20px'}}>ID</th>
                  <th>Penerima</th>
                  <th>Jawatan</th>
                  <th>No. Telefon</th>
                  <th>Nama Bangunan</th>
                  <th>Tingkat</th>
                  <th>Lokasi</th>
                  <th>Item</th>
                  <th>Jenis</th>
                  <th>Justifikasi</th>
              </tr>
          </thead>

          <tbody>
              {items?.map((item,index) => (
                  <tr key={index}>
                      <td> <span className="badge bg-primary">{item.id}</span></td>
                      <td>{item.name}</td>
                      <td>{item.occupation}</td>
                      <td>{item.mobile}</td>
                      <td>{item.building_name}</td>
                      <td>{item.building_level}</td>
                      <td>{item.location}</td>
                      <td>{item.category?.name}</td>
                      <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                      <td>{item.description}</td>
                  </tr>
              ))}
          </tbody>
      </Table>
      )
    } 

    const MohonDistributionRequests = () => {
      return (
        <Table className='mt-3'>
          <thead>
              <tr>
                  <th style={{ 'width': '20px'}}>ID</th>
                  <th>Penerima</th>
                  <th>Jawatan</th>
                  <th>No. Telefon</th>
                  <th>Nama Bangunan</th>
                  <th>Tingkat</th>
                  <th>Lokasi</th>
                  <th>Item</th>
                  <th>Jenis</th>
                  <th>Justifikasi</th>
              </tr>
          </thead>

          <tbody>
              {items?.map((item,index) => (
                  <tr key={index}>
                      <td> <span className="badge bg-primary">{item.id}</span></td>
                      <td>{item.name}</td>
                      <td>{item.occupation}</td>
                      <td>{item.mobile}</td>
                      <td>{item.building_name}</td>
                      <td>{item.building_level}</td>
                      <td>{item.location}</td>
                      <td>{item.category?.name}</td>
                      <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                      <td>{item.description}</td>
                  </tr>
              ))}
          </tbody>
      </Table>
      )
    } 
    
    return (
        <div>
            <BreadcrumbData />
            
            <h2>Maklumat Pemohon</h2>
            <Department />

            <h2>Maklumat Peralatan Yang Di Pohon ( { mohon && mohon.mohon_items_count} unit )</h2>
            <MohonItems />
  
            <h2>Maklumat Agihan</h2>
            <DistributionRequests />
        </div>
    );
};

export default ShowForBoss;
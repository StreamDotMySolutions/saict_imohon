import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button, Alert, Badge, Form } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../../libs/axios'
import { Link } from 'react-router-dom'
import ViewModal from '../modals/ViewModal'
import { ApproverStatus } from '../../../../components/global/Approval'
//import ReportingModal from '../modals/ReportingModal'
import ReportingModal from '../../../Reporting/ReportingModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import StatusModal from '../modals/StatusModal'

const MohonIndex = () => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])

    useEffect( () => 
        {
            //console.log(store.url)
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: store.url // eg GET http://localhost:8000/api/mohon/index
                } 
            )
            .then( response => { // response block
                //console.log(store.url)
                //console.log(response.data)   // output to console  
                setMohons(response.data.mohons) // assign data to const = mohons
                store.setValue('refresh', false ) // set MohonIndex listener back to FALSE
            })
            .catch( error => { // error block
                console.warn(error) // output to console
            })
      },
        [
            store.getValue('refresh'), // Form action listener
            store.url // pagination listener
        ] 

    ) // useEffect()

    return (
        <div>
            <Alert variant='warning'>
                <FontAwesomeIcon icon={'fas fa-info'} style={{fontSize: '1.5rem'}} /> Maklumat <br />
                <hr />
                {' '}
                <ol>
                    <li>
                        Senarai permohonan dari User. Setiap Permohonan perlu disahkan dahulu dengan klik butang <Button className={'bg-light'} size={'sm'} variant='info'>Pengesahan Permohonan</Button>
                    </li>
                    <li>
                    Setelah Admin mengesahkan Permohonan, butang <Button className={'bg-light text-dark'} size={'sm'} variant='success'>Pengesahan Permohonan</Button> adalah untuk membuat Agihan Peralatan
                    </li>
                    <li>
                    <Badge>ID</Badge> pula merujuk kepada <i><strong>running number</strong></i> permohonan. Setiap <Badge>ID</Badge> adalah unik.
                    </li>
                    <li>
                    Butang <Button className={'bg-light text-dark'} size={'sm'} variant='primary'>Laporan</Button> merujuk kepada laporan lengkap Permohonan.
                    </li>
                    <li>
                    Butang <Button className={'bg-light text-dark mt-2'} size={'sm'} variant='success'>Agihan</Button> pula hanya aktif selepas kelulusan diluluskan oleh Admin. Setiap Agihan akan mempunyai set peralatan sendiri.
                    </li>
                    <li>
                     Setiap <strong>Permohonan</strong> boleh mempunyai satu atau lebih <strong>Agihan</strong>.  
                    </li>
                </ol>
            </Alert>

            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>No.</th>
                        {/* <th style={{ 'width': '120px'}}>Nama</th> */}
                        <th style={{ 'width': '120px'}}>Kad Pengenalan</th>
                        <th style={{ 'width': '200px'}}>Jabatan</th>
                        {/* <th style={{ 'width': '200px'}}>Kelulusan Mohon</th> */}
                        <th className='text-center' style={{ 'width': '50px'}}>Jumlah Peralatan Dimohon</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Jumlah Peralatan Diagih</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Status Tiket</th>
                        <th className='text-center' style={{ 'width': '250px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {mohons?.data?.map((mohon,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{mohon.numbering}</span></td>
                            {/* <td>{mohon.user?.name}</td> */}
                            <td>{mohon.user?.nric}</td>
                            <td>{mohon.user?.user_profile?.user_department?.name}</td>
                            {/* <td className='text-center'>
                                <ApproverStatus step={mohon.mohon_approval?.step} currentStatus={mohon.mohon_approval?.status} />
                            </td> */}
                            <td className='text-center'>{mohon.mohon_items_count}</td>
                            <td className='text-center'>{mohon.mohon_distribution_items_count}</td>
                            <td className='text-center'>

                                <FontAwesomeIcon icon={mohon.ticket_status === 'open' ? faLockOpen : faLock} />
                            </td>
                           
                            <td className='text-center'>
                                {/* <Link to={`/mohon-distribution-requests/${mohon.id}`}>
                                    <Button size='sm' variant='outline-success'>Lihat</Button>
                                </Link>*/}
                                <StatusModal mohonRequestId={mohon.id} />
                                {' '}
                                <ReportingModal mohonRequestId={mohon.id} />    
                                {' '}
                                <ViewModal id={mohon.id} />
                                {' '}
                            
                                {mohon.mohon_approval?.step == 4 && mohon.mohon_approval?.status == 'approved'  ?
                                    <Link to={`/mohon-distribution-requests/${mohon.id}`}>
                                        <Button size='sm' variant='outline-success'>Agihan</Button>
                                    </Link>
                                    :
                                    // 
                                    <></>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={mohons} />
                </div>
            </div>
        </div>
    );
};
export default MohonIndex;


/**
 * Paginator Links
 */
function PaginatorLink ({items}){
    //console.log(items.links)
    const handlePaginationClick = (url) => {
      //console.log(url)
      useMohonStore.setState({url: url}) // update the url state in store
      
    }

    // extract the data from Laravel Paginator JSON
    const links = items?.links?.map( (page,index) => 
        
      <Pagination.Item
          key={index} 
          active={page.active}
          disabled={page.url === null}
          onClick={() => handlePaginationClick(page.url)}
          >
              <span dangerouslySetInnerHTML={{__html: page.label}} />
      </Pagination.Item>
    )
  
    return  (
      <Pagination className='mt-3'>
      {links}
      </Pagination>
    )
  }
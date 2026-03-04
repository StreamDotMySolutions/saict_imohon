import React, { useState, useEffect } from 'react'
import { Table, Pagination, Button, Alert, Row, Col, Form } from 'react-bootstrap'
import useMohonItemStore from '../store'
import axios from '../../../libs/axios'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'
import ViewModal from '../modals/ViewModal'
import CreateModal from '../modals/CreateModal'
import ApprovalModal from '../../Mohon/modals/ApprovalModal'
import { useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MohonItemIndex = ({mohonRequestId, step}) => {
    const [searchParams] = useSearchParams()
    const autoOpen = searchParams.get('create') === 'true'
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useMohonItemStore()
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    const [pageUrl, setPageUrl] = useState(null)

    // Reset page when search changes
    useEffect(() => {
        setPageUrl(null)
    }, [search])

    // Fetch items data
    useEffect( () =>
        {
            const params = new URLSearchParams()
            if (search) params.set('search', search)
            const url = pageUrl
                ? `${pageUrl}&${params.toString()}`
                : `${apiUrl}/user/mohon-items/${mohonRequestId}?${params.toString()}`

            axios(
                {
                    method: 'get',
                    url: url
                }
            )
            .then( response => {
                setItems(response.data.items)
                store.setValue('refresh', false )
            })
            .catch( error => {
                console.warn(error)
            })
      },
        [
            search,
            pageUrl,
            store.getValue('refresh'),
            mohonRequestId
        ]

    ) // useEffect()

    const itemCount = items?.data?.length ?? 0;

    return (
        <div>

            {step === 0 && itemCount > 0 && (
                <Alert variant='info' className='d-flex align-items-center gap-2'>
                    <FontAwesomeIcon icon='fas fa-circle-info' />
                    <span>
                        Anda telah menambah <strong>{itemCount} peralatan</strong>. Sila klik butang <strong>Mohon</strong> untuk menghantar permohonan kepada Pelulus 1.
                    </span>
                </Alert>
            )}

            {/* Search bar */}
            <Row className='g-2 mb-3' style={{ maxWidth: 400 }}>
                <Col>
                    <Form.Control size='sm' placeholder='Cari nama atau kategori peralatan...'
                        value={search} onChange={e => setSearch(e.target.value)} />
                </Col>
            </Row>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    {step === 0 && <CreateModal autoOpen={autoOpen} /> }
                    {' '}
                    <ApprovalModal id={mohonRequestId} count={items.data?.length} step={step}/>
                </div>
            </div>


            <Table>
                <thead>
                    <tr>
                        {/* <th style={{ 'width': '20px'}}>No</th> */}
                        <th>Peralatan</th>
                        <th>Jenis</th>
                        <th>Pemilik Peralatan</th>
                        <th className='text-center' style={{ 'width': '250px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {items?.data?.map((item,index) => (
                        <tr key={index}>
                            {/* <td> <span className="badge bg-primary">{item.id}</span></td> */}
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.name}</td>
                            <td className='text-center' >
                                <ViewModal id={item.id} step={step} />
                                {' '}
                                <EditModal id={item.id} step={step} />
                                {' '}
                                <DeleteModal id={item.id} step={step} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className='mt-3'>
                {items?.links?.map((page, index) => (
                    <Pagination.Item key={index} active={page.active} disabled={!page.url}
                        onClick={() => page.url && setPageUrl(page.url)}>
                        <span dangerouslySetInnerHTML={{ __html: page.label }} />
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};
export default MohonItemIndex;
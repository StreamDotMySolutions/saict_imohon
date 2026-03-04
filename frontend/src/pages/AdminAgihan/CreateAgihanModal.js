import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'

export default function CreateAgihanModal({ mohonId, referenceNo }) {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = () => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: `${apiUrl}/admin/mohon-distribution-requests/${mohonId}`,
            data: { title: 'Mohon Agihan', description: 'Admin memohon agihan' },
        })
            .then(response => {
                setShow(false)
                navigate(`/admin/agihan/${mohonId}`)
            })
            .catch(error => {
                console.warn(error)
                setIsLoading(false)
            })
    }

    return (
        <>
            <Button size='sm' variant='success' onClick={() => setShow(true)}>
                <FontAwesomeIcon icon='fas fa-boxes-stacked' /> Mohon Agihan
            </Button>

            <Modal show={show} onHide={() => !isLoading && setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon='fas fa-boxes-stacked' className='me-2 text-success' />
                        Cipta Agihan Baharu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center py-4'>
                    <p className='mb-1'>Cipta agihan baharu untuk permohonan</p>
                    <h5 className='fw-bold text-primary'>{referenceNo}</h5>
                    <p className='text-muted mt-2' style={{ fontSize: '0.875rem' }}>
                        Selepas ini anda akan dibawa ke halaman untuk memilih peralatan yang akan diagih.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' size='sm' disabled={isLoading} onClick={() => setShow(false)}>
                        Batal
                    </Button>
                    <Button variant='success' size='sm' disabled={isLoading} onClick={handleConfirm}>
                        {isLoading
                            ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Mencipta...</>
                            : <><FontAwesomeIcon icon='fas fa-check' className='me-1' />Cipta</>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'
import MohonDistributionItemIndex from '../MohonDistributionItem-v2/components/MohonDistributionItemIndex'

const AgihanLulusModal = ({ mohonId, referenceNo }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [show, setShow] = useState(false)
    const [agihanRequestId, setAgihanRequestId] = useState(null)

    const handleOpen = () => {
        setShow(true)
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(res => {
                const activeAgihan = res.data.mohon?.mohon_distribution_requests?.[0]
                setAgihanRequestId(activeAgihan?.id ?? null)
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setShow(false)
        setAgihanRequestId(null)
    }

    return (
        <>
            <Button size='sm' variant='outline-primary' onClick={handleOpen}>
                <FontAwesomeIcon icon='fas fa-truck-fast' className='me-1' />
                Tetapkan Penghantaran
            </Button>

            <Modal size='xl' show={show} onHide={handleClose} enforceFocus={false} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tetapkan Penghantaran{' '}
                        <small className='text-muted'>{referenceNo}</small>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {agihanRequestId
                        ? <MohonDistributionItemIndex agihanRequestId={agihanRequestId} />
                        : <p className='text-muted text-center py-5'>Memuatkan...</p>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AgihanLulusModal

import { useState } from 'react'
import { Badge, Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'
import ShowForBoss from '../../../Reporting/ShowForBoss'

export default function ViewModal({ mohonDistributionRequestId, mohonRequestId }) {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useMohonStore()

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [approval, setApproval] = useState(null)
    const [message, setMessage] = useState('')
    const [acknowledge, setAcknowledge] = useState(false)
    const [errors, setErrors] = useState(null)

    const handleShowClick = () => {
        setShow(true)
        setIsLoading(true)
        setMessage('')
        setAcknowledge(false)
        setErrors(null)
        setApproval(null)
        axios({
            method: 'get',
            url: `${apiUrl}/boss/mohon-distribution/${mohonDistributionRequestId}`,
        })
            .then(response => {
                const mohon = response.data.mohon
                setApproval(mohon.mohon_distribution_approval)
                const existing = mohon.mohon_distribution_approval_approved_by_user
                    ?? mohon.mohon_distribution_approval_rejected_by_user
                if (existing?.message) setMessage(existing.message)
            })
            .catch(error => console.warn(error))
            .finally(() => setIsLoading(false))
    }

    const handleClose = () => {
        if (isLoading) return
        setShow(false)
    }

    const handleSubmit = (status) => {
        setIsLoading(true)
        setErrors(null)
        const formData = new FormData()
        formData.append('status', status)
        formData.append('message', message)
        formData.append('acknowledge', acknowledge ? 1 : 0)
        formData.append('_method', 'put')
        axios({
            method: 'post',
            url: `${apiUrl}/boss/mohon-distribution-approvals/${mohonDistributionRequestId}`,
            data: formData,
        })
            .then(() => {
                store.setValue('refresh', true)
                setTimeout(() => {
                    setIsLoading(false)
                    setShow(false)
                }, 500)
            })
            .catch(error => {
                console.warn(error)
                setIsLoading(false)
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
    }

    const isActioned = approval?.step === 2

    return (
        <>
            <Button size='sm' variant='outline-primary' onClick={handleShowClick}>
                <FontAwesomeIcon icon='fas fa-eye' className='me-1' />
                Lihat
            </Button>

            <Modal fullscreen show={show} onHide={handleClose} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon='fas fa-truck' className='me-2 text-primary' />
                        Kelulusan Agihan
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isLoading && !approval
                        ? <p className='text-muted text-center py-5'>Memuatkan...</p>
                        : (
                            <>
                                <ShowForBoss mohonRequestId={mohonRequestId} />

                                <hr />

                                <div className='mb-3' style={{ maxWidth: 640 }}>
                                    <h6 className='text-uppercase text-muted mb-2'>Justifikasi Kelulusan</h6>
                                    <Form.Control
                                        as='textarea'
                                        rows={4}
                                        placeholder='Sila lengkapkan justifikasi kelulusan'
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        disabled={isLoading || isActioned}
                                        isInvalid={!!errors?.message}
                                    />
                                    {errors?.message && (
                                        <Form.Control.Feedback type='invalid'>{errors.message[0]}</Form.Control.Feedback>
                                    )}
                                </div>
                            </>
                        )
                    }
                </Modal.Body>

                <Modal.Footer>
                    {isActioned ? (
                        <Badge bg='secondary' className='me-auto py-2 px-3'>
                            <FontAwesomeIcon icon='fas fa-check-circle' className='me-1' />
                            Telah disahkan pada {approval?.created_at}
                        </Badge>
                    ) : (
                        <>
                            <Form.Check
                                className='me-auto'
                                reverse
                                disabled={isLoading}
                                label='Saya mengesahkan telah memeriksa permohonan ini'
                                type='checkbox'
                                checked={acknowledge}
                                isInvalid={!!errors?.acknowledge}
                                onChange={e => setAcknowledge(e.target.checked)}
                            />
                            <Button
                                variant='success'
                                disabled={isLoading || !acknowledge}
                                onClick={() => handleSubmit('approved')}
                            >
                                <FontAwesomeIcon icon='fas fa-check' className='me-1' />
                                Lulus
                            </Button>
                            <Button
                                variant='danger'
                                disabled={isLoading || !acknowledge}
                                onClick={() => handleSubmit('rejected')}
                            >
                                <FontAwesomeIcon icon='fas fa-times' className='me-1' />
                                Gagal
                            </Button>
                        </>
                    )}
                    <Button variant='secondary' disabled={isLoading} onClick={handleClose}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

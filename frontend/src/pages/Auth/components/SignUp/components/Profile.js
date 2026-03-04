import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Row, Col } from 'react-bootstrap'
import useAuthStore from '../../../stores/AuthStore'

const Profile = () => {
    const store = useAuthStore()
    const errors = store.errors

    return (
        <div>
            <Row className='g-3'>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-user' className='me-2' />
                            Nama Penuh
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='name'
                            placeholder='Nama penuh anda'
                            isInvalid={!!errors?.name}
                            onChange={e => useAuthStore.setState({ name: { value: e.target.value } })}
                        />
                        {errors?.name && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-briefcase' className='me-2' />
                            Jawatan
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='occupation'
                            placeholder='Jawatan anda'
                            isInvalid={!!errors?.occupation}
                            onChange={e => useAuthStore.setState({ occupation: { value: e.target.value } })}
                        />
                        {errors?.occupation && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.occupation}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Row className='g-3 mt-1'>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-id-card' className='me-2' />
                            No. Kad Pengenalan
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='nric'
                            placeholder='XXXXXX-XX-XXXX'
                            isInvalid={!!errors?.nric}
                            onChange={e => useAuthStore.setState({ nric: { value: e.target.value } })}
                        />
                        {errors?.nric && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.nric}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-phone' className='me-2' />
                            No. Telefon
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='phone'
                            placeholder='No. telefon peribadi'
                            isInvalid={!!errors?.phone}
                            onChange={e => useAuthStore.setState({ phone: { value: e.target.value } })}
                        />
                        {errors?.phone && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.phone}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Row className='g-3 mt-1'>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-building' className='me-2' />
                            Tingkat
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='level'
                            placeholder='Tingkat pejabat'
                            isInvalid={!!errors?.level}
                            onChange={e => useAuthStore.setState({ level: { value: e.target.value } })}
                        />
                        {errors?.level && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.level}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className='fw-semibold'>
                            <FontAwesomeIcon icon='fa-solid fa-building' className='me-2' />
                            Nama Bangunan
                        </Form.Label>
                        <Form.Control
                            size='lg'
                            type='text'
                            name='building'
                            placeholder='Nama bangunan pejabat'
                            isInvalid={!!errors?.building}
                            onChange={e => useAuthStore.setState({ building: { value: e.target.value } })}
                        />
                        {errors?.building && (
                            <Form.Control.Feedback type='invalid'>
                                {errors.building}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className='mt-3'>
                <Form.Label className='fw-semibold'>
                    <FontAwesomeIcon icon='fa-solid fa-address-card' className='me-2' />
                    Alamat Pejabat
                </Form.Label>
                <Form.Control
                    as='textarea'
                    rows={4}
                    name='address'
                    placeholder='Alamat pejabat lengkap'
                    isInvalid={!!errors?.address}
                    onChange={e => useAuthStore.setState({ address: { value: e.target.value } })}
                />
                {errors?.address && (
                    <Form.Control.Feedback type='invalid'>
                        {errors.address}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </div>
    )
}

export default Profile

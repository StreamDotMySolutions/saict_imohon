import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import useAuthStore from '../../../stores/AuthStore'

const Account = () => {
    const store = useAuthStore()
    const errors = store.errors

    return (
        <div>
            <Form.Group className='mb-3'>
                <Form.Label className='fw-semibold'>
                    <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-2' />
                    Alamat Emel
                </Form.Label>
                <Form.Control
                    size='lg'
                    type='email'
                    name='email'
                    placeholder='nama@example.com'
                    isInvalid={!!errors?.email}
                    onChange={e => useAuthStore.setState({ email: { value: e.target.value } })}
                />
                {errors?.email && (
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label className='fw-semibold'>
                    <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                    Kata Laluan
                </Form.Label>
                <Form.Control
                    size='lg'
                    type='password'
                    name='password'
                    placeholder='Masukkan kata laluan anda'
                    isInvalid={!!errors?.password}
                    onChange={e => useAuthStore.setState({ password: { value: e.target.value } })}
                />
                {errors?.password && (
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label className='fw-semibold'>
                    <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                    Sahkan Kata Laluan
                </Form.Label>
                <Form.Control
                    size='lg'
                    type='password'
                    name='password_confirmation'
                    placeholder='Sahkan kata laluan anda'
                    isInvalid={!!errors?.password_confirmation}
                    onChange={e => useAuthStore.setState({ password_confirmation: { value: e.target.value } })}
                />
                {errors?.password_confirmation && (
                    <Form.Control.Feedback type='invalid'>
                        {errors.password_confirmation}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </div>
    )
}

export default Account
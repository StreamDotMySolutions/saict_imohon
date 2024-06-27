
import { Row, Col, Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../libs/axios';
import { useEffect, useState } from 'react';
import useMohonItemStore from '../store';

export function PicName() {
    const store = useMohonItemStore();
    const errors = store.getValue('errors') || {};

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-user" /></InputGroup.Text>
            <FloatingLabel
                label={errors.pic_name ? errors.pic_name : 'Pegawai Sokongan Teknikal'}
                className={`col ${errors.pic_name ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Sila lengkapkan pegawai sokongan teknikal'
                    readOnly={store.readonly}
                    value={store.getValue('pic_name') || ''}
                    name='pic_name'
                    size='md'
                    required
                    isInvalid={errors.hasOwnProperty('pic_name')}
                    onChange={(e) => store.setValue('pic_name', e.target.value)}
                />
            </FloatingLabel>
            {errors.pic_name && (
                <Form.Control.Feedback type="invalid">
                    {errors.pic_name}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function PicPhone() {
    const store = useMohonItemStore();
    const errors = store.getValue('errors') || {};

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-phone" /></InputGroup.Text>
            <FloatingLabel
                label={errors.pic_phone ? errors.pic_phone : 'Nombor Telefon Pegawai Sokongan Teknikal'}
                className={`col ${errors.pic_phone ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Sila lengkapkan nombor telefon Pegawai Sokongan Teknikal'
                    readOnly={store.readonly}
                    value={store.getValue('pic_phone') || ''}
                    name='pic_phone'
                    size='md'
                    required
                    isInvalid={errors.hasOwnProperty('pic_phone')}
                    onChange={(e) => store.setValue('pic_phone', e.target.value)}
                />
            </FloatingLabel>
            {errors.pic_phone && (
                <Form.Control.Feedback type="invalid">
                    {errors.pic_phone}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function DateStart() {
    const store = useMohonItemStore();
    const errors = store.getValue('errors') || {};

    return (
        <InputGroup>
            <InputGroup.Text>
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </InputGroup.Text>
            <FloatingLabel
                label={errors.date_start ? errors.date_start : 'Tarikh mula serahan'}
                className={`col ${errors.date_start ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Tarikh mula'
                    readOnly={store.readonly}
                    value={store.getValue('date_start') || ''}
                    name='date_start'
                    size='md'
                    type='date'
                    required
                    isInvalid={errors.hasOwnProperty('date_start')}
                    onChange={(e) => store.setValue('date_start', e.target.value)}
                />
            </FloatingLabel>
            {errors.date_start && (
                <Form.Control.Feedback type="invalid">
                    {errors.date_start}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function DateEnd() {
    const store = useMohonItemStore();
    const errors = store.getValue('errors') || {};

    return (
        <InputGroup>
            <InputGroup.Text>
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </InputGroup.Text>
            <FloatingLabel
                label={errors.date_end ? errors.date_end : 'Tarikh tamat serahan'}
                className={`col ${errors.date_end ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Tarikh tamat'
                    readOnly={store.readonly}
                    value={store.getValue('date_end') || ''}
                    name='date_end'
                    type='date'
                    size='md'
                    required
                    isInvalid={errors.hasOwnProperty('date_end')}
                    onChange={(e) => store.setValue('date_end', e.target.value)}
                />
            </FloatingLabel>
            {errors.date_end && (
                <Form.Control.Feedback type="invalid">
                    {errors.date_end}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}


export function InputCheck({isLoading}) {
    const store = useMohonItemStore()
    const errors = store.getValue('errors');

    return (
        <Form.Check
            className='me-4'
            isInvalid={errors?.hasOwnProperty('acknowledge')}
            reverse
            disabled={isLoading}
            label="Saya mengesahkan telah memeriksa permohonan ini"
            type="checkbox"
            onClick={ () => store.setValue('errors', null) }
            onChange={ (e) => store.setValue('acknowledge', true) }
        />   
    )
}



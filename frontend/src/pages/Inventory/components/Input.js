import useInventoryStore from '../stores/InventoryStore';
import { Row, Col, Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../libs/axios';
import { useEffect, useState } from 'react';

export function Vendor() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-info" /></InputGroup.Text>
            <FloatingLabel
                label={errors.vendor ? errors.vendor : 'Nama vendor/pembekal peralatan'}
                className={`col ${errors.vendor ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Sila lengkapkan nama vendor/pembekal'
                    readOnly={store.readonly}
                    value={store.getValue('vendor') || ''}
                    name='vendor'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('vendor')}
                    onChange={(e) => store.setValue('vendor', e.target.value)}
                />
            </FloatingLabel>
            {errors?.vendor && (
                <Form.Control.Feedback type="invalid">
                    {errors.vendor}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function Item({ options = [] }) {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-computer" /></InputGroup.Text>
            <FloatingLabel
                label={errors.category_id ? errors.category_id : 'Sila pilih peralatan'}
                className={`col ${errors.category_id ? 'text-danger' : ''}`}
            >
                <Form.Select
                    disabled={store.readonly}
                    value={store.getValue('category_id') || ''}
                    name='category_id'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('category_id')}
                    onChange={(e) => store.setValue('category_id', e.target.value)}
                >
                    <option value="none">Pilih jenis peralatan</option>
                    {options.map((option, index) => (
                        <option value={option.id} key={index}>{option.name}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            {errors?.category_id && (
                <Form.Control.Feedback type="invalid">
                    {errors.category_id}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function Total() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-calculator" /></InputGroup.Text>
            <FloatingLabel
                label={errors.total ? errors.total : 'Jumlah peralatan'}
                className={`col ${errors.total ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Jumlah'
                    readOnly={store.readonly}
                    value={store.getValue('total') || ''}
                    name='total'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('total')}
                    onChange={(e) => store.setValue('total', e.target.value)}
                />
            </FloatingLabel>
            {errors?.total && (
                <Form.Control.Feedback type="invalid">
                    {errors.total}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function DateStart() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text >
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </InputGroup.Text>

            <FloatingLabel
                label={errors.date_start ? errors.date_start : 'Tarikh mula kontrak'}
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
                    isInvalid={errors?.hasOwnProperty('date_start')}
                    onChange={(e) => store.setValue('date_start', e.target.value)}
                />
            </FloatingLabel>
            {errors?.date_start && (
                <Form.Control.Feedback type="invalid">
                    {errors.date_start}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function DateEnd() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text>
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </InputGroup.Text>
            <FloatingLabel
                label={errors.date_start ? errors.date_start : 'Tarikh tamat kontrak'}
                className={`col ${errors.date_start ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Tarikh tamat'
                    readOnly={store.readonly}
                    value={store.getValue('date_end') || ''}
                    name='date_end'
                    type='date'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('date_end')}
                    onChange={(e) => store.setValue('date_end', e.target.value)}
                />
            </FloatingLabel>
            {errors?.date_end && (
                <Form.Control.Feedback type="invalid">
                    {errors.date_end}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function ReceivedOn() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text>
                <FontAwesomeIcon icon="fa-solid fa-calendar" />
            </InputGroup.Text>
            <FloatingLabel
                label={errors.received_on ? errors.received_on : 'Tarikh pembekalan peralatan'}
                className={`col ${errors.received_on ? 'text-danger' : ''}`}
            >
            <Form.Control
                placeholder='Tarikh pembekalan peralatan'
                readOnly={store.readonly}
                value={store.getValue('received_on') || ''}
                name='received_on'
                size='md'
                type='date'
                required
                isInvalid={errors?.hasOwnProperty('received_on')}
                onChange={(e) => store.setValue('received_on', e.target.value)}
            />
            </FloatingLabel>
            {errors?.received_on && (
                <Form.Control.Feedback type="invalid">
                    {errors.received_on}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function Email() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-envelope" /></InputGroup.Text>
            <FloatingLabel
                label={errors.email ? errors.email : 'Alamat email'}
                className={`col ${errors.email ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Email Vendor'
                    readOnly={store.readonly}
                    value={store.getValue('email') || ''}
                    name='email'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('email')}
                    onChange={(e) => store.setValue('email', e.target.value)}
                />
            </FloatingLabel>
            {errors?.email && (
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function Phone() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-phone" /></InputGroup.Text>
            <FloatingLabel
                label={errors.phone ? errors.phone : 'No Telefon Vendor'}
                className={`col ${errors.phone ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='No Telefon Vendor'
                    readOnly={store.readonly}
                    value={store.getValue('phone') || ''}
                    name='phone'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('phone')}
                    onChange={(e) => store.setValue('phone', e.target.value)}
                />
            </FloatingLabel>
            {errors?.phone && (
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function Model() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-info" /></InputGroup.Text>
            <FloatingLabel
                label={errors.model ? errors.model : 'Model'}
                className={`col ${errors.model ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Model'
                    readOnly={store.readonly}
                    value={store.getValue('model') || ''}
                    name='model'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('model')}
                    onChange={(e) => store.setValue('model', e.target.value)}
                />
            </FloatingLabel>
            {errors?.model && (
                <Form.Control.Feedback type="invalid">
                    {errors.model}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function ContractName() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-info" /></InputGroup.Text>
            <FloatingLabel
                label={errors.contract_name ? errors.contract_name : 'Nama Kontrak'}
                className={`col ${errors.contract_name ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Nama Kontrak'
                    readOnly={store.readonly}
                    value={store.getValue('contract_name') || ''}
                    name='contract_name'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('contract_name')}
                    onChange={(e) => store.setValue('contract_name', e.target.value)}
                />
            </FloatingLabel>
            {errors?.contract_name && (
                <Form.Control.Feedback type="invalid">
                    {errors.contract_name}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function ContractNumber() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-hashtag" /></InputGroup.Text>
            <FloatingLabel
                label={errors.contract_number ? errors.contract_number : 'Nombor Kontrak'}
                className={`col ${errors.contract_number ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Nombor Kontrak'
                    readOnly={store.readonly}
                    value={store.getValue('contract_number') || ''}
                    name='contract_number'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('contract_number')}
                    onChange={(e) => store.setValue('contract_number', e.target.value)}
                />
            </FloatingLabel>
            {errors?.contract_number && (
                <Form.Control.Feedback type="invalid">
                    {errors.contract_number}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function ContractPic() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-person" /></InputGroup.Text>
            <FloatingLabel
                label={errors.contract_pic ? errors.contract_pic : 'PIC ( Person In Charge) Kontrak'}
                className={`col ${errors.contract_pic ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='PIC ( Person In Charge ) Kontrak'
                    readOnly={store.readonly}
                    value={store.getValue('contract_pic') || ''}
                    name='contract_pic'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('contract_pic')}
                    onChange={(e) => store.setValue('contract_pic', e.target.value)}
                />
            </FloatingLabel>
            {errors?.contract_pic && (
                <Form.Control.Feedback type="invalid">
                    {errors.contract_pic}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

export function ContractOwner() {
    const store = useInventoryStore();
    const errors = store.errors;

    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-lock" /></InputGroup.Text>
            <FloatingLabel
                label={errors.contract_owner ? errors.contract_owner : 'Pemilik Kontrak'}
                className={`col ${errors.contract_owner ? 'text-danger' : ''}`}
            >
                <Form.Control
                    placeholder='Pemilik Kontrak'
                    readOnly={store.readonly}
                    value={store.getValue('contract_owner') || ''}
                    name='contract_owner'
                    size='md'
                    required
                    isInvalid={errors?.hasOwnProperty('contract_owner')}
                    onChange={(e) => store.setValue('contract_owner', e.target.value)}
                />
            </FloatingLabel>
            {errors?.contract_owner && (
                <Form.Control.Feedback type="invalid">
                    {errors.contract_owner}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    );
}

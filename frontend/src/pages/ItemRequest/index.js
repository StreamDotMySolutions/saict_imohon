import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Container, Row, Col, Button, Table, Form, Alert, Badge, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText, InputTextarea, InputSelect, InputSelectRecursive } from './components/Inputs'
import axios from '../../libs/axios'

const emptyItem = {
    category_id: '',
    type: '',
    name: '',
    occupation: '',
    mobile: '',
    building_name: '',
    building_level: '',
    location: '',
    description: '',
}

const types = [
    { id: 'new', name: 'Baharu' },
    { id: 'replacement', name: 'Ganti' }
]

const RecursiveDropdown = ({ data, selected, depth = 0 }) => {
    const indent = '_ _'.repeat(depth)
    return (
        <>
            {data?.map((item, index) => (
                <span key={index}>
                    <option
                        value={item.id}
                        className={item.parent_id === null ? 'text-uppercase fw-bold' : 'text-uppercase'}
                        disabled={item.parent_id === null}
                    >
                        {depth !== 0 && 'I'}{indent}{' '}{item.name}
                    </option>
                    <RecursiveDropdown data={item.children} selected={selected} depth={depth + 1} />
                </span>
            ))}
        </>
    )
}

export default function ItemRequest() {
    const [currentStep, setCurrentStep] = useState(1)
    const [items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState({ ...emptyItem })
    const [editingIndex, setEditingIndex] = useState(null)

    const [categories, setCategories] = useState([])
    const [managers, setManagers] = useState([])

    const [managerId, setManagerId] = useState('')
    const [acknowledge, setAcknowledge] = useState(false)

    const [errors, setErrors] = useState({})
    const [itemErrors, setItemErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [navigateTo, setNavigateTo] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    useEffect(() => {
        axios.get('/user/mohon-items/categories').then(res => {
            setCategories(res.data?.categories || [])
        })
        axios.get('/user/mohon-approvals/managers').then(res => {
            setManagers(res.data?.managers || [])
        })
    }, [])

    if (navigateTo) return <Navigate to={navigateTo} replace />

    const handleItemField = (field, value) => {
        setCurrentItem(prev => ({ ...prev, [field]: value }))
        setItemErrors(prev => {
            const next = { ...prev }
            delete next[field]
            return next
        })
    }

    const validateItem = () => {
        const errs = {}
        const requiredFields = {
            category_id: 'Sila pilih item',
            type: 'Sila pilih jenis permohonan',
            name: 'Nama diperlukan',
            occupation: 'Sila nyatakan pekerjaan',
            mobile: 'Sila nyatakan no telefon ( peribadi )',
            building_name: 'Sila nyatakan nama bangunan',
            building_level: 'Sila nyatakan tingkat bangunan',
            location: 'Sila nyatakan lokasi peralatan',
            description: 'Sila lengkapkan justifikasi permohonan',
        }
        for (const [field, msg] of Object.entries(requiredFields)) {
            if (!currentItem[field] || currentItem[field].toString().trim() === '') {
                errs[field] = msg
            }
        }
        setItemErrors(errs)
        return Object.keys(errs).length === 0
    }

    const addItem = () => {
        if (!validateItem()) return
        if (editingIndex !== null) {
            setItems(prev => prev.map((item, i) => i === editingIndex ? { ...currentItem } : item))
            setEditingIndex(null)
        } else {
            setItems(prev => [...prev, { ...currentItem }])
        }
        setCurrentItem({ ...emptyItem })
        setItemErrors({})
    }

    const editItem = (index) => {
        setCurrentItem({ ...items[index] })
        setEditingIndex(index)
        setCurrentStep(1)
    }

    const deleteItem = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index))
        if (editingIndex === index) {
            setEditingIndex(null)
            setCurrentItem({ ...emptyItem })
        }
    }

    const cancelEdit = () => {
        setEditingIndex(null)
        setCurrentItem({ ...emptyItem })
        setItemErrors({})
    }

    const getCategoryName = (id) => {
        const find = (list) => {
            for (const cat of list) {
                if (String(cat.id) === String(id)) return cat.name
                if (cat.children) {
                    const found = find(cat.children)
                    if (found) return found
                }
            }
            return null
        }
        return find(categories) || id
    }

    const handleSubmit = () => {
        const errs = {}
        if (!managerId) errs.manager_id = 'Sila pilih pelulus'
        if (!acknowledge) errs.acknowledge = 'Sila tandakan pengesahan'
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setIsSubmitting(true)
        axios.post('/user/item-requests', {
            items,
            manager_id: managerId,
            acknowledge: acknowledge ? true : false,
        })
            .then(res => {
                setNavigateTo('/mohon')
            })
            .catch(err => {
                if (err.response?.status === 422) {
                    const serverErrors = err.response.data.errors || {}
                    const stepTwoErrors = {}
                    let hasItemErrors = false

                    for (const [key, value] of Object.entries(serverErrors)) {
                        if (key.startsWith('items.')) {
                            hasItemErrors = true
                        } else {
                            stepTwoErrors[key] = Array.isArray(value) ? value[0] : value
                        }
                    }

                    setErrors(stepTwoErrors)
                    if (hasItemErrors) {
                        setCurrentStep(1)
                        setAlertMessage('Terdapat ralat pada item permohonan. Sila semak semula.')
                    }
                }
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <Container className="py-4">
            {/* Stepper */}
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <div className="d-flex align-items-center gap-2">
                        <Badge bg={currentStep === 1 ? 'primary' : 'secondary'} className="px-3 py-2">
                            1. Tambah Peralatan
                        </Badge>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" className="text-muted" />
                        <Badge bg={currentStep === 2 ? 'primary' : 'secondary'} className="px-3 py-2">
                            2. Semak & Hantar
                        </Badge>
                    </div>
                </Col>
            </Row>

            {alertMessage && (
                <Alert variant="warning" onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            {/* Step 1 */}
            {currentStep === 1 && (
                <>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 className="mb-0">
                                {editingIndex !== null ? 'Kemaskini Peralatan' : 'Tambah Peralatan'}
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <Row className='mb-3'>
                                <Col>
                                    <InputSelectRecursive
                                        fieldName='category_id'
                                        placeholder='Sila Pilih Peralatan'
                                        icon='fa-solid fa-computer'
                                        value={currentItem.category_id}
                                        onChange={handleItemField}
                                        error={itemErrors.category_id}
                                    >
                                        <RecursiveDropdown data={categories} selected={currentItem.category_id} />
                                    </InputSelectRecursive>
                                </Col>
                                <Col>
                                    <InputSelect
                                        fieldName='type'
                                        options={types}
                                        placeholder='Sila Pilih Jenis'
                                        icon='fa-solid fa-info'
                                        value={currentItem.type}
                                        onChange={handleItemField}
                                        error={itemErrors.type}
                                    />
                                </Col>
                            </Row>

                            <h5>Penerima Peralatan</h5>
                            <Row className='mt-3'>
                                <InputText
                                    fieldName='name'
                                    placeholder='Nama'
                                    icon='fa-solid fa-user'
                                    value={currentItem.name}
                                    onChange={handleItemField}
                                    error={itemErrors.name}
                                />
                            </Row>

                            <Row className='mt-3 mb-3'>
                                <InputText
                                    fieldName='occupation'
                                    placeholder='Jawatan'
                                    icon='fa-solid fa-graduation-cap'
                                    value={currentItem.occupation}
                                    onChange={handleItemField}
                                    error={itemErrors.occupation}
                                />
                            </Row>

                            <Row className='mt-3 mb-3'>
                                <InputText
                                    fieldName='mobile'
                                    placeholder='No Telefon (peribadi)'
                                    icon='fa-solid fa-phone'
                                    value={currentItem.mobile}
                                    onChange={handleItemField}
                                    error={itemErrors.mobile}
                                />
                            </Row>

                            <h5>Lokasi Penempatan Peralatan</h5>
                            <Row className='mt-3'>
                                <InputText
                                    fieldName='building_name'
                                    placeholder='Nama bangunan'
                                    icon='fa-solid fa-building'
                                    value={currentItem.building_name}
                                    onChange={handleItemField}
                                    error={itemErrors.building_name}
                                />
                            </Row>

                            <Row className='mt-3'>
                                <InputText
                                    fieldName='building_level'
                                    placeholder='Tingkat bangunan'
                                    icon='fa-solid fa-building'
                                    value={currentItem.building_level}
                                    onChange={handleItemField}
                                    error={itemErrors.building_level}
                                />
                            </Row>

                            <Row className='mt-3 mb-3'>
                                <InputText
                                    fieldName='location'
                                    placeholder='Lokasi peralatan'
                                    icon='fa-solid fa-globe'
                                    value={currentItem.location}
                                    onChange={handleItemField}
                                    error={itemErrors.location}
                                />
                            </Row>

                            <h5>Justifikasi</h5>
                            <InputTextarea
                                fieldName='description'
                                placeholder='Sila lengkapkan justifikasi permohonan'
                                icon='fa-solid fa-pencil'
                                rows='6'
                                value={currentItem.description}
                                onChange={handleItemField}
                                error={itemErrors.description}
                            />

                            <div className="mt-3 d-flex gap-2">
                                <Button variant="success" onClick={addItem}>
                                    <FontAwesomeIcon icon="fa-solid fa-plus" />{' '}
                                    {editingIndex !== null ? 'Kemaskini' : 'Tambah Peralatan'}
                                </Button>
                                {editingIndex !== null && (
                                    <Button variant="secondary" onClick={cancelEdit}>
                                        Batal
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Items list */}
                    {items.length > 0 && (
                        <Card className="mb-4">
                            <Card.Header>
                                <h5 className="mb-0">Senarai Peralatan ({items.length})</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Peralatan</th>
                                            <th>Jenis</th>
                                            <th>Penerima</th>
                                            <th>Lokasi</th>
                                            <th>Tindakan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{getCategoryName(item.category_id)}</td>
                                                <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                                <td>{item.name}</td>
                                                <td>{item.building_name}, {item.location}</td>
                                                <td>
                                                    <Button size="sm" variant="warning" className="me-1" onClick={() => editItem(index)}>
                                                        <FontAwesomeIcon icon="fa-solid fa-edit" />
                                                    </Button>
                                                    <Button size="sm" variant="danger" onClick={() => deleteItem(index)}>
                                                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )}

                    <div className="d-flex justify-content-end">
                        <Button
                            variant="primary"
                            disabled={items.length === 0}
                            onClick={() => setCurrentStep(2)}
                        >
                            Seterusnya <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                        </Button>
                    </div>
                </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
                <>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 className="mb-0">Ringkasan Permohonan</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Peralatan</th>
                                        <th>Jenis</th>
                                        <th>Penerima</th>
                                        <th>Jawatan</th>
                                        <th>Lokasi</th>
                                        <th>Justifikasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{getCategoryName(item.category_id)}</td>
                                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                            <td>{item.name}</td>
                                            <td>{item.occupation}</td>
                                            <td>{item.building_name}, {item.building_level}, {item.location}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header>
                            <h5 className="mb-0">Pengesahan</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Pilih Pelulus (Pengurus)</Form.Label>
                                        <Form.Select
                                            value={managerId}
                                            isInvalid={!!errors.manager_id}
                                            onChange={(e) => {
                                                setManagerId(e.target.value)
                                                setErrors(prev => { const n = { ...prev }; delete n.manager_id; return n })
                                            }}
                                        >
                                            <option value="">-- Pilih Pelulus --</option>
                                            {managers.map((m, i) => (
                                                <option key={i} value={m.id}>{m.name}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.manager_id && (
                                            <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                {errors.manager_id}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Check
                                type="checkbox"
                                label="Saya mengesahkan bahawa maklumat yang diberikan adalah benar"
                                checked={acknowledge}
                                isInvalid={!!errors.acknowledge}
                                onChange={(e) => {
                                    setAcknowledge(e.target.checked)
                                    setErrors(prev => { const n = { ...prev }; delete n.acknowledge; return n })
                                }}
                                feedback={errors.acknowledge}
                                feedbackType="invalid"
                            />
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Kembali
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Menghantar...' : 'Hantar Permohonan'}
                        </Button>
                    </div>
                </>
            )}
        </Container>
    )
}

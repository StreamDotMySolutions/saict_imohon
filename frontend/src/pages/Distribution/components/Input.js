import useStore from '../store'
import { Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Item(){

    const store = useStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-computer"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Select 
             
                        readOnly={store.readonly}
                        value={ store.getValue('item') ? store.getValue('item') : '' }
                        name='item'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('item')}
                        onChange={ (e) => store.setValue('item', e.target.value)  }
                    >
                        <option>Pilih jenis peralatan</option>
                        <option value="pc">PC</option>
                        <option value="nb">NB</option>
                        <option value="pbwn">PBWN</option>
                        <option value="pcn">PCN</option>
                        <option value="projektor">Projektor</option>
                        <option value="webcam">Webcam</option>
                    </Form.Select>

                    {
                        errors?.hasOwnProperty('item') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.item ? errors.item : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
         </>)
}

export function ApplicationId(){

    const store = useStore()
    const errors = store.errors
    const application = store.getValue('application')
    console.log(application)
    return(<>
                <InputGroup>
                    <InputGroup.Text style={{'width': '100px'}}>ID Mohon</InputGroup.Text>
                    <Form.Control 
                        //placeholder='No Rujukan Permohonan'
                        readOnly={store.readonly}
                        value={ store.getValue('application_id') ? store.getValue('application_id') : '' }
                        name='application_id'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('application_id')}
                        onChange={ (e) => store.setValue('application_id', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('application_id') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.application_id ? errors.application_id : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>  
        </>)
}

export function Department(){
    const store = useStore()
    const errors = store.errors
    const application = store.getValue('application')
    if (application) return (<>
    
        <InputGroup>
            <InputGroup.Text style={{'width': '100px'}}>Nama</InputGroup.Text>
            <Form.Control
                disabled readonly value={ application?.user?.name}
            />
        </InputGroup>

        <InputGroup className='mt-3'>
            <InputGroup.Text style={{'width': '100px'}}>Jabatan</InputGroup.Text>
            <Form.Control
                disabled readonly value={ application?.user?.user_profile?.user_department?.name }
            />
        </InputGroup>
    
    </>)
}

export function Total(){

    const store = useStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-calculator"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Jumlah'
                        readOnly={store.readonly}
                        value={ store.getValue('total') ? store.getValue('total') : '' }
                        name='total'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('total')}
                        onChange={ (e) => store.setValue('total', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('total') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.total ? errors.total : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
        </>)
}

export function Description(){

    const store = useStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-pencil"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Mesej'
                        as='textarea'
                        rows='5'
                        readOnly={store.readonly}
                        value={ store.getValue('description') ? store.getValue('description') : '' }
                        name='description'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('description')}
                        onChange={ (e) => store.setValue('description', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('description') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.description ? errors.description : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
        </>)
}


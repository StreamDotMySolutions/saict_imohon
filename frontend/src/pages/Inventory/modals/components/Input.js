import useItemStore from '../../stores/ItemStore'
import { Row,Col,Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Vendor(){

    const store = useItemStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-truck"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila lengkapkan nama vendor/pembekal'
                        readOnly={store.readonly}
                        value={ store.getValue('vendor') ? store.getValue('vendor') : '' }
                        name='vendor'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('vendor')}
                        onChange={ (e) => store.setValue('vendor', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('vendor') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.vendor ? errors.vendor : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function Item(){

    const store = useItemStore()
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

export function Total(){

    const store = useItemStore()
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


export function DateStart(){

    const store = useItemStore()
    const errors = store.errors

    return(<>
                <InputGroup>
              
                    <InputGroup.Text style={{'width':'130px'}}>
                        Tarikh Mula
                    </InputGroup.Text>
                   
                    <Form.Control 
                        placeholder='Tarikh mula'
                        label='Tarikh mula'
                        readOnly={store.readonly}
                        value={ store.getValue('date_start') ? store.getValue('date_start') : '' }
                        name='date_start'
                        size='md' 
                        type='date'
                        required 
                        isInvalid={errors?.hasOwnProperty('date_start')}
                        onChange={ (e) => store.setValue('date_start', e.target.value)  }
                    />
                    </InputGroup>
                    {
                        errors?.hasOwnProperty('date_start') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.date_start ? errors.date_start : null }
                                </Form.Control.Feedback>
                            )
                    }  
        
            </>)
}

export function DateEnd(){

    const store = useItemStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text style={{'width':'130px'}}>
                        Tarikh Tamat
                    </InputGroup.Text>
                   
                    <Form.Control 
                        placeholder='Tarikh tamat'
                        readOnly={store.readonly}
                        value={ store.getValue('date_end') ? store.getValue('date_end') : '' }
                        name='date_end'
                        type='date'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('date_end')}
                        onChange={ (e) => store.setValue('date_end', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('date_end') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.date_end ? errors.date_end : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function ReceivedOn(){

    const store = useItemStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text style={{'width':'130px'}}>
                        Tarikh Terima
                    </InputGroup.Text>
                   
                    <Form.Control 
                        placeholder='Tarikh terima'
                        readOnly={store.readonly}
                        value={ store.getValue('received_on') ? store.getValue('received_on') : '' }
                        name='received_on'
                        size='md' 
                        type='date'
                        required 
                        isInvalid={errors?.hasOwnProperty('received_on')}
                        onChange={ (e) => store.setValue('received_on', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('received_on') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.received_on ? errors.received_on : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}
import useInventoryStore from '../stores/InventoryStore'
import { Row,Col,Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../libs/axios'
import { useEffect, useState } from 'react'

export function Vendor(){

    const store = useInventoryStore()
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

export function Item({ options = []}){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-computer"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Select 
             
                        readOnly={store.readonly}
                        value={ store.getValue('category_id') ? store.getValue('category_id') : '' }
                        name='category_id'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('category_id')}
                        onChange={ (e) => store.setValue('category_id', e.target.value)  }
                    >
                        <option value="none">Pilih jenis peralatan</option>
                        {/* <option value="pc">PC</option>
                        <option value="nb">NB</option>
                        <option value="pbwn">PBWN</option>
                        <option value="pcn">PCN</option>
                        <option value="projektor">Projektor</option>
                        <option value="webcam">Webcam</option> */}

                        {options?.map((option,index) => (
                            <option 
                                value={option.id}
                                key={index}
                                //selected={option.id === store.getValue(fieldName)}  
                            >{option.name}</option>
                        ))}

                    </Form.Select>

                    {
                        errors?.hasOwnProperty('category_id') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.category_id ? errors.category_id : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function Total(){

    const store = useInventoryStore()
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

    const store = useInventoryStore()
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
                    {
                        errors?.hasOwnProperty('date_start') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.date_start ? errors.date_start : null }
                                </Form.Control.Feedback>
                            )
                    }  
                    </InputGroup>
       
        
            </>)
}

export function DateEnd(){

    const store = useInventoryStore()
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

    const store = useInventoryStore()
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


export function Email(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-envelope"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Email Vendor'
                        readOnly={store.readonly}
                        value={ store.getValue('email') ? store.getValue('email') : '' }
                        name='email'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('email')}
                        onChange={ (e) => store.setValue('email', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('email') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.email ? errors.email : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}


export function Phone(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='No Telefon Vendor'
                        readOnly={store.readonly}
                        value={ store.getValue('phone') ? store.getValue('phone') : '' }
                        name='phone'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('phone')}
                        onChange={ (e) => store.setValue('phone', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('phone') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.phone ? errors.phone : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function Model(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-question"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Model'
                        readOnly={store.readonly}
                        value={ store.getValue('model') ? store.getValue('model') : '' }
                        name='model'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('model')}
                        onChange={ (e) => store.setValue('model', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('model') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.model ? errors.model : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function ContractName(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-file"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Nama Kontrak'
                        readOnly={store.readonly}
                        value={ store.getValue('contract_name') ? store.getValue('contract_name') : '' }
                        name='contract_name'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('contract_name')}
                        onChange={ (e) => store.setValue('contract_name', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('contract_name') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.contract_name ? errors.contract_name : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function ContractNumber(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-file"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Nombor Kontrak'
                        readOnly={store.readonly}
                        value={ store.getValue('contract_number') ? store.getValue('contract_number') : '' }
                        name='contract_number'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('contract_number')}
                        onChange={ (e) => store.setValue('contract_number', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('contract_number') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.contract_number ? errors.contract_number : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function ContractPic(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-file"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='PIC ( Person In Charge ) Kontrak'
                        readOnly={store.readonly}
                        value={ store.getValue('contract_pic') ? store.getValue('contract_pic') : '' }
                        name='contract_pic'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('contract_pic')}
                        onChange={ (e) => store.setValue('contract_pic', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('contract_pic') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.contract_pic ? errors.contract_pic : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function ContractOwner(){

    const store = useInventoryStore()
    const errors = store.errors

    return(<>
                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-file"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Pemilik Kontrak'
                        readOnly={store.readonly}
                        value={ store.getValue('contract_owner') ? store.getValue('contract_owner') : '' }
                        name='contract_owner'
                        size='md' 
                        required 
                        isInvalid={errors?.hasOwnProperty('contract_owner')}
                        onChange={ (e) => store.setValue('contract_owner', e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty('contract_owner') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.contract_owner ? errors.contract_owner : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}
import useStore from '../store'
import { Row,Col,Form, InputGroup } from 'react-bootstrap'
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


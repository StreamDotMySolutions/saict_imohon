import { Form, FormControl, Button, Container, Tabs, Tab } from 'react-bootstrap';
import useUserStore from '../../../stores/UserStore';

export function InputText({
    label,
    placeholder,
    field,
    type,
    as,
    rows
}){
    const user = useUserStore()
    return(
        <Form.Group className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <FormControl
            type={type}
            as={as}
            rows={rows}
            name={field}
            autoComplete='off'
            placeholder={placeholder}
            value={user[field]?.value}
            onChange={(e) => { 
                const data = {
                    value: e.target.value
                }
                useUserStore.setState({[field]: data})}
                }
            isInvalid={user[field]?.error} // Apply the is_invalid class when isValid is true
        />
        <Form.Control.Feedback type="invalid">
            {user[field]?.message}
        </Form.Control.Feedback>
        </Form.Group>
    )
}
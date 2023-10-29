import {useState} from 'react';
import { Form,Collapse } from 'react-bootstrap';
import { InputText } from './include';
import useUserStore from '../../../stores/UserStore';
// import Collapse from 'react-bootstrap/Collapse';

const UserAccount = () => {
    const user = useUserStore()
    const [togglePassword, setTogglePassword] = useState(false)
    //console.log(user.selectedRole)
    return (
        <Form>
          
            <Form.Label>Peranan</Form.Label>
            <Form.Select
                label='Peranan'
                className='mb-3'
                defaultValue={user?.role?.value ? user?.role?.value : '' }
                onChange={(e) => { 
                    const data = {
                        value: e.target.value
                    }
                    useUserStore.setState({role: data})}
                }
                isInvalid={user.role?.error}
                >
                <option className='fs-5' value=''>Pilih peranan</option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
                <option value='manager'>Manager</option>
                <option value='boss'>Boss</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {user.role?.message}
            </Form.Control.Feedback>
            

            <InputText
                
                label='Email'
                placeholder={'Alamat email'}
                type='text'
                field='email'
            />

            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Tetapkan Password"
                onChange={() => setTogglePassword(!togglePassword)}
            />

            <Collapse in={togglePassword}>
                <div>
                    <InputText
                    //label='Password'
                    placeholder={'Password'}
                    type='password'
                    field='password'
                    autoComplete="new-password"
                    />
                </div>
            </Collapse>
            
   
            
        </Form>
    );
};

export default UserAccount;
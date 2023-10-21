import {useState} from 'react';
import { Form,Collapse } from 'react-bootstrap';
import { InputText } from './include';
import useUserStore from '../../../stores/UserStore';
// import Collapse from 'react-bootstrap/Collapse';

const UserAccount = () => {
    const user = useUserStore()
    const [togglePassword, setTogglePassword] = useState(false)

    //console.log(user)

    function toggle(){

    }

    return (
        <Form>
        
            <Form.Label>Peranan</Form.Label>
            <Form.Select
                label='Peranan'
                className='mb-3'
                onChange={(e) => { 
                    const data = {
                        value: e.target.value
                    }
                    useUserStore.setState({role: data})}
                }
                isInvalid={user.role?.error}
                >
                <option value=''>Pilih peranan</option>
                <option selected={user?.role?.value == 'admin'} value='admin'>Admin</option>
                <option selected={user?.role?.value == 'user'} value='user'>Pengguna</option>
   
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
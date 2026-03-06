import {useState, useEffect} from 'react';
import { Row,Col,Form,Collapse } from 'react-bootstrap';
import { InputText } from './include';
import useUserStore from '../../../stores/UserStore';
// import Collapse from 'react-bootstrap/Collapse';

const UserAccount = () => {
    const user = useUserStore()

    //console.log(user)
    const [togglePassword, setTogglePassword] = useState(false)

    const [toggleStatus, setToggleStatus] = useState(false)

    const [toggleEmailVerified, setToggleEmailVerified] = useState(false)

    useEffect(() => {
        // Check if user.is_approved and user.is_approved.value exist
        if (user?.is_approved?.value !== undefined) {
          // Set the initial toggleStatus based on user.is_approved.value
          setToggleStatus(user.is_approved.value === 1);
        } else {
          setToggleStatus(0);
        }
      }, [user.is_approved]);

    useEffect(() => {
        // Check if user.email_verified_at has a value
        if (user?.email_verified_at?.value) {
          setToggleEmailVerified(true);
        } else {
          setToggleEmailVerified(false);
        }
      }, [user.email_verified_at]);

    const handleToggleChange = () => {
    const newStatus = !toggleStatus;
    setToggleStatus(newStatus);
    // Update the store with the new status
    useUserStore.setState({ is_approved: { value: newStatus ? 1 : 0 } });
    };

    const handleEmailVerifiedChange = () => {
    const newStatus = !toggleEmailVerified;
    setToggleEmailVerified(newStatus);
    // Update the store with the new status - set to now or null
    useUserStore.setState({ email_verified_at: { value: newStatus ? new Date().toISOString() : null } });
    };

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
                <option value='user'>Pengguna</option>
                <option value='admin'>Admin</option>
                <option value='manager'>Pelulus 1</option>
                <option value='boss'>Pelulus 2</option>
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

            <Col className="border border-1 rounded p-2 mt-3">
                Pengesahan Email
                <Form.Check
                    type="switch"
                    id="email-verified-switch"
                    label={toggleEmailVerified ? 'Sudah Disahkan' : 'Belum Disahkan'}
                    checked={toggleEmailVerified}
                    onChange={handleEmailVerifiedChange}
                />
            </Col>

            <Col className="border border-1 rounded p-2 mt-3">
                Status
                <Form.Check
                    type="switch"
                    id="status-switch"
                    label={toggleStatus ? 'Aktif' : 'Tidak Aktif'}
                    checked={toggleStatus}
                    //onChange={() => setToggleStatus(!toggleStatus)}
                    onChange={handleToggleChange}
                />
            </Col>
            
            <Col className="border border-1 rounded p-2 mt-3">
                Password
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
            
            </Col>
        </Form>
    );
};

export default UserAccount;
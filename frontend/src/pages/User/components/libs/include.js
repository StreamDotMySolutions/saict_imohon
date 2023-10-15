import useUserStore from '../../stores/UserStore';
/**
 * To set error on userStore
 * will be used on UserForm
 * @param {*} field 
 * @param {*} message 
 */
export function setFormError(field, message) {
    const data = {
      value:null,
      error: true,
      message: message,
    };
    const updatedState = {
      [field]: data, // Use dynamic property name
    };
    useUserStore.setState(updatedState);
}

/**
 *                   
  'role',
  'email', 
  'password',

  'name', 
  'occupation',
  'nric', 
  'phone',
  'address',

  'user_department_id'
 */
export function resetStore(){
  useUserStore.setState(
    {
      role: null,
      email: null,
      password: null,
      
      name: null,
      occupation: null,
      nric: null,
      phone: null,
      address: null,

      user_department_id: null,
    
      })
}
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

export function resetStore(){
  useUserStore.setState({
      name: null,
      email: null,
      nric: null,
      password: null
      })
}
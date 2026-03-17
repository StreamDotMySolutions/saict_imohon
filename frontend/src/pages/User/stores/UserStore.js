import { create } from 'zustand'

const users = {
    // pre defined data
    name: {
        value:null,
        error:false,
        message:null
    },
    refresh: false,
    selectedRole: null,
    index_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users/?page=1',
    store_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users',
    // show_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users',
    // update_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users',
    // approve_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users',
    // delete_url :  process.env.REACT_APP_BACKEND_URL + '/admin/users',
}
const useUserStore = create( () => (users)) // create store
export default useUserStore
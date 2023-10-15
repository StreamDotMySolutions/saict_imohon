import { create } from 'zustand'

const users = {
    // pre defined data
    name: {
        value:null,
        error:false,
        message:null
    },
    refresh: false,
    index_url :  process.env.REACT_APP_BACKEND_URL + '/users/?page=1',
    store_url :  process.env.REACT_APP_BACKEND_URL + '/users/store',
    update_url :  process.env.REACT_APP_BACKEND_URL + '/users/update',
    delete_url :  process.env.REACT_APP_BACKEND_URL + '/users/delete',
}
const useUserStore = create( () => (users)) // create store
export default useUserStore
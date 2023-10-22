import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const auth = {
   
    user_departments_url:  `${base_url}/user-departments/?page=1`,
    store_url :  `${base_url}/register`,
    refresh: false,
    errors : null,
}
const useAuthStore = create( () => (auth) ) // create store
export default useAuthStore
import { create } from 'zustand'

const base_url =  process.env.REACT_APP_BACKEND_URL

const UserDepartments = {

    refresh: false,
    base_url :  base_url,
    index_url :  base_url + '/user-departments/?page=1',
    store_url :  base_url + '/user-departments',
    update_url :  base_url + '/user-departments',
    delete_url :  base_url + '/user-departments',
    ordering_url :  base_url + '/user-departments/ordering',
}
const useUserDepartmentStore = create( () => (UserDepartments)) // create store
export default useUserDepartmentStore
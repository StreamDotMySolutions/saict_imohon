import { create } from 'zustand'

const categories = {

    refresh: false,
    index_url :  process.env.REACT_APP_BACKEND_URL + '/categories/index?page=1',
    store_url :  process.env.REACT_APP_BACKEND_URL + '/categories/store',
    update_url :  process.env.REACT_APP_BACKEND_URL + '/categories/update',
    delete_url :  process.env.REACT_APP_BACKEND_URL + '/categories/delete',
}
const useCategoryStore = create( () => (categories)) // create store
export default useCategoryStore
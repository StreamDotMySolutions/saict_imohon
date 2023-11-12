import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useInventoryStore  = create((set) => ({

    url: `${base_url}/inventories/?page=1`,
    index_url:  `${base_url}/inventories`,
    store_url:  `${base_url}/inventories`,
    show_url:  `${base_url}/inventories`,
    delete_url:  `${base_url}/inventories`,
    edit_url:  `${base_url}/inventories`,
    refresh: false,
    errors: null,
    latestId: null,
    data: {},
  
}));

export default useInventoryStore;

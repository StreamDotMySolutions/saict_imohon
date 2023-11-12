import { create } from 'zustand'


const base_url = process.env.REACT_APP_BACKEND_URL

const useItemStore = create((set) => ({
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
    
    setValue: (fieldName, value) => {
      set((state) => ({
        data: {
          ...state.data,
          [fieldName]: { value },
        },
      }));
    },
      
    emptyData: () => {
        set({ data: {} });
        set({ errors: {} });
    },

    getValue: (fieldName) => {
        const field = useItemStore.getState().data[fieldName];
        return field ? field.value : null;
    },
}));

export default useItemStore
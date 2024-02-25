import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useStore  = create((set) => ({

    url: `${base_url}/requests`,
    index_url:  `${base_url}/requests`,
    store_url:  `${base_url}/requests`,
    show_url:  `${base_url}/requests`,
    delete_url:  `${base_url}/requests`,
    edit_url:  `${base_url}/requests`,

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

    setError: (fieldName, error) => {
        set((state) => ({
          data: {
            ...state.data,
            [fieldName]: { error },
          },
        }));
    },
      
    emptyData: () => {
        set({ data: {} });
        set({ errors: {} });
    },

    getValue: (fieldName) => {
        const field = useStore.getState().data[fieldName];
        return field ? field.value : null;
    },

}));

export default useStore;

import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useApplicationStore  = create((set) => ({

    url: `${base_url}/applications`,
    index_url:  `${base_url}/applications`,
    delete_url:  `${base_url}/applications`,
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
        const field = useApplicationStore.getState().data[fieldName];
        return field ? field.value : null;
    },
}));

export default useApplicationStore;

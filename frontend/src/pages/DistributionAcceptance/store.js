import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useStore  = create((set) => ({

    url: `${base_url}/distribution-acceptances`,
    index_url:  `${base_url}/distribution-acceptances`,
    store_url:  `${base_url}/distribution-acceptances`,
    show_url:  `${base_url}/distribution-acceptances`,
    destroy_url:  `${base_url}/distribution-acceptances`,
    update_url:  `${base_url}/distribution-acceptances`,

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

    getValue: (fieldName) => {
      const field = useStore.getState().data[fieldName];
      return field ? field.value : null;
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



}));

export default useStore;

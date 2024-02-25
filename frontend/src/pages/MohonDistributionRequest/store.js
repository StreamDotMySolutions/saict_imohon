import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useStore  = create((set) => ({

    url: `${base_url}/mohon-distribution-requests`,
    createUrl: `${base_url}/mohon-distribution-requests`,
    updateUrl: `${base_url}/mohon-distribution`,
    deleteUrl: `${base_url}/mohon-distribution`,
    bossApprovalUrl: `${base_url}/mohon-distribution-requests/by-admin`, // admin requesting to Boss

    submitUrl: `${base_url}/mohon-distribution`,
    mohonUrl: `${base_url}/mohon`,
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

export default useStore

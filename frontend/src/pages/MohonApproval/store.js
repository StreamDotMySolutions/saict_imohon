import { create } from 'zustand'
const base_url = process.env.REACT_APP_BACKEND_URL
const useMohonApprovalStore  = create((set) => ({

    url: `${base_url}/mohon`,
    submitUrl: `${base_url}/mohon-approval`,
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
        const field = useMohonApprovalStore.getState().data[fieldName];
        return field ? field.value : null;
    },

}));
export default useMohonApprovalStore

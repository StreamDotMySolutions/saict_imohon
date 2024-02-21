import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useMohonStore  = create((set) => ({

    url: `${base_url}/mohon`,
    submitUrl: `${base_url}/mohon`,
    mohonApproval: `${base_url}/mohon-approval`,
    managerApprovalUrl: `${base_url}/mohon-approval/by-manager`,
    bossApprovalUrl: `${base_url}/mohon-approval/by-boss`,
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
        const field = useMohonStore.getState().data[fieldName];
        return field ? field.value : null;
    },

}));

export default useMohonStore

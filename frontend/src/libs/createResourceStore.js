import { create } from 'zustand';

/**
 * Factory that creates a standard resource store.
 * Only the URL differs between stores — all CRUD helpers are generated.
 *
 * @param {string} resourceUrl  e.g. `${base_url}/mohon`
 */
export function createResourceStore(resourceUrl) {
  return create((set, get) => ({
    url: resourceUrl,
    submitUrl: resourceUrl,
    data: {},
    errors: {},
    readonly: false,

    setValue: (fieldName, value) =>
      set((state) => ({ data: { ...state.data, [fieldName]: { value } } })),

    setError: (fieldName, error) =>
      set((state) => ({ data: { ...state.data, [fieldName]: { error } } })),

    getValue: (fieldName) => {
      const field = get().data[fieldName];
      return field ? field.value : null;
    },

    emptyData: () => set({ data: {}, errors: {} }),
  }));
}

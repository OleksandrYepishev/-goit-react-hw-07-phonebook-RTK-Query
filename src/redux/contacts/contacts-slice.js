import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

const ContactsFilterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '' },
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { changeFilter } = ContactsFilterSlice.actions;
export const contactsFilterReducer = ContactsFilterSlice.reducer;

export const contactsApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6176c95703178d00173dae80.mockapi.io/api/v1/' }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts']
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contacts']
  }),
      deleteContact: builder.mutation({
      query: (deleteId) => ({
        url: `/contacts/${deleteId}`,
        method: 'DELETE',
        }),
        invalidatesTags: ['Contacts']
    }),
  }),
})

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation
} = contactsApi

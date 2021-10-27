export const getFilter = state => state.contactsFilterReducer.filter;

export const getFilteredContacts = (contacts, filter) => (
  contacts.filter(contact => (
    contact.name.toLowerCase().includes(filter.toLowerCase()))
  ));
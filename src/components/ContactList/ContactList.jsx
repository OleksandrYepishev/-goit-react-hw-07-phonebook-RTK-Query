import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import useDebounce from '../../Hooks/debounce-hook';
import { ContactItem } from './ContactItem';
import {
  getFilter,
  getFilteredContacts,
} from '../../redux/contacts/contacts-selectors';
import { useFetchContactsQuery } from '../../redux/contacts/contacts-slice';
import { List } from './ContactList.styled';

export const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  const filter = useSelector(getFilter);
  const debouncedFilter = useDebounce(filter, 500);

  const filteredContacts = useMemo(() => {
    return contacts && getFilteredContacts(contacts, debouncedFilter);
  }, [contacts, debouncedFilter]);

  return (
    <List>
      {filteredContacts &&
        filteredContacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape()),
};

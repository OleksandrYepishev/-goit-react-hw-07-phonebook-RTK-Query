import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import useDebounce from '../../Hooks/debounce-hook';
import { ContactItem } from './ContactItem';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import { List } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  const filter = useSelector(getFilter);
  const debouncedFilter = useDebounce(filter, 500);

  const getFilteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
    );
  }, [contacts, debouncedFilter]);
  return (
    <List>
      {getFilteredContacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape()),
};

import { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { Form } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container } from '../Container/Container';
import useDebounce from '../../Hooks/debounce-hook';
import { useFetchContactsQuery } from '../../redux/contacts/contacts-slice';
import { Title } from './App.styled';

export const App = () => {
  const { data: contacts } = useFetchContactsQuery();

  const [filter, setFilter] = useState('');

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const debouncedFilter = useDebounce(filter, 500);

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
    );
  };

  // const getFilteredContacts = useMemo(() => {
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
  //   );
  // }, [contacts, debouncedFilter]);

  return (
    <Container>
      <Title>
        Phonebook
        <Form />
      </Title>
      <Title>
        Contacts
        <Filter value={filter} onChange={changeFilter} />
        {contacts && <ContactList contacts={getFilteredContacts()} />}
      </Title>
      <Toaster position="top-right" />
    </Container>
  );
};

import { Toaster } from 'react-hot-toast';
import { Form } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container } from '../Container/Container';
import { Title } from './App.styled';
import { useFetchContactsQuery } from '../../redux/contacts/contacts-slice';

export const App = () => {
  const { data: contacts } = useFetchContactsQuery();
  return (
    <Container>
      <Title>
        Phonebook
        <Form />
      </Title>
      <Title>
        Contacts
        <Filter />
        {contacts && <ContactList contacts={contacts} />}
      </Title>
      <Toaster position="top-right" />
    </Container>
  );
};

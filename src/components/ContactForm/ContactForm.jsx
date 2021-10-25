import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useAddContactMutation } from '../../redux/contacts/contacts-slice';
import { useFetchContactsQuery } from '../../redux/contacts/contacts-slice';
import { ImUsers, ImProfile, ImPhone } from 'react-icons/im';
import { ContactForm, Label, Input, Button } from './ContactForm.styled';
const initialState = { name: '', number: '' };

export const Form = () => {
  const [contactCred, setContactCred] = useState(initialState);
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmit = ({ name, number }) => {
    addContact({ name, number });
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    setContactCred(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name } = contactCred;

    const isDoubleContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isDoubleContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    onSubmit(contactCred);
    toast.success('Контакт добавлен!');
    resetState();
  };

  const resetState = () => {
    setContactCred(initialState);
  };

  return (
    <ContactForm onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <ImProfile style={{ marginLeft: 15 }} />
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={contactCred.name}
          onChange={handleChange}
          id={nameInputId}
        />
      </Label>
      <Label htmlFor={numberInputId}>
        Number
        <ImPhone style={{ marginLeft: 15 }} />
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={contactCred.number}
          onChange={handleChange}
          id={numberInputId}
        />
      </Label>

      <Button type="submit">
        <ImUsers style={{ marginRight: 10 }} />
        {isLoading ? 'Adding contcact..' : 'Add contact'}
      </Button>
    </ContactForm>
  );
};

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContacts: PropTypes.func,
};

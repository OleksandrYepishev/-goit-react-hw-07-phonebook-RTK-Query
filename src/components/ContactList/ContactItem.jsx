import React from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from '../../redux/contacts/contacts-slice';
import { Item, Button } from './ContactList.styled';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <Item key={id}>
      <span>{name}:</span> <span>{number}</span>
      <Button
        type="button"
        onClick={() =>
          deleteContact(id) && toast.success(`Контакт ${name} удален!`)
        }
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

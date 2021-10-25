import PropTypes from 'prop-types';
import { useDeleteContactMutation } from '../../redux/contacts/contacts-slice';
import { List, Item, Button } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <List>
      {contacts &&
        contacts.map(({ id, name, number }) => (
          <Item key={id}>
            <span>{name}:</span> <span>{number}</span>
            <Button type="button" onClick={() => deleteContact(id)}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </Item>
        ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContacts: PropTypes.func,
};

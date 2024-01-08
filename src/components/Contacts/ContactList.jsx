import css from './Contact.module.css';

export const ContactList = ({ handleDeleteContact, searchData }) => {
  return (
    <ul className={css.contactsList}>
      {searchData.map(contact => (
        <li key={contact.id} className={css.contact}>
          {contact.name}: {contact.number}
          <button
            className={css.deleteContactBtn}
            onClick={() => handleDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

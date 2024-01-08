import { useState, useEffect } from 'react';
import { ContactForm } from './Contacts/ContactForm.jsx';
import { ContactList } from './Contacts/ContactList.jsx';
import { Filter } from './Contacts/Filter.jsx';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts') ?? []);
  });
  const [filterData, setFilterData] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(storedContacts);
    parseContacts && setContacts(parseContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = formData => {
    const hasDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicate) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newContact = { ...formData, id: 'id-' + nanoid(2) };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFindChange = e => {
    const value = e.target.value;
    setFilterData(value);
  };

  const filteredContactList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterData.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filterData={filterData} handleFindChange={handleFindChange} />
      <ContactList
        searchData={filteredContactList}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

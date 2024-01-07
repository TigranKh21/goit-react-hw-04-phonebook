import React, { Component } from 'react';
import { ContactForm } from './Contacts/ContactForm.jsx';
import { ContactList } from './Contacts/ContactList.jsx';
import { Filter } from './Contacts/Filter.jsx';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    parseContacts && this.setState({ contacts: parseContacts });
  }

  componentDidUpdate(prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleAddContact = formData => {
    const hasDuplicate = this.state.contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicate) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newContact = { ...formData, id: 'id-' + nanoid(2) };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleFindChange = e => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  render() {
    const filteredContactList = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter state={this.state} handleFindChange={this.handleFindChange} />
        <ContactList
          state={filteredContactList}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

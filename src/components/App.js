import React, {Component} from 'react';
import Section from './Section.js';
import ContactForm from './ContactsForm.js';
import ContactList from './ContactsList.js';
import Filter from './Filter.js';

class App extends Component {
    state = {
      contacts: [],
      filter: "",
    };
  
    componentDidMount(){
      const contacts = localStorage.getItem('contacts');

      if(contacts){
        this.setState({contacts: JSON.parse(contacts)})
      }
    }

    componentDidUpdate(prevProps, prevState){
      const {contacts} = this.state;
      if(prevState.contacts !== contacts){
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    }

    changeHandler = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };
  
    deleteContactbyId = (id) => {
      const { contacts } = this.state;
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      this.setState({
        contacts: [...updatedContacts],
      });
    };
  
    addContact = (contact) => {
      const newName = contact.name;
      const names = this.state.contacts.map((contact) =>
        contact.name.toLowerCase()
      );
      if (names.includes(newName.toLowerCase())) {
          alert(`${newName} is already in contact list`);
      } else {
        this.setState((state) => ({
          contacts: [...state.contacts, contact],
        }));
      }
    };
  
    filterContactsByName = () => {
      const { contacts, filter } = this.state;
      if (contacts.length) {
        return contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
      }
    };
  
    render() {
      const { contacts } = this.state;
      return (
        <>
          <Section title="Phonebook">
            <ContactForm addContact={this.addContact} />
          </Section>
          <Section title="Contacts">
            {contacts.length > 1 && <Filter onChange={this.changeHandler} />}
            {contacts.length ? 
            <ContactList
              contacts={this.filterContactsByName()}
              onDelete={this.deleteContactbyId}
            /> : (<p>There is no contacts</p>)
          }
          </Section>
        </>
      );
    }
  }
  
  export default App;
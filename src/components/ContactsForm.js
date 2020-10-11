import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import styles from './../styles/form.module.css';

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.props.addContact(contact);

    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.mainForm} onSubmit={this.submitHandler}>
        <label className={styles.nameLabel}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            placeholder="enter name..."
            onChange={this.changeHandler}
            id="nameInput"
          />
        </label>

        <label className={styles.numberLabel}>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            placeholder="enter number..."
            onChange={this.changeHandler}
            id="numberInput"
          />
        </label>
        <button type="submit" disabled={!name.length || !number.length}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
export default ContactForm;
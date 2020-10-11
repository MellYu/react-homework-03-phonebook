import React from "react";
import PropTypes from "prop-types";
import styles from './../styles/contactListItem.module.css';

const ContactListItem = ({ name, number, onDelete }) => {
  return (
    <li className={styles.bookItem}>
      <p className={styles.contactName}>
        {name}: {number}
      </p>
      <button className={styles.deleteBtn} type="button" onClick={onDelete}>
        delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
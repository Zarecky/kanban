import React from 'react'
import PropTypes from "prop-types";
import {FaPlus} from "react-icons/fa";
import './AddButton.css';

const AddButton = (props) => (
    <button onClick={props.onClick} className={`addButton`}>
        <FaPlus className={`icon`} style={{marginRight: `8px`}}/>
        {props.value}
    </button>
);

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default AddButton;
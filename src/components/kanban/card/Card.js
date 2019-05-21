import React from 'react';
import PropTypes from "prop-types";
import EditCard from "../edit-card/EditCard";
import './Card.css'

export default class Card extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isEditingCard: false,
            text: props.text
        };

        this.handleToEdit = this.handleToEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleToEdit() {
        this.setState(() => ({isEditingCard: true}));
    }

    handleEdit(text) {
        this.handleCancel();
        this.setState(() => ({text}));
        this.props.onEdit(text);
    }

    handleCancel() {
        this.setState(() => ({isEditingCard: false}))
    }

    render() {
        return !this.state.isEditingCard ?
            <div
                onDoubleClick={this.handleToEdit}
                className={`card`}
            >
                {this.state.text}
            </div> :
            <EditCard
                text={this.state.text}
                onEdit={this.handleEdit}
                onCancel={this.handleCancel}
            />;
    }
}
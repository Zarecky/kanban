import React from 'react';
import PropTypes from 'prop-types';
import AddButton from "../add-button/AddButton";
import EditText from "../edit-text/EditText";

export default class CreateCard extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isAddingCard: false
        };

        this.handleToAddCard = this.handleToAddCard.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleToAddCard() {
        this.setState(() => ({isEditingCard: true}));
    }

    handleAddCard(text) {
        this.handleCancel();
        this.props.onClick(text);
    }

    handleCancel() {
        this.setState(() => ({isEditingCard: false, text: ``}))
    }

    render() {
        return !this.state.isEditingCard ?
            <AddButton
                text={`Добавить еще одну карточку`}
                onClick={this.handleToAddCard}
            /> :
            <EditText
                visibleControls
                useBlurForComplete
                startRows={2}
                placeholder={`Введите название карточки`}
                buttonText={`Добавить карточку`}
                onEdit={this.handleAddCard}
                onCancel={this.handleCancel}
            />
    }
};
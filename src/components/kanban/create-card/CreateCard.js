import React from "react";
import PropTypes from "prop-types";
import AddButton from "../add-button/AddButton";
import EditText from "../edit-text/EditText";

export default class CreateCard extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    onVisibleForm: PropTypes.func,
  };

  state = {
    isAddingCard: false,
  };

  handleToAddCard = () => {
    this.setState(() => ({ isEditingCard: true }));
    if (this.props.onVisibleForm != null) {
      this.props.onVisibleForm();
    }
  };

  handleAddCard = content => {
    this.handleCancel();
    this.props.onCreate(content);
  };

  handleCancel = () => {
    this.setState(() => ({ isEditingCard: false, content: `` }));
  };

  render() {
    return !this.state.isEditingCard ? (
      <AddButton
        value={`Добавить еще одну карточку`}
        onClick={this.handleToAddCard}
      />
    ) : (
      <EditText
        visibleControls
        useBlurForComplete
        cancelOnBlurIfEmpty
        startRows={2}
        placeholder={`Введите название карточки`}
        buttonValue={`Добавить карточку`}
        onEdit={this.handleAddCard}
        onCancel={this.handleCancel}
      />
    );
  }
}

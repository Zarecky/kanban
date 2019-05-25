import React from "react";
import PropTypes from "prop-types";
import EditText from "../edit-text/EditText";
import "./Card.css";
import Cancel from "../cancel/Cancel";
import { Draggable } from "react-beautiful-dnd";

export default class Card extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    innerRef: PropTypes.object,
    cancelMarginBottom: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditingCard: false,
      content: props.content,
    };

    this.handleToEdit = this.handleToEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleToEdit() {
    this.setState(() => ({ isEditingCard: true }));
  }

  handleEdit(content) {
    this.handleCancel();
    this.setState(() => ({ content }));
    this.props.onEdit(this.props.id, content);
  }

  handleCancel() {
    this.setState(() => ({ isEditingCard: false }));
  }

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`card-container`}
          >
            {!this.state.isEditingCard ? (
              <div
                ref={this.props.innerRef}
                onDoubleClick={this.handleToEdit}
                className={`card`}
              >
                {this.state.content}
                <div className={`card-removeBtn`}>
                  <Cancel onClick={() => this.props.onRemove(this.props.id)} />
                </div>
              </div>
            ) : (
              <EditText
                visibleControls
                useBlurForComplete
                cancelOnBlurIfEmpty
                content={this.state.content}
                startRows={2}
                placeholder={`Введите название карточки`}
                buttonValue={`Изменить карточку`}
                onEdit={this.handleEdit}
                onCancel={this.handleCancel}
              />
            )}
          </div>
        )}
      </Draggable>
    );
  }
}

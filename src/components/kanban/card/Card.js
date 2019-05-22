import React from 'react';
import PropTypes from "prop-types";
import EditText from "../edit-text/EditText";
import './Card.css'
import Cancel from "../cancel/Cancel";

export default class Card extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
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

        this.card = React.createRef();

        this.handleToEdit = this.handleToEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.scrollIntoView = this.scrollIntoView.bind(this);
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

    scrollIntoView() {
        this.card.current.scrollIntoView(false);
    }

    render() {
        return (
            <div
                ref={this.card}
                className={`card-container`}>
                {!this.state.isEditingCard ?
                <div
                    onDoubleClick={this.handleToEdit}
                    className={`card`}
                >
                    {this.state.text}
                    <div className={`card-removeBtn`}>
                        <Cancel onClick={() => this.props.onRemove(this.props.id)}/>
                    </div>
                </div> :
                <EditText
                    visibleControls
                    useBlurForComplete
                    text={this.state.text}
                    startRows={2}
                    placeholder={`Введите название карточки`}
                    buttonText={`Добавить карточку`}
                    onEdit={this.handleEdit}
                    onCancel={this.handleCancel}
                />}
            </div>
        )
    }
}
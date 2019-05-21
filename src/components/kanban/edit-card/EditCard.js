import React from 'react';
import PropTypes from 'prop-types';
import Cancel from "../cancel/Cancel";
import TextareaAutosize from 'react-autosize-textarea';

export default class EditCard extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            text: props.text ? props.text : ``
        };

        this.input = React.createRef();

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEdit() {
        if (this.state.text !== ``) {
            this.props.onEdit(this.state.text);
        }
        this.input.current.focus();
    }

    handleChange(e) {
        const text = e.target.value;
        this.setState(() => ({text}));
    }

    handleEnter(e) {
        if (e.key === `Enter`) {
            e.preventDefault();
            this.handleEdit();
        }
    }

    render() {
        return [
            <TextareaAutosize
                ref={this.input}
                rows={2}
                onChange={this.handleChange}
                autoFocus
                className={`input input-textarea`}
                onKeyPress={this.handleEnter}
                placeholder={`Введите название карточки`}
                value={this.state.text}
            />,
            <div className={`add-controls`}>
                <button onClick={this.handleEdit} className={`button`}>
                    Добавить карточку
                </button>
                <Cancel onClick={this.props.onCancel}/>
            </div>]
    }
};
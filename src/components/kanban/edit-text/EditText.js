import React from 'react';
import PropTypes from 'prop-types';
import Cancel from "../cancel/Cancel";
import TextareaAutosize from 'react-autosize-textarea';
import './EditText.css';

export default class EditText extends React.Component {
    static propTypes = {
        visibleControls: PropTypes.bool,
        useBlurForComplete: PropTypes.bool,
        cancelOnBlurIfEmpty: PropTypes.bool,
        text: PropTypes.string,
        startRows: PropTypes.number,
        placeholder: PropTypes.string.isRequired,
        buttonText: PropTypes.string,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        startRows: 1,
        onCancel: () => null
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
        this.handleBlur = this.handleBlur.bind(this);
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

    handleBlur() {
        if (!this.props.useBlurForComplete){
            return;
        }

        if (!this.props.cancelOnBlurIfEmpty) {
            this.handleEdit();
            return;
        }

        if (this.state.text === ``) {
            this.props.onCancel();
        }
    }


    render() {
        return (
            <div className={`editText`}>
                <TextareaAutosize
                    ref={this.input}
                    rows={this.props.startRows}
                    onChange={this.handleChange}
                    autoFocus
                    className={`input`}
                    onKeyPress={this.handleEnter}
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    onBlur={this.handleBlur}
                />
                {this.props.visibleControls ?
                <div className={`add-controls`}>
                    <button onClick={this.handleEdit} className={`button`}>
                        {this.props.buttonText}
                    </button>
                    <Cancel onClick={this.props.onCancel}/>
                </div> : null}
            </div>
        )
    }
};
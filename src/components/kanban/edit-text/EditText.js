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
        content: PropTypes.string,
        startRows: PropTypes.number,
        placeholder: PropTypes.string.isRequired,
        buttonValue: PropTypes.string,
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
            content: props.content ? props.content : ``,
            useBlur: true
        };

        this.input = React.createRef();

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleEdit() {
        console.log('Edit');
        if (this.state.content !== ``) {
            this.props.onEdit(this.state.content);
        }
        this.setState(() => ({useBlur: false}));
    }

    handleChange(e) {
        const content = e.target.value;
        this.setState(() => ({content, cancel: content === ''}));
    }

    handleEnter(e) {
        if (e.key === `Enter`) {
            e.preventDefault();
            this.handleEdit();
        }
    }

    handleBlur() {
        if (this.state.useBlur) {
            if (this.state.content === ``) {
                if (this.props.cancelOnBlurIfEmpty) {
                    console.log('Cancel');
                    this.props.onCancel();
                }
            } else {
                if (this.props.useBlurForComplete) {
                    this.handleEdit()
                }
            }
        } else {
            this.setState(() => ({useBlur: true}))
        }
        this.input.current.focus();
    }


    render() {
        return (
            <div
                className={`editText`}
                style={this.props.style}
            >
                <TextareaAutosize
                    ref={this.input}
                    rows={this.props.startRows}
                    onChange={this.handleChange}
                    autoFocus
                    className={`input`}
                    onKeyPress={this.handleEnter}
                    placeholder={this.props.placeholder}
                    value={this.state.content}
                    onBlur={this.handleBlur}
                />
                {this.props.visibleControls ?
                <div className={`add-controls`}>
                    <button onMouseDown={this.handleEdit} className={`button`}>
                        {this.props.buttonValue}
                    </button>
                    <Cancel onClick={this.props.onCancel}/>
                </div> : null}
            </div>
        )
    }
};
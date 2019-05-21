import React from 'react';
import PropTypes from 'prop-types';

export default class EditTitle extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onAddNewTitle: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e) {
        const title = e.target.value;
        this.setState(() => ({
            title
        }));
    }

    handleEnter(e) {
        if (e.key === `Enter`) {
            this.addNewTitle();
        }
    }

    handleBlur() {
        this.addNewTitle();
    }

    addNewTitle() {
        this.props.onAddNewTitle(this.state.title);
    }

    render() {
        return (
            <input
                onChange={this.handleChange}
                onKeyPress={this.handleEnter}
                onBlur={this.handleBlur}
                className={`input`}
                type="text"
                value={this.state.title}
                placeholder={`Введите название колонки`}
            />
        );
    }
}
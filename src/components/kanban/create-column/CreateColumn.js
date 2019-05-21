import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Add from "../add/Add";
import './CreateColumn.css';

export default class CreateColumn extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isAddingTitle: false
        };

        this.handleAddTitle = this.handleAddTitle.bind(this);
        this.handleAddColumn = this.handleAddColumn.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleAddTitle() {
        this.setState(() => ({isAddingTitle: true}));
    }

    handleAddColumn(title) {
        this.handleCancel();
        this.props.onClick(title);
    }

    handleCancel() {
        this.setState(() => ({isAddingTitle: false, text: ''}))
    }

    render() {
        return (
            <div className={`column`}>
                {!this.state.isAddingTitle ?
                <button onClick={this.handleAddTitle} className={`buttonAddColumn`}>
                    <FaPlus className={`icon`} style={{marginRight: `8px`}}/>
                    Добавить еще оду колонку
                </button> :
                <Add
                    buttonText={`Добавить колонку`}
                    placeholder={`Введите название колонки`}
                    onClick={this.handleAddColumn}
                    onClickCancel={this.handleCancel}
                />}
            </div>
        );
    }
};
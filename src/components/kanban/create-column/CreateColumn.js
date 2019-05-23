import React from 'react';
import PropTypes from 'prop-types';
import AddButton from "../add-button/AddButton";
import EditText from "../edit-text/EditText";

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
        this.setState(() => ({isAddingTitle: false}))
    }


    render() {
        return (
            <div className={`column`}>
                {!this.state.isAddingTitle ?
                <AddButton
                    value={`Добавить еще одну колонку`}
                    onClick={this.handleAddTitle}/> :
                <EditText
                    visibleControls
                    useBlurForComplete
                    cancelOnBlurIfEmpty
                    content={this.state.title}
                    placeholder={`Введите название колонки`}
                    buttonValue={`Добавить колонку`}
                    onEdit={this.handleAddColumn}
                    onCancel={this.handleCancel}
                />}
            </div>
        );
    }
};
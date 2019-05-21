import React from 'react';
import PropTypes from 'prop-types';
import AddButton from "../add-button/AddButton";
import Cancel from "../cancel/Cancel";

export default class CreateColumn extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            title: ``,
            isAddingTitle: false
        };

        this.handleAddTitle = this.handleAddTitle.bind(this);
        this.handleAddColumn = this.handleAddColumn.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleAddTitle() {
        this.setState(() => ({isAddingTitle: true}));
    }

    handleAddColumn() {
        if (this.state.title === ``) return;
        this.handleCancel();
        this.props.onClick(this.state.title);
    }

    handleCancel() {
        this.setState(() => ({isAddingTitle: false, title: ``}))
    }

    handleChange(e) {
        const title =  e.target.value;
        this.setState(() => ({title}))
    }

    handleEnter(e) {
        if (e.key === `Enter`) {
            this.handleAddColumn()
        }
    }

    render() {
        return (
            <div className={`column`}>
                {!this.state.isAddingTitle ?
                <AddButton
                    text={`Добавить еще одну колонку`}
                    onClick={this.handleAddTitle}/> :
                [<input
                    autoFocus
                    type="text"
                    className={`input`}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                    placeholder={`Введите название колонки`}
                    value={this.state.title}
                />,
                <div className={`add-controls`}>
                    <button onClick={this.handleAddColumn} className={`button`}>
                        Добавить колонку
                    </button>
                    <Cancel onClick={this.handleCancel}/>
                </div>
                ]}
            </div>
        );
    }
};
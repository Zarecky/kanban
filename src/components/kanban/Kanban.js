import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Kanban.css';
import CreateColumn from "./create-column/CreateColumn";
import Column from "./column/Column";

export default class Kanban extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            tasks: PropTypes.arrayOf(PropTypes.string)
        }))
    };

    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns ? props.columns : []
        };

        this.handleCreateColumn = this.handleCreateColumn.bind(this);
        this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
    }

    handleCreateColumn(title) {
        const columns = this.state.columns;
        columns.push({id: columns.length, title, tasks: []});
        this.setState(() => ({columns}));
    }

    handleRemoveColumn(id) {
        const columns = this.state.columns;
        columns.splice(id, 1);
        this.setState(() => ({columns}));
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        return (
            <div className={`kanban`}>
                {this.state.columns.map(col => (
                    <Column
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        tasks={col.tasks}
                        onRemove={this.handleRemoveColumn}
                    />
                ))}
                <CreateColumn onClick={this.handleCreateColumn} />
            </div>
        );
    }
}
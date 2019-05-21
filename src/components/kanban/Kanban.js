import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Kanban.css';
import CreateColumn from "./create-column/CreateColumn";
import Column from "./column/Column";

export default class Kanban extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            tasks: PropTypes.arrayOf(PropTypes.string)
        }))
    };

    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns ? props.columns : []
        };

        this.handleCreateColumn = this.handleCreateColumn.bind(this)
    }

    handleCreateColumn(title) {
        const columns = this.state.columns;
        columns.push({id: columns.length, title, tasks: []});
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
                        title={col.title}
                        tasks={col.tasks}
                    />
                ))}
                <CreateColumn onClick={this.handleCreateColumn} />
            </div>
        );
    }
}
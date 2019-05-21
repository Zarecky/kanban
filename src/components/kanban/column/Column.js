import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Column extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        tasks: PropTypes.arrayOf(PropTypes.string),
    };

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title
        };

        this.handleAddingTitle = this.handleAddingTitle.bind(this);
    }

    handleAddingTitle(title) {
        this.setState(() => ({title, initial: false}));
    }

    render() {
        return (
            <div className={`column`}>
                <h2 className={`title`}>{this.state.title}</h2>
            </div>
        );
    }
}
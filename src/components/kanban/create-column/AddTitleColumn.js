import React from 'react';
import PropTypes from 'prop-types';
import {FaCross} from "../../icons";

export default class AddTitleColumn extends React.Component {
    static propTypes = {
        onClickAddTitle: PropTypes.func.isRequired,
        onClickCancel: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(e) {
        const title = e.target.value;
        this.setState(() => ({
            title
        }));
    }

    handleClick() {
        if (this.state.title !== ``) {
            this.props.onClickAddTitle(this.state.title);
        }
    }

    handleEnter(e) {
        if (e.key === `Enter`) {
            this.handleClick();
        }
    }

    render() {
        return [
            <input
                onChange={this.handleChange}
                onKeyPress={this.handleEnter}
                className={`input`}
                type="text"
                value={this.state.title}
                placeholder={`Введите название колонки`}
            />,
            <div className={`addTitle-controls`}>
                <button onClick={this.handleClick} className={`button`}>
                    Добавить колонку
                </button>
                <button
                    style={{display: `flex`, alignItems: 'center'}}
                    onClick={this.props.onClickCancel}
                >
                    <FaCross className={`icon`}/>
                </button>
            </div>
        ];
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import {FaCross} from "../../icons";
import Cancel from "../Cancel/Cancel";

export default class Add extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        buttonText: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        onClickCancel: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(e) {
        const text = e.target.value;
        this.setState(() => ({
            text
        }));
    }

    handleClick() {
        if (this.state.text !== ``) {
            this.props.onClick(this.state.text);
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
                value={this.state.text}
                placeholder={this.props.placeholder}
            />,
            <div className={`addTitle-controls`}>
                <button onClick={this.handleClick} className={`button`}>
                    {this.props.buttonText}
                </button>
                <Cancel onClick={this.props.onClickCancel}/>
            </div>
        ];
    }
}
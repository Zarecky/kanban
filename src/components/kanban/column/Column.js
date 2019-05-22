import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cancel from "../cancel/Cancel";
import './Column.css';
import Card from "../card/Card";
import CreateCard from "../create-card/CreateCard";
import EditText from "../edit-text/EditText";

export default class Column extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object),
        onRemove: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            cards: this.props.cards,
            editTitle: false
        };

        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.handleAddNewTitle = this.handleAddNewTitle.bind(this);
        this.handleAddNewCard = this.handleAddNewCard.bind(this);
        this.handleEditCard = this.handleEditCard.bind(this);
        this.handleRemoveCard = this.handleRemoveCard.bind(this);
    }

    handleEditTitle() {
        this.setState(() => ({editTitle: true}))
    }

    handleAddNewTitle(title) {
        this.setState((prevState) => ({
            editTitle: false,
            title: title.length > 0 ? title : prevState.title
        }));
    }

    handleAddNewCard(text) {
        const cards = this.state.cards;
        cards.push({id: cards.length, text});
        this.setState(() => ({cards}));
    }

    handleEditCard(id, text) {
        const cards = this.state.cards;
        cards[id] = {id, text};
        this.setState(() => ({cards}));
    }

    handleRemoveCard(id) {
        const cards = this.state.cards;
        cards.splice(id, 1);
        this.setState(() => ({cards}));
    }

    render() {
        return (
            <div className={`column`}>
                {this.state.editTitle ?
                <EditText
                    useBlurForComplete
                    placeholder={`Введите навзание колонки`}
                    text={this.state.title}
                    onEdit={this.handleAddNewTitle}
                /> :
                <div className={`title-container`}>
                    <h2
                        onDoubleClick={this.handleEditTitle}
                        className={`title`}>
                        {this.state.title}
                    </h2>
                    <div className={`title-btnRemove`}>
                        <Cancel onClick={() => this.props.onRemove(this.props.id)}/>
                    </div>
                </div>}
                    <div className={`column-wrapper`}>
                        {this.state.cards.map(card => (
                            <Card
                                key={card.id}
                                id={card.id}
                                text={card.text}
                                onEdit={this.handleEditCard}
                                onRemove={this.handleRemoveCard}
                            />
                        ))}
                    </div>
                <CreateCard
                    onClick={this.handleAddNewCard}
                />
            </div>
        );
    }
}
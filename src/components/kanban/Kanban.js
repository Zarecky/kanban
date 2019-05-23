import React, {Component} from 'react';
import './Kanban.css';
import CreateColumn from "./create-column/CreateColumn";
import Column from "./column/Column";
import initialState from "../../initialState"
import Card from "./card/Card";

export default class Kanban extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: initialState.cards,
            columns: initialState.columns,
            columnOrder: initialState.columnOrder
        };

        this.handleCreateColumn = this.handleCreateColumn.bind(this);
        this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
        this.handleEditTitleColumn = this.handleEditTitleColumn.bind(this);
        this.handleEditCard = this.handleEditCard.bind(this);
        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleRemoveCard = this.handleRemoveCard.bind(this);
    }

    handleCreateColumn(title) {
        const columns = this.state.columns;
        const columnOrder = this.state.columnOrder;

        const newColumn = {
            id: `column-${columnOrder.length + 1}`,
            title,
            cardsId: []
        };

        columnOrder.push(newColumn.id);
        columns[newColumn.id] = newColumn;

        this.setState(() => ({columns, columnOrder}));
    }

    handleCreateCard(columnId, content) {
        const cards = this.state.cards;
        const columns = this.state.columns;

        const newCard = {
            id: `card-${Object.keys(cards).length+1}`,
            content
        };
        cards[newCard.id] = newCard;
        columns[columnId].cardsId.push(newCard.id);

        this.setState(() => ({cards, columns}));
    }

    handleEditTitleColumn(title, id) {
        const columns = this.state.columns;
        columns[id].title = title;

        this.setState(() => ({columns}));
    }

    handleRemoveColumn(id) {
        const columns = this.state.columns;
        const columnOrder = this.state.columnOrder;

        columnOrder.splice(columnOrder.indexOf(id), 1);
        delete columns[id];

        this.setState(() => ({columns, columnOrder}));
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    handleEditCard(id, content) {
        const cards = this.state.cards;
        cards[id].content = content;

        this.setState(() => ({cards}));
    }

    handleRemoveCard(id) {
        const cards = this.state.cards;
        const columns = this.state.columns;

        delete cards[id];
        for (let i in columns) {
            const cardId = columns[i].cardsId.indexOf(id);
            if (cardId >= 0) {
                columns[i].cardsId.splice(cardId, 1);
            }
        }

        this.setState(() => ({cards, columns}));
    }

    render() {
        return (
            <div className={`kanban`}>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const cards = column.cardsId.map(cardId => this.state.cards[cardId]);

                    return (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            cards={cards}
                            onEditTitle={this.handleEditTitleColumn}
                            onRemove={this.handleRemoveColumn}
                            onCreateCard={this.handleCreateCard}
                            lastCard={this.lastCard}
                        >
                            {cards.map(card => (
                                <Card
                                    key={card.id}
                                    id={card.id}
                                    content={card.content}
                                    onEdit={this.handleEditCard}
                                    onRemove={this.handleRemoveCard}
                                />
                            ))}
                        </Column>
                    )
                })}
                <CreateColumn onClick={this.handleCreateColumn} />
            </div>
        );
    }
}
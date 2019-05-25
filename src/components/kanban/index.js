import React, { Component } from "react";
import "./index.css";
import CreateColumn from "./create-column/CreateColumn";
import Column from "./column/Column";
import initialState from "../../initialState";
import Card from "./card/Card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default class Kanban extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: initialState.cards,
      columns: initialState.columns,
      columnOrder: initialState.columnOrder,
    };

    this.handleCreateColumn = this.handleCreateColumn.bind(this);
    this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
    this.handleEditTitleColumn = this.handleEditTitleColumn.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleCreateColumn(title) {
    const columns = Object.assign(this.state.columns);
    const columnOrder = Array.from(this.state.columnOrder);

    const newColumn = {
      id: `column-${columnOrder.length + 1}`,
      title,
      cardIds: [],
    };

    columnOrder.push(newColumn.id);
    columns[newColumn.id] = newColumn;

    const newState = {
      ...this.state,
      columns,
      columnOrder,
    };
    this.setState(() => newState);
  }

  handleCreateCard(columnId, content) {
    const cards = Object.assign(this.state.cards);
    const columns = Object.assign(this.state.columns);

    const newCard = {
      id: `card-${Object.keys(cards).length + 1}`,
      content,
    };
    cards[newCard.id] = newCard;
    columns[columnId].cardIds.push(newCard.id);

    const newState = {
      ...this.state,
      columns,
      cards,
    };
    this.setState(() => newState);
  }

  handleEditTitleColumn(title, id) {
    const columns = Object.assign(this.state.columns);
    columns[id].title = title;

    const newState = {
      ...this.state,
      columns,
    };
    this.setState(() => newState);
  }

  handleRemoveColumn(id) {
    const columns = Object.assign(this.state.columns);
    const columnOrder = Array.from(this.state.columnOrder);

    columnOrder.splice(columnOrder.indexOf(id), 1);
    delete columns[id];

    const newState = {
      ...this.state,
      columns,
      columnOrder,
    };
    this.setState(() => newState);
  }

  handleEditCard(id, content) {
    const cards = Object.assign(this.state.cards);
    cards[id].content = content;

    const newState = {
      ...this.state,
      cards,
    };
    this.setState(() => newState);
  }

  handleRemoveCard(id) {
    const cards = Object.assign(this.state.cards);
    const columns = Object.assign(this.state.columns);

    for (let i in columns) {
      const cardId = columns[i].cardIds.indexOf(id);
      if (cardId >= 0) {
        columns[i].cardIds.splice(cardId, 1);
      }
    }

    delete cards[id];

    const newState = {
      ...this.state,
      columns,
      cards,
    };
    this.setState(() => newState);
  }

  handleDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === `column`) {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      this.setState(() => ({
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const startColumn = this.state.columns[source.droppableId];
    const finishColumn = this.state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(() => newState);
      return;
    }

    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      cardIds: finishCardIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    this.setState(() => newState);
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable
          droppableId={`kanban`}
          direction={`horizontal`}
          type={`column`}
        >
          {provided => (
            <div
              className={`kanban`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const cards = column.cardIds.map(
                  cardId => this.state.cards[cardId]
                );

                return (
                  <Column
                    index={index}
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    cards={cards}
                    onEditTitle={this.handleEditTitleColumn}
                    onRemove={this.handleRemoveColumn}
                    onCreateCard={this.handleCreateCard}
                  >
                    {cards.map((card, index) => (
                      <Card
                        index={index}
                        key={card.id}
                        id={card.id}
                        content={card.content}
                        onEdit={this.handleEditCard}
                        onRemove={this.handleRemoveCard}
                      />
                    ))}
                  </Column>
                );
              })}
              {provided.placeholder}
              <CreateColumn onClick={this.handleCreateColumn} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

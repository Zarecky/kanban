import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cancel from "../cancel/Cancel";
import './Column.css';
import CreateCard from "../create-card/CreateCard";
import EditText from "../edit-text/EditText";
import {Draggable, Droppable} from "react-beautiful-dnd";

export default class Column extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onRemove: PropTypes.func.isRequired,
        onEditTitle: PropTypes.func.isRequired,
        onCreateCard: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            editTitle: false
        };

        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.handleAddNewTitle = this.handleAddNewTitle.bind(this);
        this.handleCreateCard = this.handleCreateCard.bind(this);
    }

    handleEditTitle() {
        this.setState(() => ({editTitle: true}))
    }

    handleAddNewTitle(title) {
        this.setState(() => ({
            editTitle: false
        }));
        this.props.onEditTitle(title, this.props.id);
    }

    handleCreateCard(content) {
        this.props.onCreateCard(this.props.id, content);
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.id}
                index={this.props.index}
            >
                {(outerProvided) => (
                    <div
                        className={`column-wrapper`}
                        {...outerProvided.draggableProps}
                        ref={outerProvided.innerRef}
                    >
                        <Droppable
                            droppableId={this.props.id}
                            type={`card`}
                        >
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`column`}>
                            {this.state.editTitle ?
                                <EditText
                                    useBlurForComplete
                                    cancelOnBlurIfEmpty
                                    placeholder={`Введите навзание колонки`}
                                    content={this.props.title}
                                    onEdit={this.handleAddNewTitle}
                                    onCancel={() => this.setState(() => ({editTitle: false}))}
                                /> :
                                <div
                                    {...outerProvided.dragHandleProps}
                                    className={`title-container`}>
                                    <h2
                                        onDoubleClick={this.handleEditTitle}
                                        className={`title`}>
                                        {this.props.title}
                                    </h2>
                                    <div className={`title-btnRemove`}>
                                        <Cancel onClick={() => this.props.onRemove(this.props.id)}/>
                                    </div>
                                </div>}
                                    <div
                                        className={`column-cardsContainer`}
                                    >
                                        {this.props.children}
                                        {provided.placeholder}
                                    </div>
                            <CreateCard
                                onClick={this.handleCreateCard}
                            />
                        </div>)}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        );
    }
}
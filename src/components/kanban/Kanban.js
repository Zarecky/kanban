import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Kanban.css';
import CreateColumn from "./create-column/CreateColumn";
import Column from "./column/Column";

export default class Kanban extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            cards: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })).isRequired
        }))
    };

    static defaultProps = {
        columns: [
            {
                id: 0,
                title: `План на месяц`,
                cards: [
                    {
                        id: 0,
                        text: `Пройти курс по React`
                    },
                    {
                        id: 1,
                        text: `Отметить день рождения`
                    },
                    {
                        id: 2,
                        text: `Записаться на курсы английского языка, чтобы уехать жить в Лондон`
                    },
                    {
                        id: 3,
                        text: `Сделать бекенд своего сайта на node.js`
                    },
                    {
                        id: 4,
                        text: `Собрать портфолио`
                    },
                    {
                        id: 5,
                        text: `Написать первую статью в блог`
                    },
                    {
                        id: 6,
                        text: `Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.`
                    },
                    {
                        id: 7,
                        text: `Нет, я серьезный человек, иду в мотошколу. Записываюсь!`
                    },
                    {
                        id: 8,
                        text: `Сделать бекенд своего сайта на node.js`
                    },
                    {
                        id: 9,
                        text: `Собрать портфолио`
                    },
                    {
                        id: 10,
                        text: `Написать первую статью в блог`
                    },
                    {
                        id: 11,
                        text: `Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.`
                    },
                    {
                        id: 12,
                        text: `Нет, я серьезный человек, иду в мотошколу. Записываюсь!`
                    }
                ]
            },
            {
                id: 1,
                title: `План на день`,
                cards: [
                    {
                        id: 0,
                        text: `Записаться на курс по React`
                    },
                    {
                        id: 1,
                        text: `Забронировать тир на субботу`
                    },
                    {
                        id: 2,
                        text: ` Накидать тем для статей в блог`
                    }
                ]
            },
        ]
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
        columns.push({id: columns.length, title, cards: []});
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
                        cards={col.cards}
                        onRemove={this.handleRemoveColumn}
                    />
                ))}
                <CreateColumn onClick={this.handleCreateColumn} />
            </div>
        );
    }
}
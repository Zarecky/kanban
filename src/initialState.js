const initialState = {
    cards: {
        'card-1': {
            id: 'card-1',
            content: `Пройти курс по React`
        },
        'card-2': {
            id: 'card-2',
            content: `Отметить день рождения`
        },
        'card-3': {
            id: 'card-3',
            content: `Записаться на курсы английского языка, чтобы уехать жить в Лондон`
        },
        'card-4': {
            id: 'card-4',
            content: `Сделать бекенд своего сайта на node.js`
        },
        'card-5': {
            id: 'card-5',
            content: `Собрать портфолио`
        },
        'card-6': {
            id: 'card-6',
            content: `Написать первую статью в блог`
        },
        'card-7': {
            id: 'card-7',
            content: `Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.`
        },
        'card-8': {
            id: 'card-8',
            content: `Нет, я серьезный человек, иду в мотошколу. Записываюсь!`
        },
        'card-9': {
            id: 'card-9',
            content: `Записаться на курс по React`
        },
        'card-10': {
            id: 'card-10',
            content: `Забронировать тир на субботу`
        },
        'card-11': {
            id: 'card-11',
            content: ` Накидать тем для статей в блог`
        }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: `План на месяц`,
            cardIds: [
                'card-1',
                'card-2',
                'card-3',
                'card-4',
                'card-5',
                'card-6',
                'card-7',
                'card-8'
            ]
        },
        'column-2': {
            id: 'column-2',
            title: `План на день`,
            cardIds: [
                'card-9',
                'card-10',
                'card-11'
            ]
        },
    },
    columnOrder: ['column-1', 'column-2']
};

export default initialState;
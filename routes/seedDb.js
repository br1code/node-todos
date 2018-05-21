const express = require('express');
const Todos = require('../models/todoModel');

const Router = express.Router();

Router.get('/api/seed', (req, res) => {
    var starterTodos = [
        {
            username: 'test',
            todo: 'Learn more nodejs',
            isDone: false,
            hasAttachment: false
        },
        {
            username: 'test',
            todo: 'Make a portfolio',
            isDone: false,
            hasAttachment: false
        },
        {
            username: 'test',
            todo: 'Learn angular',
            isDone: false,
            hasAttachment: false
        },
        {
            username: 'test',
            todo: 'Learn css rwd',
            isDone: false,
            hasAttachment: false
        }
    ];
    Todos.create(starterTodos, (err, todos) => {
        if (err) {
            res.send('Unable to connect to DB');
        }
        res.send(todos);
    });
});

module.exports = Router;
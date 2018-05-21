const express = require('express');
const bodyParser = require('body-parser');
const Todos = require('../models/todoModel');

const Router = express.Router();

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));

Router.get('/todos/:username', (req, res) => {
    Todos.find({username: req.params.username}, (err, todos) => {
        if (err || !todos.length) {
            return res.send('Unable to find Todos of that username');
        }
        res.send(todos);
    });
});

Router.get('/todo/:id', (req, res) => {
    Todos.findById(req.params.id, (err, todo) => {
        if (err) {
            return res.send('Unable to find that Todo');
        }
        res.send(todo);
    });
});

Router.post('/todo', (req, res) => {
    // if the Todo already exists, update it
    if (req.body.id) {
        Todos.findByIdAndUpdate(req.body.id, {
            todo: req.body.todo,
            isDone: req.body.isDone,
            hasAttachment: req.body.hasAttachment
        }, (err, todo) => {
            if (err) {
                return res.send('Unable to update the Todo');
            }
            res.send('The Todo has been updated correctly');
        });
    } else {
        // otherwise, create a new one and save it
        var newTodo = Todos({
            username: 'test',
            todo: req.body.todo,
            isDone: req.body.isDone,
            hasAttachment: req.body.hasAttachment
        });
        newTodo.save((err) => {
            if (err) {
                return res.send('Unable to create the Todo');
            }
            res.send('The Todo has been created correctly');
        });
    }
});

Router.delete('/todo', (req, res) => {
    Todos.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            return res.send('Unable to delete that Todo');
        }
        res.send('The Todo has been deleted correctly');
    });
});

module.exports = Router;
const express = require('express');
const mongoose = require('mongoose');
const Todos = require('./models/todoModel');

const app = express();

const port = process.env.PORT || 3000;

const todosRoutes = require('./routes/todos');

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_PATH || 'mongodb://localhost/node_todo');

app.use(todosRoutes);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
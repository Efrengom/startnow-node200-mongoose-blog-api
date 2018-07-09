const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost/my-blog';

mongoose.connect(process.env.MLAB/*url, { useMongoClient: true }*/);

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));

app.use('/api/users/:id', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));

app.use('/api/blogs/featured', require('./routes/blogs'));

app.use('/api/blogs/:id', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send();
});

module.exports = app;
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const app = express();

const indexRouter = require('./routes');
const victimsRouter = require('./routes/victims');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use('/', indexRouter);
app.use('/victims', victimsRouter);

app.listen(config.PORT);

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  console.log(`App running on Port: ${config.PORT}`);
});

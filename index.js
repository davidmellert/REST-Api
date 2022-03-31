const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () =>{console.log(`Server listens on port ${port}...`)});

/*
app.set('view engine', 'pug');
app.set('views', './views');




app.get('/', (req, res) =>{
    res.render('index', {title: 'My Expess App', message: 'Hello', information: 'This website is superior'});     
});
*/

/*const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const authenticator = require('./authenticator');*/

/*app.use(express.static('public'));
app.use(helmet());

app.use(logger);

app.use(authenticator);

app.use(morgan('short'));*/

/*
//DB work
dbDebugger('Connected to the database...');
startupDebugger("Started startup");

console.log(process.env.NODE_ENV);

//Configuration
console.log('Application Name ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));
*/
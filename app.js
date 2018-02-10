var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');  
var users = require('./routes/users');
var jobs = require('./routes/jobs');

var app = express();
var db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'));  


app.use('/api/v1/users', users);
app.use('/api/v1/jobs', jobs);

module.exports = app;

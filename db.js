var mongoose = require('mongoose');
var dbConfig = require('./config/dbConfig');

mongoose.connect(dbConfig.url);
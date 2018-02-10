var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    title: String,
    content: String,
    url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
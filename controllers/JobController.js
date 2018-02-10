var Job = require('../models/Job');

exports.findAll = function(req, res) {
    Job.find(function(err, jobs) {
        if (err) {
            res.status(500).send({ message: "Some error ocuured while retrieving jobs." });
        } else {
            res.send(jobs);
        }
    });
};
var express = require('express');
var router = express.Router();
var jobs = require('../controllers/JobController');

router.get('/', function (req, res) {
    res.json({ jobs: [{ title: 'Timmy' }] });
});

module.exports = router;
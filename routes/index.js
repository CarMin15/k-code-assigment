var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  var channelStr = fs.readFileSync(path.resolve(__dirname, '../data/channel.json'));
  res.render('index', { title: 'Kaplan channel', channelStr: channelStr });
});

module.exports = router;

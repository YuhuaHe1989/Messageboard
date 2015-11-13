'use strict';

var express = require('express');
var router = express.Router();

var message = require('../models/message');

router.get('/', function(req, res) {
  message.find({}, function(err, messages){
    if(err) console.log("OH NO AN ERROR: ", err);
    res.render("messageboard", {messages: messages}) 
  });
});

router.post('/', function(req, res) {
    var dataRec = req.body.data;
    var msg = new message();
    
    msg.name = dataRec.name;
    msg.message = dataRec.message;
    msg.time = dataRec.time;

    msg.save(function(err, savedMessage){
      res.status(err ? 400 : 200).send( err || savedMessage);
    });
});

router.post('/edit', function(req, res) {
  var revise = req.body.edit;

  message.update({time:revise.origtime},revise, function(err, messages){
    if(err) console.log("OH NO AN ERROR: ", err);

    res.send(messages);
  });
});

module.exports = router;

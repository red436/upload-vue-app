var mongoose = require('mongoose');
var Note = require('../models/note');
var axios = require('axios');

var apiController = Object();

apiController.notes = function(req, res, next)
{
   if(req.body.time != '' && req.body.note != '')
   {
      console.log(req.body);
      var clientIP = req.get('X-Real-IP');
      Note.create({time: req.body.time, note: req.body.note, ip: clientIP})
        .then(() => { console.log("Made a note!"); res.send({ message: "Message recived! Thanks!" }); })
        .catch((err) => { console.log("Sorry there was an error: " + err); res.send({ message: "Error! " + err }); });
      axios.post('https://api.pushbullet.com/v2/pushes', { active: true, email: process.env.PUSHBULLET_EMAIL, type: 'note', title: 'New website note', body: 'Note: ' + req.body.note + ' IP: ' + clientIP + ' Time: ' + req.body.time },{ headers: {'Access-Token': process.env.PUSH_BULLET_TOKEN }})
        .then((res) => { console.log(res.data); })
        .catch((err) => { console.log(err); });  
   }
   else
   {
      console.log("Notes form missing fields!");
      console.log(req.body);
      res.send({ message: "Error! Missing fields" });
   }
}

module.exports = apiController;

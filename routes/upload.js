var express = require('express');
var router = express.Router();
const multer =require('multer');
const upload = multer({dest: 'uploads/'});
var axios = require('axios');

router.post('/', upload.single('video'), (req, res, next) => {
   var IP = req.get('X-Real-IP');
   res.send({"message": "Your upload was a success"});
   axios.post('https://api.pushbullet.com/v2/pushes', { active: true, type: 'note', title: 'New video upload', body: 'New video notification, IP: ' + IP, email: 'redbeard.436@gmail.com'}, { headers: {'Access-Token' : '' }})
      .then((res) => { console.log(res.data); })
      .catch((err) => { console.log(err); });
});

module.exports = router;

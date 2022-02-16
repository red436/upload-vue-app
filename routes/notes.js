var express = require('express');
var router = express.Router();
var api = require("../controllers/APIcontroller.js");

/* POST notes listing. */
router.post('/', api.notes);

module.exports = router;

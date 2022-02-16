var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
   time: String,
   ip: Array,
   note: String
});

module.exports = mongoose.model('Notes', NoteSchema);

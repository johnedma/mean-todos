var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  description:{
    type: String,
    required: true
  }
});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;

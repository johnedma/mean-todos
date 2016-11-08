var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  description:{
    type: String,
    required: true
  }
});

var Todo = mongoose.model('Todo', todoSchema); //this line tells mongoose, grab these todo var and make them in your model
module.exports = Todo;

var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.model.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/todos', function(req, res){
  Todo.find({}, function(err, foundTodos){ //searches for db, if found names it foundTodos and send as oject
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      todos: foundTodos
    });
  });
});
router.get('/todos/:id', function(req,res){
  Todo.find({_id: req.params.id}, function(err, foundTodo){ //searches for db, if found reqparam(actual id) it foundTodo and send as oject
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      todos: foundTodo
    });
  });
});
router.post('/todos', function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err){
    if(err){
      // throw err; DONT DO THIS
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json({
      msg: 'successfully created todo'
    });
  });
});
router.put('/todos/:id', function(req, res){
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldTodo){
    if(err){
      res.status(500).json({
        err: err
      });
      next(); //stops the app from running further in the function and crashing app

    }
    res.status(200).json({
      msg: oldTodo
    });
  });
});
router.delete('/todos/:id', function(req,res, next){
  Todo.findOneAndRemove({_id: req.params.id }, function(err, deletedTodo){
    if (err) {
      return res.status(500).json({ //if there is an error "return" stops the function running as it's true
        err: err
      });
    }
    return res.status(200).json({
      msg: deletedTodo
    });
  });
});

router.get('/todos/description/:desc', function(req, res){
  Todo.find({description: req.params.desc }, function(err, foundTodos){
    if(err){
      res.status(500).json({
        err: err
      });
    } else { //another function to end function so app wont crash
      res.status(200).json({
        msg: foundTodos
      });
    }
  });
});

//3 ways to kill were added because mongoose will occassionaly try to send both msgs and crash app

module.exports = router;


(function() {
  angular.module('mean-todos')
        .factory('TodoService', TodoService);

  TodoService.$inject = ['$http'];

  function TodoService($http){ //all data will be held here
    init(); //even if you create the function below, it still needs to be called for the computer to understand it needs to run it
    function init(){//init needs to be done here, before return because it needs to run before we start returning information
      $http.get("/todos")
            .then(function(response){
              todos = response.data.todos; //we named the array todos below, init was created after but needed to be put before returns
            })
            .catch(function(err){
              console.log(err);
            });
    }//allows us to initialize service
    var todos = []; //var to hold the todos which will be an array
    return{ //internal definitions on right, global on left
      get: getAllTodos,
      create: createOneTodo,
      update: updateOneTodo,
      delete: deleteOneTodo
    };


    function getAllTodos(){
      return todos;// all this function does is return todos
    }
    function createOneTodo(todo){
      $http.post('/todos', todo)
          .then(function(response){
            todos.push(todo);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function updateOneTodo(index, todo){
      $http.put('/todos/' + updatedTodo._id, updatedTodo)
          .then(function(){
            todos.splice(index, 1, updatedTodo);
          })
          .catch(function(err){
            console.log(err); //not for fully produced application, only for internal. DONT LEAVE IN for ppl to poke around
          });
    }
    function deleteOneTodo(index){}
    return {

    };
  }
}());

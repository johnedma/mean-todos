
(function() {
  angular.module('mean-todos') //getter syntax
  .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'TodoService']; //what tools the MainController function needs

  function MainController($scope, TodoService){ //$scope is our bridge to the dom
    $scope.todos = TodoService.get();
    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.editTodo = editTodo;
    $scope.saveTodo = saveTodo;

    $scope.$watch(function(){ //keep watch functions to a minimum
      return TodoService.get();
    }, function(){
      $scope.todos = TodoService.get();
    });
    function createTodo(newTodo){
      TodoService.create(newTodo);
      $scope.newTodo = '';
    }
    function deleteTodo(index){
      TodoService.delete(index);
    }
    function editTodo(todo){
      todo.isBeingEdited = true;
    }
    function saveTodo(index, todo){
      TodoService.update(index, todo); //removed desc because data stuff has been delegated to service file
      todo.isBeingEdited = false;
    }

  }
}());

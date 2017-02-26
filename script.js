//an object is created which stores all applications main functions
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    //the parameter pushes an object with 2 properties 
    //where the parameter becomes the value for the property todoText
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, changeText) {
    this.todos[position].todoText = changeText;
  },
  deleteTodo: function(position) {
    //grab position parameter and always delete one item at a time
    this.todos.splice(position,1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    //if completed is false make it true and vice versa
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //get number of completed todos
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    if (completedTodos === totalTodos) {
      //if everything is true, make everything false
      for (var j = 0; j < totalTodos; j++) {
        this.todos[j].completed = false;
      }
    } else {
      //if everything is false, make everything true
      for (var k = 0; k < totalTodos; k++) {
        this.todos[k].completed = true;
      }
    }
  }
};

// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');

// displayTodosButton.addEventListener('click', function() {
//   todoList.displayTodos();
// });

// toggleAllButton.addEventListener('click', function() {
//   todoList.toggleAll();
// });
//the above code while working can become repetitive
//below is the refactored version of the code above

//below another object is created that handles all the user interface interaction
//of our functions from above
//this version allows us to use the onclick attribute in our HTML 
//as opposed to using an id attribute like in the version above.
var handlers = {
  addTodo: function() {
    //grab the input by it's id attribute and store them into a variable
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    
    //the addTodo function adds the input's value using it's value property
    todoList.addTodo(addTodoTextInput.value);
    
    //set the inputs value to an empty string so that it clears it after adding values
    addTodoTextInput.value = '';
    
    //because our view object handles the displayTodos function now we can add
    //in the view object's version of the displayTodos function and we add this 
    //in the handlers object since we need to see the results in the UI now as 
    //opposed to seeing it in the console. we can also delete the console's version
    //of the displayTodos function everywhere else and also the displayTodos button
    //from our HTML *look at previous versions if you need to see for reference
    view.displayTodos();
  },
  changeTodo: function() {
    //grab both inputs by their id attributes and store them into a variable
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    
    //the changeTodo function takes both inputs values using their value and valueAsNumber properties
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    
    //set the inputs value to an empty string so that it clears after adding values
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

//the object created below handles the output of the interaction on to the 
//user interface as opposed to looking at the console for the output
var view = {
  displayTodos: function() {
    //grab a reference to the ul element in the DOM
    var todosUl = document.querySelector('ul');
    
    //clear the ul element of any previous inner HTML when the function is run again
    todosUl.innerHTML = '';
    
    //loops through the todoList objects todos property
    for (var i = 0; i < todoList.todos.length; i++) {
      //create li elements
      var todoLi = document.createElement('li');
      
      //while optional creating the variable below saves typing, we store each
      //item from the array that comes out from the for loop into the variable
      var todo = todoList.todos[i];
      
      //create a variable with an empty string that will soon combine the 
      //todoText and the completion marks
      var todoTextWithCompletion = '';
      
      //run an if/else statment to see if it was completed and have it 
      //show with the todoText property of each array item that comes from 
      //the for loop
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      //sets the todoLi textContent property to todoTextWithCompletion
      todoLi.textContent = todoTextWithCompletion
      
      //append the li elements into the ul
      todosUl.appendChild(todoLi)
    }
  }
};







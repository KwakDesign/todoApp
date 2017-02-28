var todoList = {
  todos: [],
  addTodo: function(todoText) {
    //by passing in an object into the push method's parameter we push an object into the todos array with 2 properties
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, changeText) {
    //the first argument is the the item in the arrays position and we grab it's todoText property and update it with the second argument which changes it.
    this.todos[position].todoText = changeText;
  },
  deleteTodo: function(position) {
    //using the splice method we pass the position argument to find which position the item in the todos array we are trying to delete. the second parameter is set to 1 because we are deleting one item at a time.
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    //store the todos items position into a new variable for ease of use and typing.
    var todo = this.todos[position];
    //we use the bang operator to switch the completed property's true or false value back and forth.
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos by using a for loop to go through each item in the todos array and check each one's completed property and if it's true we add in 1 to the completedTodos variable.
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    
    //if completedTodos equals totalTodos we check for case 1 otherwise we check for case 2
    if (completedTodos === totalTodos) {
      // Case 1: If everything’s true, make everything false.
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      // Case 2: Otherwise, make everything true.
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }      
    }
  }
};

var handlers = {
  addTodo: function() {
    //the document getElementById method allows us to grab the element with the id used in the DOM.
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    //using the function we add the value property of the element
    todoList.addTodo(addTodoTextInput.value);
    //we set the value to an empty string here because we want it to clear after each use of the this function
    addTodoTextInput.value = '';
    //the displayTodos function moved from the todoList object into the view object and since we no longer need to call this function from the console we add it in each handlers method.
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    //we use valueAsNumber for a number input and value for a string input
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
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

var view = {
  displayTodos: function() {
    //using the querySelector we grab a reference to the ul on the DOM.
    var todosUl = document.querySelector('ul');
    //we need to clear the ul element each time we call the displayTodo and make sure it starts from zero and adds the correct number of items that should display.
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      //this saves us some typing time.
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      //we are grabbing each items position from the for loop so that is why we are able to set the id property to i.
      //id property unlike the class property is unique to each one so there is only one id of position i e.g. id='0', id='1' and so forth.
      //we do this so that when we click on the delete button it will look at the id of the list item and make sure to delete the correct id position item.
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      //we append the delete button to each list item that gets created.
      todoLi.appendChild(this.createDeleteButton());
      //we append the list item to the ul. 
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //because there will be mulitple delete buttons being created we use the className property and assign a class name to each delete button that's created.
    deleteButton.className = 'deleteButton';
    //we want to return the button so that we can use it elsewhere. 
    return deleteButton;
  }
};




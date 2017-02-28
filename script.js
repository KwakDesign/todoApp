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
    //the forEach function will run the anonymous callback function on each todo which is each element inside the todos array.
    //instead of writing a for loop and using bracket notation for each todo element which could be more complex to understand and write 
    //we simplified it here using the forEach method.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    //we updated the for loop version into a forEach method version
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        // Case 1: If everything’s true, make everything false.
        todo.completed = false;
      } else {
        // Case 2: Otherwise, make everything true.
        todo.completed = true;
      }
    });
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
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
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
    
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      //when the forEach method runs the callback functionthe first parameter it passes is the each element in the array(i.e. todo). there is a second parameter that is passed in
      //which is the position of that element(i.e. position). you can say it is equivalent to position of the element in the array 'i' that we'd expect from a for loop
      //that we'd use in bracket notation for position e.g. todoList.todosp[i]. we can call that parameter anything but in our case we will call it position
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      //we append the delete button to each list item that gets created.
      //the keyword this won't work here unless we pass in the second optional 'this' parameter to the callback. because the callback is not directly on the view object 
      //like how the displayTodos function is. so when inside the displayTodos method the keyword this will refer to the view object but not for the callback function.
      //the keyword this below is inside the callback function so in order for it to refer to the view object 
      //we must pass in the second optional parameter 'this' to the callback function. ex. forEach(callback, this)
      todoLi.appendChild(this.createDeleteButton());
      //we append the list item to the ul. 
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //because there will be mulitple delete buttons being created we use the className property and assign a class name to each delete button that's created.
    deleteButton.className = 'deleteButton';
    //we want to return the button so that we can use it elsewhere. 
    return deleteButton;
  },
  setUpEventListeners: function() {
    //instead of adding an eventListener on every delete button we can add a single eventListener to the ul element which encapsulates all the li elements.
    var todoUl = document.querySelector('ul');
    
    todoUl.addEventListener('click', function(event) {
      //whenever something on the ul is clicked like the delete button you can look at the event object to figure out what element was clicked on
      var elementClicked = event.target;
      //if the clicked on element is the delete button then we run the handlers delete todo method
      if (elementClicked.className === 'deleteButton') {
        //first we get the element clicked which is the delete button then we look at it's parent element which is the li element which then has the position id
        //but since this is a string we pass it in the parseInt function to turn it into a number which we then pass into the handlers.deleteTodo method.
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

//we run the setUpEventListeners function to get it working.
view.setUpEventListeners();




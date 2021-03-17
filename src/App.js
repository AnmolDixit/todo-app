import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  toggleTodo(todoId) {
    const todos = this.state.todos;
    for (const t of todos) {
      if (t.id === todoId) t.completed = !t.completed;
    }
    this.setState({ todos: todos });
  }

  deleteTodo(todoId) {
    const todos = [];
    for (const t of this.state.todos){
      if(t.id !== todoId){
        todos.push(t);
      }
    }
    this.setState({ todos });
  }

  renderToDo(todo) {
    return (
      <>
        <div>{todo.task}</div>
        <span>Is to do completed? - {todo.completed.toString()}</span>
        <button onClick={() => this.toggleTodo(todo.id)}>Check</button>
        <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
      </>
    );
  }

  renderToDoList() {
    return (
      <>
      <div>
        {this.state.todos.map(todo => this.renderToDo(todo))}
      </div>
      </>
    )
  }

  getNumberOfPendingTasks () {
    let counter=0;
    for (const t1 of this.state.todos) {
      if(t1.completed === false) counter++;
    }
    return counter;
  }

  addNewTask() {
    const todos = this.state.todos;
    const newToDo = {
      task: "",
      completed: false,
      id: nanoid()
    };
    newToDo.task = `Task ${this.state.todos.length + 1}`;
    console.log('New to do is: ', newToDo);
    todos.push(newToDo);
    this.setState({ todos });
  }

  render() {
    return (
      <div>
        <h1>To Do App</h1>
        <h2>Total Number of Tasks: {this.state.todos.length}</h2>
        <h2>Pending Tasks: {this.getNumberOfPendingTasks()}</h2>
        {this.renderToDoList()}
        <button onClick={() => this.addNewTask()}>Add New Task</button>
      </div>
    );
  }
}

export default App;

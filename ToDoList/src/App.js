import React, { Component } from "react";
import "./App.css";

class App extends Component {

  state = {
    todos: [],
    newTask: "",
    newDesc: ""
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  addTask = (event) => {
    event.preventDefault();

    const { newTask, newDesc, todos } = this.state;

    const taskObject = {
      id: Date.now(),
      taskName: newTask,
      taskDescription: newDesc
    };

    this.setState({
      todos: [...todos, taskObject],
      newTask: "",
      newDesc: ""
    });
  };

  removeTask = (taskId) => {
    const updatedList = this.state.todos.filter(
      (item) => item.id !== taskId
    );

    this.setState({
      todos: updatedList
    });
  };

  render() {

    const { newTask, newDesc, todos } = this.state;

    return (
      <div className="container">

        <h1 className="title">My Task Manager</h1>

        <div className="task-box">

          <h3>Add New Task</h3>

          <form onSubmit={this.addTask}>

            <input
              type="text"
              name="newTask"
              placeholder="Enter your task"
              value={newTask}
              onChange={this.handleInput}
              required
            />

            <input
              type="text"
              name="newDesc"
              placeholder="Task description"
              value={newDesc}
              onChange={this.handleInput}
              required
            />

            <button type="submit">
              Add Task
            </button>

          </form>

        </div>

        <div className="list-box">

          <h3>My ToDo List :</h3>

          <ul>

            {todos && todos.length > 0 && todos.map((todo) => (

              <li key={todo.id}>

                <div className="task-info">

                  <strong>{todo.taskName}</strong>
                  <p>{todo.taskDescription}</p>

                </div>

                <button
                  className="done-btn"
                  onClick={() => this.removeTask(todo.id)}
                >
                  Done
                </button>

              </li>

            ))}

          </ul>

        </div>

      </div>
    );
  }
}

export default App;

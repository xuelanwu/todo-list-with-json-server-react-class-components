import React from "react";

import Todoitem from "./Todoitem/Todoitem";

import "./Todolist.css";
import { withTodos } from "../../hoc/withTodos";
import { postTodo, updateTodo, deleteTodo } from "../../api/TodoApi";

class Todolist extends React.Component {
  state = {
    todos: [],
    inputValue: "",

    // completed: [],
    // pending: []
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      completed: false,
    };
    this.props.postTodo(newTodo);
    this.setState({ inputValue: "" });
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleUpdate = (todo) => {
    this.props.updateTodo(todo);
  };

  render() {
    const { todos } = this.props;

    const pendingTodos = todos.filter((todo) => todo.completed === false);
    const completedTodos = todos.filter((todo) => todo.completed === true);

    return (
      <div className="todolist">
        <form className="todolist-form">
          {/* two way binding */}
          <input
            className="todolist-input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button className="submit-btn" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
        <div className="todolist-list-container">
          <ul className="todolist-list">
            <p className="todolist-list-title">Pending</p>
            {pendingTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            ))}
          </ul>
          <ul className="todolist-list">
            <p className="todolist-list-title">Completed</p>
            {completedTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // componentDidMount() {
  //   getTodos().then((todos) => {
  //     this.setState({
  //       todos,
  //     });
  //   });
  // }
}

export default withTodos(Todolist);

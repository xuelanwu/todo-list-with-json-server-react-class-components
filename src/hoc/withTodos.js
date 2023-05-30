import React from "react";
import { getTodos, postTodo, updateTodo, deleteTodo } from "../api/TodoApi";

export const withTodos = (Component) => {
  return class NewComponent extends React.Component {
    state = {
      todos: [],
    };
    render() {
      return (
        <Component
          todos={this.state.todos}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          {...this.props}
        />
      );
    }

    componentDidMount() {
      getTodos().then((todos) => {
        this.setState({
          todos,
        });
      });
    }

    postTodo = (newTodo) => {
      postTodo(newTodo).then((todo) => {
        this.setState((prev) => ({
          todos: [...prev.todos, todo],
          inputValue: "",
        }));
      });
    };

    updateTodo = (updatedTodo) => {
      updateTodo(updatedTodo).then((res) => {
        this.setState((prevState) => ({
          todos: prevState.todos.map((ele) => (ele.id === res.id ? res : ele)),
        }));
      });
    };

    deleteTodo = (id) => {
      deleteTodo(id).then(() => {
        this.setState((prevState) => ({
          todos: prevState.todos.filter((todo) => id !== todo.id),
        }));
      });
    };
  };
};

import React from "react";

import "./App.css";

const URL = "http://localhost:3000/todos";

const myFetch = async (url, options = {}) => {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
  }
  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res.json();
};

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };
  }

  componentDidMount() {
    myFetch(URL)
      .then((data) => this.setState({ todos: data }))
      .catch((e) => console.log(e));
  }

  handleChange = (e) => {
    const content = e.target.value;
    this.setState({ newTodo: content });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    myFetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify({ content: this.state.newTodo }),
    })
      .then((data) => {
        const newTodos = [data, ...this.state.todos];
        this.setState({ todos: newTodos, newTodo: "" });
      })
      .catch((e) => console.log(e));
  };

  handleDelete = (id) => {
    myFetch(`${URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newTodos = this.state.todos.filter((todo) => todo.id !== id);
        this.setState({ todos: newTodos });
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div className="todo-container">
        <form className="todo-form">
          <input
            className="todo-input"
            onChange={(e) => this.handleChange(e)}
            value={this.state.newTodo}
          ></input>
          <button
            className="todo-submit-btn"
            onClick={(e) => this.handleSubmit(e)}
          >
            Submit
          </button>
        </form>
        <ul className="todo-list">
          {this.state.todos.map((todo) => (
            <li className="todo-item" key={`todo-${todo.id}`}>
              <p className="todo-content">{todo.content}</p>
              <button
                className="todo-delete-btn"
                onClick={() => this.handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

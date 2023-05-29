import React from "react";
import "./Todoitem.css";

class Todoitem extends React.Component {
  state = {
    editing: false,
    inputValue: "",
  };

  handleEdit = () => {
    const { todo } = this.props;
    this.setState({
      editing: true,
      inputValue: todo.content,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    const { todo, onDelete, onUpdate } = this.props;
    const { editing, inputValue } = this.state;

    return (
      <li className="todoitem">
        {editing ? (
          <input
            className="todoitem-input"
            value={inputValue}
            onChange={this.handleInputChange}
          />
        ) : (
          <span className="todoitem-span">{todo.content}</span>
        )}
        {editing ? (
          <button
            className="todoitem-save-btn"
            onClick={() => {
              onUpdate({ ...todo, content: this.state.inputValue });
              this.setState({ editing: false });
            }}
          >
            Save
          </button>
        ) : (
          <button className="todoitem-edit-btn" onClick={this.handleEdit}>
            Edit
          </button>
        )}

        <button
          className="todoitem-delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
        <button
          className="todoitem-move-btn"
          onClick={() => onUpdate({ ...todo, completed: !todo.completed })}
        >
          Move
        </button>
      </li>
    );
  }
}

export default Todoitem;

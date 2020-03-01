import React from "react";

// import { VisibleTodoListHandler } from "../containers/VisibleTodoList";

interface OwnProps {
  key: number;
  text: string;
  completed: boolean;
  available: boolean;
}

export interface VisibleTodoListHandler {
  onClick(): void;
  deleteTodo(): void;
}

type Props = OwnProps & VisibleTodoListHandler;

// https://www.gitmemory.com/issue/yannickcr/eslint-plugin-react/2353/513009022
// const Todo: React.FC<Props> = ({ text, completed, available, onClick }) => (
class Todo extends React.Component<Props> {
  render() {
    // https://reactjs.org/docs/conditional-rendering.html
    let deleteButton;

    if (this.props.available) {
      deleteButton = (
        <button className="deleteButton" onClick={this.props.deleteTodo}>
          Delete
        </button>
      );
    }

    return (
      <li>
        <span
          className="text"
          style={{
            textDecoration: this.props.completed ? "line-through" : "none",
            color: this.props.available ? "black" : "red"
          }}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </span>
        &nbsp;
        {deleteButton}
        &nbsp;
        <span className="status">
          {this.props.available ? "" : "(Saving...)"}
        </span>
      </li>
    );
  }
}

export default Todo;

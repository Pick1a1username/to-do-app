import React from "react";

// import { VisibleTodoListHandler } from "../containers/VisibleTodoList";

interface OwnProps {
  index: number;
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
    return (
      <li onClick={this.props.onClick}>
        <span
          className="text"
          style={{
            textDecoration: this.props.completed ? "line-through" : "none",
            color: this.props.available ? "black" : "red"
          }}
        >
          {this.props.text}
        </span>
        <a
          href=""
          onClick={(e): void => {
            e.preventDefault();
            this.props.deleteTodo();
          }}
        >
          Delete
        </a>
        <span className="status">
          {this.props.available ? "" : "(Saving...)"}
        </span>
      </li>
    );
  }
}

export default Todo;

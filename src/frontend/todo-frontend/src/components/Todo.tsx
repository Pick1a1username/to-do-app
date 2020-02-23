import React from "react";

// import { VisibleTodoListHandler } from '../containers/VisibleTodoList'

interface OwnProps {
  index: number;
  text: string;
  completed: boolean;
  available: boolean;
}

export interface VisibleTodoListHandler {
  onClick(): void;
}

type Props = OwnProps & VisibleTodoListHandler;

const Todo: React.FC<Props> = ({ text, completed, available, onClick }) => (
  <li onClick={onClick}>
    <span
      className="text"
      style={{
        textDecoration: completed ? "line-through" : "none",
        color: available ? "black" : "red"
      }}
    >
      {text}
    </span>
    <span className="status">{available ? "" : "(Saving...)"}</span>
  </li>
);

export default Todo;

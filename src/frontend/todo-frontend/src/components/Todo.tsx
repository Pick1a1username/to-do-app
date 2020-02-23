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

// https://www.gitmemory.com/issue/yannickcr/eslint-plugin-react/2353/513009022
// const Todo: React.FC<Props> = ({ text, completed, available, onClick }) => (
const Todo: React.FC<Props> = (props: Props) => (
  <li onClick={props.onClick}>
    <span
      className="text"
      style={{
        textDecoration: props.completed ? "line-through" : "none",
        color: props.available ? "black" : "red"
      }}
    >
      {props.text}
    </span>
    <span className="status">{props.available ? "" : "(Saving...)"}</span>
  </li>
);

export default Todo;

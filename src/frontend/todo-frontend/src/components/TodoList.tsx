import React from "react";

import Todo from "./Todo";

import { VisibleTodoListHandler } from "../containers/VisibleTodoList";
import * as actions from "../actions";

interface OwnProps {
  todos: actions.Todo[];
}

type Props = OwnProps & VisibleTodoListHandler;

class TodoList extends React.Component<Props> {
  componentDidMount() {
    console.log("didmount");
    this.props.loadTodos();
  }

  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) => (
          <Todo
            key={index}
            {...todo}
            onClick={() => this.props.onTodoClick(todo)}
            deleteTodo={() => this.props.deleteTodo(todo.id)}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;

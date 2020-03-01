import { connect } from "react-redux";
import TodoList from "../components/TodoList";

import { AnyAction } from "redux";
import { AppState } from "../store";
import {
  Todo,
  TodoFromDB,
  loadTodosAsync,
  toggleTodoAsync,
  deleteTodoAsync
} from "../actions";
import { ThunkDispatch } from "redux-thunk";

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;

const getVisibleTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    // This 'default' is important!!!
    default:
      return todos;
  }
};

export interface VisibleTodoListHandler {
  onTodoClick(todo: Todo): void;
  loadTodos(): void;
  deleteTodo(todo: Todo['id']): void;
}

const mapStateToProps = (appState: AppState) => {
  return {
    todos: getVisibleTodos(
      appState.todosReducer,
      appState.visibilityFilterReducer
    )
  };
};

export const mapDispatchToProps = (dispatch: DispatchExts) => {
  return {
    onTodoClick: (todo: Todo) => {
      dispatch(toggleTodoAsync(todo));
    },
    loadTodos: () => {
      dispatch(loadTodosAsync());
    },
    deleteTodo: (id: Todo["id"]) => {
      dispatch(deleteTodoAsync(id));
    }
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;

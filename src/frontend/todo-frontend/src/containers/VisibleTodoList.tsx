import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

import { Dispatch } from "redux";

import { AppState } from "../store";
import { toggleTodo } from '../actions'

type Todo = {
  id: number,
  text: string,
  completed: boolean
}

const getVisibleTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    // This 'default' is important!!!
    default:
      return todos
  }
}

export interface VisibleTodoListHandler {
  onTodoClick(id: number): void
}

const mapStateToProps = (appState: AppState) => {
  return {
    todos: getVisibleTodos(appState.todosReducer, appState.visibilityFilterReducer)
  }
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    onTodoClick: (id: number) => { dispatch(toggleTodo(id)) }
  }
}


const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
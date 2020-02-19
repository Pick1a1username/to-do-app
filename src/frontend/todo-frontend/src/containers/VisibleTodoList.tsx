import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

import { Dispatch } from "redux";

import { AppState } from "../store";
import { ToggleTodoAsyncActions, LoadTodosAsyncActions } from '../actions'

type Todo = {
  id: string,
  text: string,
  completed: boolean,
  available: boolean,
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
  onTodoClick(todo: Todo): void;
  loadTodos(): void
}

const mapStateToProps = (appState: AppState) => {
  return {
    todos: getVisibleTodos(appState.todosReducer, appState.visibilityFilterReducer)
  }
}
type TodoFromDB = {
  itemId: string,
  text: string,
  completed: boolean
}

export const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    onTodoClick: (todo: Todo) => {
      if (!todo.available) return;

      dispatch(ToggleTodoAsyncActions.startToggleTodo(todo.id));

      fetch(`http://localhost:3000/todo/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
          itemId: todo.id,
          text: todo.text,
          completed: todo.completed ? false : true
        })
      })
        .then( (response) => response.json() )
        .then( (data: TodoFromDB) => {
          dispatch(ToggleTodoAsyncActions.doneToggleTodo({ params: {}, result: data }));
        })
        .catch( (error) => {
          dispatch(ToggleTodoAsyncActions.failedToggleTodo({ params: {}, error: {} }));
        });
    },
    loadTodos: () => { 
      dispatch(LoadTodosAsyncActions.startLoadTodos({}))
    
      // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
      fetch("http://localhost:3000/todo", {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then( (response) => {
          // console.log(response)
          return response.json()
        })
        .then( (todos) => {
          // console.log(todos)
          dispatch(LoadTodosAsyncActions.doneLoadTodos({ params: {}, result: todos }))
        })
        .catch( (error) => {
          console.error(error)
          dispatch(LoadTodosAsyncActions.failedLoadTodos({ params: {}, error: {}}))
        })
      }
    }
}


const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
import { actionCreatorFactory, ActionCreator, Success, Failure  } from 'typescript-fsa';

const actionCreator = actionCreatorFactory()

// id cannot be set in this code....
// So it is moved to the reducer.
// let nextTodoId = 0

// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

type TodoFromDB = {
  itemId: number,
  text: string,
  completed: boolean
}
export const addTodo = actionCreator<string>('ADD_TODO')

const toggleTodo = actionCreator.async<{}, TodoFromDB, {}>('TOGGLE_TODO')

export interface ToggleTodoAsyncActions {
  startToggleTodo: ActionCreator<{}>;
  failedToggleTodo: ActionCreator<Failure<{}, {}>>;
  doneToggleTodo: ActionCreator<Success<{}, TodoFromDB>>;
}

export const ToggleTodoAsyncActions = {
  startToggleTodo: toggleTodo.started,
  failedToggleTodo: toggleTodo.failed,
  doneToggleTodo: toggleTodo.done
}

// export const toggleTodo = actionCreator<number>('TOGGLE_TODO')

export const setVisibilityFilter = actionCreator<string>('SET_VISIBILITY_FILTER')

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }

  
// https://qiita.com/IzumiSy/items/b7d8a96eacd2cd8ad510#%E7%99%BA%E5%B1%95%E7%B7%A8%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%81%97%E3%81%9F%E3%81%84
const loadTodos = actionCreator.async<{}, [], {}>('LOAD_TODOS')

export interface LoadTodosAsyncActions {
  startLoadTodos: ActionCreator<{}>;
  failedLoadTodos: ActionCreator<Failure<{}, {}>>;
  doneLoadTodos: ActionCreator<Success<{}, []>>;
}

export const LoadTodosAsyncActions = {
  startLoadTodos: loadTodos.started,
  failedLoadTodos: loadTodos.failed,
  doneLoadTodos: loadTodos.done
}
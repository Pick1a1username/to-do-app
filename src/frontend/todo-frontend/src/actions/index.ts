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

export const addTodo = actionCreator<string>('ADD_TODO')

export const toggleTodo = actionCreator<number>('TOGGLE_TODO')

export const setVisibilityFilter = actionCreator<string>('SET_VISIBILITY_FILTER')

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }

  
const loadTodos = actionCreator.async<{}, {}, {}>('LOAD_TODOS')

export interface LoadTodosAsyncActions {
  startLoadTodos: ActionCreator<{}>;
  failedLoadTodos: ActionCreator<Failure<{}, {}>>;
  doneLoadTodos: ActionCreator<Success<{}, {}>>;
}

export const LoadTodosAsyncActions = {
  startLoadTodos: loadTodos.started,
  failedLoadTodos: loadTodos.failed,
  doneLoadTodos: loadTodos.done
}
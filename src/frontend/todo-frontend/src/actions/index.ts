import { actionCreatorFactory, ActionCreator, Success, Failure  } from 'typescript-fsa';
import { Dispatch, AnyAction } from "redux";

const actionCreator = actionCreatorFactory()


type Todo = {
  id: string,
  text: string,
  completed: boolean,
  available: boolean,
}


type TodoFromDB = {
  itemId: string,
  text: string,
  completed: boolean
}
// export const addTodo = actionCreator<string>('ADD_TODO')

const addTodo = actionCreator.async<{}, TodoFromDB, {}>('ADD_TODO')

export interface AddTodoAsyncActions {
  startAddTodo: ActionCreator<{}>;
  failedAddTodo: ActionCreator<Failure<{}, {}>>;
  doneAddTodo: ActionCreator<Success<{}, TodoFromDB>>;
}

export const AddTodoAsyncActions = {
  startAddTodo: addTodo.started,
  failedAddTodo: addTodo.failed,
  doneAddTodo: addTodo.done
}

const toggleTodo = actionCreator.async<{}, TodoFromDB, {}>('TOGGLE_TODO')

export interface ToggleTodoAsyncActions {
  startToggleTodo: ActionCreator<string>;
  failedToggleTodo: ActionCreator<Failure<{}, {}>>;
  doneToggleTodo: ActionCreator<Success<{}, TodoFromDB>>;
}

export const ToggleTodoAsyncActions = {
  startToggleTodo: toggleTodo.started,
  failedToggleTodo: toggleTodo.failed,
  doneToggleTodo: toggleTodo.done
}

export const toggleTodoAsync = (todo: Todo) => {
  return (dispatch: Dispatch<AnyAction>) => {
    if (!todo.available) return Promise.resolve(dispatch(ToggleTodoAsyncActions.failedToggleTodo({ params: {}, error: {} })));

    dispatch(ToggleTodoAsyncActions.startToggleTodo(todo.id));

    return fetch(`http://localhost:3000/todo/`, {
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
  }
}

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

export const loadTodosAsync = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(LoadTodosAsyncActions.startLoadTodos({}))
    
    // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
    return fetch("http://localhost:3000/todo", {
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
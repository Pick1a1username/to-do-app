import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addTodo, toggleTodo, LoadTodosAsyncActions } from '../actions'

type Todo = {
    id: number,
    text: string,
    completed: boolean
}

let nextTodoId = 0

export interface todosReducerState extends Array<Todo> { }

export const todosReducerInitialState: todosReducerState = []

export const todosReducer = reducerWithInitialState(todosReducerInitialState)
    .case(addTodo, (state, value ) => {
        return [
            ...state,
            {
              id: nextTodoId++,
              text: value,
              completed: false
            }
        ]   
    })
    .case(toggleTodo, (state, id) => {
        return state.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    })
    .case(LoadTodosAsyncActions.startLoadTodos, (state) => {
        return state
    })
    .case(LoadTodosAsyncActions.failedLoadTodos, (state) => {
        return state
    })
    .case(LoadTodosAsyncActions.doneLoadTodos, (state) => {
        return state
    })


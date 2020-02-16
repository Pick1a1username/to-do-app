import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AddTodoAsyncActions, ToggleTodoAsyncActions , LoadTodosAsyncActions } from '../actions'

type Todo = {
    id: string,
    text: string,
    completed: boolean,
    available: boolean
}

type TodoFromDB = {
    _id: string,
    itemId: string,
    text: string,
    completed: boolean
}


let nextTodoId = 0

export interface todosReducerState extends Array<Todo> { }

export const todosReducerInitialState: todosReducerState = []

export const todosReducer = reducerWithInitialState(todosReducerInitialState)
    // .case(addTodo, (state, value ) => {
    //     return [
    //         ...state,
    //         {
    //           id: nextTodoId++,
    //           text: value,
    //           completed: false
    //         }
    //     ]   
    // })
    .case(AddTodoAsyncActions.startAddTodo, (state) => {
        return state
    })
    .case(AddTodoAsyncActions.failedAddTodo, (state) => {
        return state
    })
    .case(AddTodoAsyncActions.doneAddTodo, (state, { result }) => {
        console.log(result)
        return [
            ...state,
            { id: result.itemId as string, text: result.text as string, completed: result.completed as boolean, available: false }
        ]   
    })
    // .case(toggleTodo, (state, id) => {
    //     return state.map(todo =>
    //         todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    // })
    .case(ToggleTodoAsyncActions.startToggleTodo, (state) => {
        return state
    })
    .case(ToggleTodoAsyncActions.failedToggleTodo, (state) => {
        return state
    })
    .case(ToggleTodoAsyncActions.doneToggleTodo, (state, { result }) => {
        return state.map(todo =>
            todo.id === result.itemId ? { ...todo, completed: !todo.completed } : todo)
    })
    .case(LoadTodosAsyncActions.startLoadTodos, (state) => {
        return state
    })
    .case(LoadTodosAsyncActions.failedLoadTodos, (state) => {
        return state
    })
    .case(LoadTodosAsyncActions.doneLoadTodos, (state, { result }) => {
        console.log(result);
        if ( result.length > 0 ) {
            let resultModified = result.map( (todo: TodoFromDB) => {
                    return { id: todo.itemId as string, text: todo.text as string, completed: todo.completed as boolean, available: false}
                });
            return resultModified;
        }

        return state
    })


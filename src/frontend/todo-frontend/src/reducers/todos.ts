import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  Todo,
  TodoFromDB,
  AddTodoAsyncActions,
  ToggleTodoAsyncActions,
  LoadTodosAsyncActions,
  DeleteTodoAsyncActions
} from "../actions";

export type todosReducerState = Array<Todo>;

export const todosReducerInitialState: todosReducerState = [];

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
  .case(AddTodoAsyncActions.startAddTodo, state => {
    return state;
  })
  .case(AddTodoAsyncActions.failedAddTodo, state => {
    return state;
  })
  .case(AddTodoAsyncActions.doneAddTodo, (state, { result }) => {
    console.log(result);
    return [
      ...state,
      {
        id: result.itemId as string,
        text: result.text as string,
        completed: result.completed as boolean,
        available: true
      }
    ];
  })
  // .case(toggleTodo, (state, id) => {
  //     return state.map(todo =>
  //         todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  // })
  .case(ToggleTodoAsyncActions.startToggleTodo, (state, id) => {
    return state.map(todo =>
      todo.id === id ? { ...todo, available: false } : todo
    );
  })
  .case(ToggleTodoAsyncActions.failedToggleTodo, state => {
    return state;
  })
  .case(ToggleTodoAsyncActions.doneToggleTodo, (state, { result }) => {
    return state.map(todo =>
      todo.id === result.itemId
        ? { ...todo, completed: !todo.completed, available: true }
        : todo
    );
  })
  .case(LoadTodosAsyncActions.startLoadTodos, state => {
    return state;
  })
  .case(LoadTodosAsyncActions.failedLoadTodos, state => {
    return state;
  })
  .case(LoadTodosAsyncActions.doneLoadTodos, (state, { result }) => {
    console.log(result);
    if (result.length > 0) {
      const resultModified = result.map((todo: TodoFromDB) => {
        return {
          id: todo.itemId as string,
          text: todo.text as string,
          completed: todo.completed as boolean,
          available: true
        };
      });
      return resultModified;
    }
    return state;
  })
  .case(DeleteTodoAsyncActions.startDeleteTodo, (state, id) => {
    return state.map(todo =>
      todo.id === id ? { ...todo, available: false } : todo
    );
  })
  .case(DeleteTodoAsyncActions.failedDeleteTodo, state => {
    return state;
  })
  .case(DeleteTodoAsyncActions.doneDeleteTodo, (state, { result }) => {
    return state.filter(todo => todo.id != result.id);
  });

import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import thunk from "redux-thunk";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { AppState } from "../store";

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;

const mockStore = configureMockStore<AppState, DispatchExts>([thunk]);

import * as actions from "../actions";
// import * as types from '../../constants/ActionTypes'

// https://redux.js.org/recipes/writing-tests/
// https://qiita.com/cross-xross/items/56895d3e78bb669398ca

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates doneLoadTodos when fetching todos has been done", () => {
    fetchMock.getOnce("http://localhost:3000/todo", {
      body: [
        {
          itemId: "1111",
          text: "do something",
          completed: false
        }
      ],
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: actions.LoadTodosAsyncActions.startLoadTodos.type, payload: {} },
      {
        type: actions.LoadTodosAsyncActions.doneLoadTodos.type,
        payload: {
          params: {},
          result: [
            {
              itemId: "1111",
              text: "do something",
              completed: false
            }
          ]
        }
      }
    ];
    // const store = mockStore({ todosReducer: [] })
    const store = mockStore();

    return store.dispatch(actions.loadTodosAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates doneToggleTodo when toggling a todo has been done", () => {
    fetchMock.putOnce("http://localhost:3000/todo/", {
      body: {
        itemId: "1111",
        text: "do something",
        completed: true
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: actions.ToggleTodoAsyncActions.startToggleTodo.type,
        payload: "1111"
      },
      {
        type: actions.ToggleTodoAsyncActions.doneToggleTodo.type,
        payload: {
          params: {},
          result: {
            itemId: "1111",
            text: "do something",
            completed: true
          }
        }
      }
    ];
    // const store = mockStore({ todosReducer: [] })
    const store = mockStore();

    return store
      .dispatch(
        actions.toggleTodoAsync({
          id: "1111",
          text: "do something",
          completed: true,
          available: true
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("deletes a todo", () => {
    fetchMock.deleteOnce("http://localhost:3000/todo/1111", {
      status: 200,
      body: { Status: "Successfully deleted" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: actions.DeleteTodoAsyncActions.startDeleteTodo.type,
        payload: {}
      },
      {
        type: actions.DeleteTodoAsyncActions.doneDeleteTodo.type,
        payload: {
          params: {},
          result: { Status: "Successfully deleted" }
        }
      }
    ];
    // const store = mockStore({ todosReducer: [] })
    const store = mockStore();

    return store.dispatch(actions.deleteTodoAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

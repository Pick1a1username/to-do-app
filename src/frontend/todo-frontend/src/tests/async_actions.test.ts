import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import thunk from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import * as VisibleTodoList from '../containers/VisibleTodoList'
import { AppState } from '../store'

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;

const mockStore = configureMockStore<AppState, DispatchExts>([thunk]);


import * as actions from '../actions'
// import * as types from '../../constants/ActionTypes'


// https://redux.js.org/recipes/writing-tests/
// https://qiita.com/cross-xross/items/56895d3e78bb669398ca

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('http://localhost:3000/todo', {
      body: [{
        itemId: "1111",
        text: "do something",
        completed: false
      }],
      headers: { 'content-type': 'application/json' }
    })
    const expectedActions = [
      { type: actions.LoadTodosAsyncActions.startLoadTodos.type, payload: {} },
      { type: actions.LoadTodosAsyncActions.doneLoadTodos.type, payload: { params: {}, result: [{
        itemId: "1111",
        text: "do something",
        completed: false
      }] } }
    ]
    // const store = mockStore({ todosReducer: [] })
    const store = mockStore()
    // return store.dispatch(actions.fetchTodos()).then(() => {
    //   // return of async actions
    //   expect(store.getActions()).toEqual(expectedActions)

    return store.dispatch(actions.loadTodosAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})

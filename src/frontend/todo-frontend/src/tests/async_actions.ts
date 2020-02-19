import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as VisibleTodoList from '../containers/VisibleTodoList'

const mockStore = configureMockStore()


import * as actions from '../actions'
// import * as types from '../../constants/ActionTypes'


// https://redux.js.org/recipes/writing-tests/
// https://qiita.com/cross-xross/items/56895d3e78bb669398ca

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('/todo', {
      body: [{
        itemId: "1111",
        text: "do something",
        completed: false
      }],
      headers: { 'content-type': 'application/json' }
    })
    const expectedActions = [
      { type: actions.LoadTodosAsyncActions.startLoadTodos },
      { type: actions.LoadTodosAsyncActions.doneLoadTodos, body: { params: {}, result: [{
        itemId: "1111",
        text: "do something",
        completed: false
      }] } }
    ]
    const store = mockStore({ todosReducer: [] })
    // return store.dispatch(actions.fetchTodos()).then(() => {
    //   // return of async actions
    //   expect(store.getActions()).toEqual(expectedActions)

    return store.dispatch(actions.loadTodosAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})

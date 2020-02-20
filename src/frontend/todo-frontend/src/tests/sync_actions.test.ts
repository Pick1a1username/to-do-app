import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import thunk from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { AppState } from '../store'

import * as actions from '../actions'



// https://redux.js.org/recipes/writing-tests/

describe('actions', () => {
  it('should change the filter', () => {
    const filter = actions.VisibilityFilters.SHOW_COMPLETED
    const expectedAction = {
      type: actions.setVisibilityFilter.type,
      payload: filter
    }
    expect(actions.setVisibilityFilter(actions.VisibilityFilters.SHOW_COMPLETED)).toEqual(expectedAction)
  })
})

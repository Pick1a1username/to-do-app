import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from '../components/TodoList'
import Todo from '../components/Todo'

// https://redux.js.org/recipes/writing-tests/

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const dispatchToProps = {
    onTodoClick: jest.fn(),
    loadTodos: jest.fn(),
  }

  const stateToProps = { todos: [
    {
      id: "1",
      text: 'Incompleted Todo',
      completed: false,
      available: true
    },
    {
      id: "2",
      text: 'Completed Todo',
      completed: true,
      available: true
    }]
  }

  const props = {
    ...dispatchToProps,
    ...stateToProps
  }

  const enzymeWrapper = shallow(<TodoList {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

describe('Todo Component', () => {
  it('should render todos', () => {
    const { enzymeWrapper } = setup()
    
    expect(enzymeWrapper.find('Todo').length).toEqual(2)
  })

})

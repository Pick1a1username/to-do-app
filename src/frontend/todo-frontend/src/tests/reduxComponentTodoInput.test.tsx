import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoInput from '../components/TodoInput'

// https://redux.js.org/recipes/writing-tests/

Enzyme.configure({ adapter: new Adapter() })

function todoInputSetup() {
  const dispatchToProps = {
    addTodo: jest.fn(),
  }

  const stateToProps = {}

  const props = {
    ...dispatchToProps,
    ...stateToProps
  }

  const enzymeWrapper = shallow(<TodoInput {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

// Todo: Test TodoInput component.
describe('TodoInput Component', () => {
  it.skip('should submit new todo', () => {
    const { enzymeWrapper, props } = todoInputSetup()
    // Get input box and add button
    const inputBox = enzymeWrapper.find('div').find('form').find('input')
    const addButton = enzymeWrapper.find('div').find('form').find('button')
    
    
    // expect(inputBox.prop('value')).toEqual('Do Something')
    // Type something
    // inputBox.simulate('onChange', { value: 'Do Something'  });
    // inputBox.setProps( {value: "Do Something"})
    // inputBox.getDOMNode<HTMLInputElement>().value = "Do Something"
    // inputBox.instance().props.onChange({ target: { value: 'Do Something'  }})

    expect(inputBox.prop('value')).toEqual('Do Something')
    // Push add button
    addButton.simulate('click')

    // expect(props.addTodo.mock.calls).toEqual('Do Something')
  })
})

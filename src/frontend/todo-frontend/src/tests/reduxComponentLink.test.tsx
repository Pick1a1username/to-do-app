import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Link from '../components/Link'

// https://redux.js.org/recipes/writing-tests/

Enzyme.configure({ adapter: new Adapter() })

function setupInactive() {
  const dispatchToProps = {
    onClick: jest.fn(),
  }

  const stateToProps = {
    active: false,
    children: "All"
  }

  const props = {
    ...dispatchToProps,
    ...stateToProps
  }

  const enzymeWrapper = shallow(<Link {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

function setupActive() {
  const dispatchToProps = {
    onClick: jest.fn(),
  }

  const stateToProps = {
    active: true,
    children: "All"
  }

  const props = {
    ...dispatchToProps,
    ...stateToProps
  }

  const enzymeWrapper = shallow(<Link {...props} />)
  return {
    props,
    enzymeWrapper
  }
}


describe('Link Component', () => {
  it('should render a link not active', () => {
    const { enzymeWrapper, props } = setupInactive()

    // Check text
    expect(enzymeWrapper.find('a').text()).toBe('All')

    // const link = enzymeWrapper.find('a')
    // https://github.com/airbnb/enzyme/issues/308#issuecomment-332084530
    // link.simulate('click', { target: {}, preventDefault () {} })

    // expect(enzymeWrapper.find('a').text()).toBe('All')
  })

  it('should render a link active', () => {
    const { enzymeWrapper, props } = setupActive()

    // Check text
    expect(enzymeWrapper.find('span').text()).toBe('All')
  })

})

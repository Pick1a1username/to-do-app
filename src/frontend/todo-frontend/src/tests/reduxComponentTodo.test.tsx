import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Todo from "../components/Todo";

// https://redux.js.org/recipes/writing-tests/

Enzyme.configure({ adapter: new Adapter() });

function incompletedTodo() {
  const dispatchToProps = {
    onTodoClick: jest.fn(),
    deleteTodo: jest.fn()
  };

  const stateToProps = {
    id: "1",
    text: "Incompleted Todo",
    completed: false,
    available: true
  };

  const props = {
    ...dispatchToProps,
    ...stateToProps
  };

  const enzymeWrapper = shallow(
    <Todo
      key={0}
      {...stateToProps}
      onClick={() => dispatchToProps.onTodoClick(stateToProps)}
      deleteTodo={() => dispatchToProps.deleteTodo(stateToProps.id)}
    />
  );
  return {
    props,
    enzymeWrapper
  };
}

function completedTodo() {
  const dispatchToProps = {
    onTodoClick: jest.fn(),
    deleteTodo: jest.fn()
  };

  const stateToProps = {
    id: 1,
    text: "Completed Todo",
    completed: true,
    available: true
  };

  const props = {
    ...dispatchToProps,
    ...stateToProps
  };

  const enzymeWrapper = shallow(
    <Todo
      key={0}
      {...stateToProps}
      onClick={() => dispatchToProps.onTodoClick(stateToProps)}
      deleteTodo={() => dispatchToProps.deleteTodo(stateToProps.id)}
    />
  );
  return {
    props,
    enzymeWrapper
  };
}

function unavailableTodo() {
  const dispatchToProps = {
    onTodoClick: jest.fn(),
    deleteTodo: jest.fn()
  };

  const stateToProps = {
    id: 1,
    text: "Unavailable Todo",
    completed: false,
    available: false
  };

  const props = {
    ...dispatchToProps,
    ...stateToProps
  };

  const enzymeWrapper = shallow(
    <Todo
      key={0}
      {...stateToProps}
      onClick={() => dispatchToProps.onTodoClick(stateToProps)}
      deleteTodo={() => dispatchToProps.deleteTodo(stateToProps.id)}
    />
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("Todo Component", () => {
  it("should render incompleted todo", () => {
    const { enzymeWrapper, props } = incompletedTodo();
    // Check text
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .text()
    ).toBe("Incompleted Todo");

    // check completed, available
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .prop("style")
    ).toEqual({ color: "black", textDecoration: "none" });

    // check delete button
    expect(
      enzymeWrapper
        .find("li")
        .find("a.deleteButton")
        .text()
    ).toBe("Delete");

    // check availability
    expect(
      enzymeWrapper
        .find("li")
        .find("span.status")
        .text()
    ).toEqual("");

    // check onTodoClick()
    const todoText = enzymeWrapper.find("li").find("span.text");
    todoText.props().onClick("");

    expect(props.onTodoClick.mock.calls[0][0]).toStrictEqual({
      id: "1",
      text: "Incompleted Todo",
      completed: false,
      available: true
    });

    // check deleteButton()
    const todoDeleteButton = enzymeWrapper.find("li").find("a");
    todoDeleteButton.props().onClick("");

    expect(props.deleteTodo.mock.calls[0][0]).toEqual("1");
  });

  it("should render completed todo", () => {
    const { enzymeWrapper } = completedTodo();

    // Check text
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .text()
    ).toBe("Completed Todo");
    // check completed, available
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .prop("style")
    ).toEqual({ color: "black", textDecoration: "line-through" });

    // check delete button
    expect(
      enzymeWrapper
        .find("li")
        .find("a.deleteButton")
        .text()
    ).toBe("Delete");
    // check availability
    expect(
      enzymeWrapper
        .find("li")
        .find("span.status")
        .text()
    ).toEqual("");
  });

  it("should render unavailable todo", () => {
    const { enzymeWrapper } = unavailableTodo();

    // Check text
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .text()
    ).toBe("Unavailable Todo");
    // check completed, available
    expect(
      enzymeWrapper
        .find("li")
        .find("span.text")
        .prop("style")
    ).toEqual({ color: "red", textDecoration: "none" });

    // check delete button
    expect(
      enzymeWrapper
        .find("li")
        .find("a.deleteButton")
        .exists()
    ).toEqual(false);

    // check availability
    expect(
      enzymeWrapper
        .find("li")
        .find("span.status")
        .text()
    ).toEqual("(Saving...)");
  });
});

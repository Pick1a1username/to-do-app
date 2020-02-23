import React, { createRef } from "react";

import { AddTodoHandler } from "../containers/AddTodo";

// interface OwnProps {}

// type Props = OwnProps & AddTodoHandler;
type Props = AddTodoHandler;

// https://www.gitmemory.com/issue/yannickcr/eslint-plugin-react/2353/513009022
// const TodoInput: React.FC<Props> = ({ addTodo }) => {
const TodoInput: React.FC<Props> = (props: Props) => {
  // https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
  const input = createRef<HTMLInputElement>();

  return (
    <div>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          if (!input.current!.value.trim()) {
            return;
          }
          props.addTodo(input.current!.value);
          input.current!.value = "";
        }}
      >
        <input ref={input} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoInput;

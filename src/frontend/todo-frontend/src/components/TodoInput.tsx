import React, { createRef } from "react";

import { AddTodoHandler } from "../containers/AddTodo";

// interface OwnProps {}

// type Props = OwnProps & AddTodoHandler;
type Props = AddTodoHandler;

const TodoInput: React.FC<Props> = ({ addTodo }) => {
  // https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
  const input = createRef<HTMLInputElement>();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.current!.value.trim()) {
            return;
          }
          addTodo(input.current!.value);
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

import React from 'react'

import Todo from './Todo'

import { VisibleTodoListHandler } from '../containers/VisibleTodoList'

type Todo = {
  id: number,
  text: string,
  completed: boolean
}

interface OwnProps {
  todos: Todo[]
}

type Props = OwnProps & VisibleTodoListHandler


const TodoList: React.FC<Props> = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index) } />
    ))}
  </ul>
)


export default TodoList
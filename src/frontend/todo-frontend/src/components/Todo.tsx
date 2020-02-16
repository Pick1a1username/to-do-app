import React from 'react'

// import { VisibleTodoListHandler } from '../containers/VisibleTodoList'

interface OwnProps {
    text: string,
    completed: boolean,
    available: boolean
}

export interface VisibleTodoListHandler {
  onClick(): void
}

type Props = OwnProps & VisibleTodoListHandler

const Todo: React.FC<Props> = ({ text, completed, available, onClick }) => (
  <li
    onClick={onClick}
    style={{
    textDecoration: completed ? 'line-through' : 'none'
  }}
  >
    {text}
  </li>
)

export default Todo
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

class TodoList extends React.Component<Props> {


  componentDidMount() {
    this.props.loadTodos();
  }

  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) => (
          <Todo key={index} {...todo} onClick={() => this.props.onTodoClick(todo) } />
        ))}
      </ul>
    )
  }
}

export default TodoList
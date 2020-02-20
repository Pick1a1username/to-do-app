import React from 'react'

import Todo from './Todo'

import { VisibleTodoListHandler } from '../containers/VisibleTodoList'

type Todo = {
  id: string,
  text: string,
  completed: boolean,
  available: boolean
}

interface OwnProps {
  todos: Todo[]
}

type Props = OwnProps & VisibleTodoListHandler

class TodoList extends React.Component<Props> {


  componentDidMount() {
    console.log('didmount')
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
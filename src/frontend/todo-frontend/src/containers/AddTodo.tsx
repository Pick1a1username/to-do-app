import { connect } from "react-redux";
import { Dispatch } from "redux";

import { addTodo } from '../actions'
import TodoInput from '../components/TodoInput'
import { AppState } from "../store";

export interface AddTodoHandler {
  addTodo(value: string): void
}

const mapStateToProps = (appState: AppState) => {
  return {}
}

const mapDispatchToProps = ( dispatch: Dispatch) => {
  return {
    addTodo: (value: string) => { dispatch(addTodo(value)) }
  }
}

const AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInput)

export default AddTodo
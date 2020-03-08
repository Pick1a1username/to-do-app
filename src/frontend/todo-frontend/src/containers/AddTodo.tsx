import { connect } from "react-redux";
import { Dispatch } from "redux";

import { TodoFromDB, AddTodoAsyncActions } from "../actions";
import TodoInput from "../components/TodoInput";
import { AppState } from "../store";

export interface AddTodoHandler {
  addTodo(value: string): void;
}

const mapStateToProps = (appState: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // addTodo: (value: string) => { dispatch(addTodo(value)) },
    addTodo: (value: string) => {
      dispatch(AddTodoAsyncActions.startAddTodo({}));

      fetch(`http://localhost:3000/todo/`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          text: value
        })
      })
        .then(response => response.json())
        .then((data: TodoFromDB) => {
          dispatch(
            AddTodoAsyncActions.doneAddTodo({ params: {}, result: data })
          );
        })
        .catch((): void => {
          dispatch(
            AddTodoAsyncActions.failedAddTodo({ params: {}, error: {} })
          );
        });
    }
  };
};

const AddTodo = connect(mapStateToProps, mapDispatchToProps)(TodoInput);

export default AddTodo;

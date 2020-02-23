import { reducerWithInitialState } from "typescript-fsa-reducers";
import { setVisibilityFilter, VisibilityFilters } from "../actions";

export const visibilityFilterReducerInitialState: string =
  VisibilityFilters.SHOW_ALL;

export const visibilityFilterReducer = reducerWithInitialState(
  visibilityFilterReducerInitialState
).case(setVisibilityFilter, (state, filter) => {
  return filter;
});

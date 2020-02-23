import { connect } from "react-redux";

import { Dispatch } from "redux";
import { AppState } from "../store";

import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";

export interface FilterLinkHandler {
  onClick(): void;
}

type OwnProps = {
  filter: string;
};

const mapStateToProps = (appState: AppState, ownProps: OwnProps) => {
  return {
    active: ownProps.filter === appState.visibilityFilterReducer
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;

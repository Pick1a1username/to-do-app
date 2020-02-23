import React from "react";

import { FilterLinkHandler } from "../containers/FilterLink";

interface OwnProps {
  active: boolean;
  children: string;
}

type Props = OwnProps & FilterLinkHandler;

// https://www.gitmemory.com/issue/yannickcr/eslint-plugin-react/2353/513009022
// const Link: React.FC<Props> = ({ active, children, onClick }) => {
const Link: React.FC<Props> = (props: Props) => {
  if (props.active) {
    return <span>{props.children}</span>;
  }
  return (
    <a
      href=""
      onClick={(e): void => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.children}
    </a>
  );
};

export default Link;

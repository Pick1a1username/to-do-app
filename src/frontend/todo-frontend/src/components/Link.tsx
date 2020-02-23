import React from "react";

import { FilterLinkHandler } from "../containers/FilterLink";

interface OwnProps {
  active: boolean;
  children: string;
}

type Props = OwnProps & FilterLinkHandler;

const Link: React.FC<Props> = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
export default Link;

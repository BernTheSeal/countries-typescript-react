import { FunctionComponent, ReactNode } from "react";

interface FilterActionsProps {
  children: ReactNode;
}

const FilterActions: FunctionComponent<FilterActionsProps> = ({ children }) => {
  return <div className="filterActions-container"> {children}</div>;
};

export default FilterActions;

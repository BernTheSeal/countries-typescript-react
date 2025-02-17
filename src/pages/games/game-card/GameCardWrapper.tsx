import { ReactNode } from "react";

interface GameCardWrapperProps {
  children: ReactNode;
}

const GameCardWrapper = ({ children }: GameCardWrapperProps) => {
  return <div className="gameCardWrapper">{children}</div>;
};

export default GameCardWrapper;

import { ReactNode } from "react";

interface GameFormsProps {
  children?: ReactNode;
  classNameProps: string;
  handleCustomGameSettingAppear: () => void;
}

const GameForms: React.FC<GameFormsProps> = (props) => {
  const { classNameProps, children, handleCustomGameSettingAppear } = props;
  return (
    <div className={`gameForms-container ${classNameProps}`}>
      <div className="gameForms-container-header">
        <div className="gameForms-container-header-title">
          <i className="fa-solid fa-gear"></i>
          <h3> choose settings</h3>
        </div>
        <button onClick={handleCustomGameSettingAppear}> cancel </button>
      </div>
      <div className="gameForms-container-main">{children}</div>
    </div>
  );
};

export default GameForms;

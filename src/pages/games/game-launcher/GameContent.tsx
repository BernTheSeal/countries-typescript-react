import { FunctionComponent } from "react";
import { gameContent } from "../../../types/gamesCardType";

interface gameContentProps {
  gameContent: gameContent[];
}

const GameContent: FunctionComponent<gameContentProps> = ({ gameContent }) => {
  return (
    <div className="gameContent-container">
      <div className="gameContent-container-title">
        <i className="fas fa-info-circle"></i>
        <h4>content</h4>
      </div>

      <div className="gameContent-container-content">
        {gameContent &&
          gameContent.map((content) => (
            <div>
              <i className={content.icon}></i>
              <p>{content.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameContent;

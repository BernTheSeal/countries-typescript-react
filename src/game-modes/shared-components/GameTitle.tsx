import { FunctionComponent } from "react";

interface iGameTitleProps {
  title: string;
  iconLeft: string;
  iconRight: string;
  score: number;
  highScore: number;
  isCustomGame: boolean;
}

const GameTitle: FunctionComponent<iGameTitleProps> = (props) => {
  const { title, iconLeft, iconRight, score, highScore, isCustomGame } = props;

  return (
    <div className="game-info">
      <div className="game-info-container">
        <div className="game-info-container-title">
          <i className={iconLeft}></i>
          <h2>{title.toUpperCase()}</h2>
          <i className={iconRight}></i>
        </div>
        {!isCustomGame && (
          <div className="game-info-container-details">
            <div className="game-info-container-details-score">
              <p>{score && score.toLocaleString()}</p>
              <h4>Score</h4>
            </div>
            <div className="game-info-container-details-highScore">
              <p>{highScore && highScore.toLocaleString()}</p>
              <h4>High score</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTitle;

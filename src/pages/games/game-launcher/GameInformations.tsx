import { FunctionComponent } from "react";
import { GameInfoType } from "../../../types/gameInfoType";

interface gameInformationsProps {
  gameInfo: GameInfoType;
}

const GameInformations: FunctionComponent<gameInformationsProps> = ({
  gameInfo,
}) => {
  return (
    <>
      {gameInfo && (
        <div className="gameInformation-container">
          <div className="gameInformation-container-info">
            <p>{gameInfo.highScore.toLocaleString()}</p>
            <h4>high score</h4>
            <i className="fa-solid fa-crown"></i>
          </div>
          <div className="gameInformation-container-info">
            <p>{gameInfo.totalScore.toLocaleString()}</p>
            <h4>total score</h4>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="gameInformation-container-info">
            <p>
              {gameInfo.playedTime > 0
                ? (gameInfo.totalScore / gameInfo.playedTime)
                    .toFixed(1)
                    .toLocaleString()
                : "-"}
            </p>
            <h4>avarage score</h4>
            <i className="fa-solid fa-bars-progress"></i>
          </div>
          <div className="gameInformation-container-info">
            <p>{(gameInfo.elapsedTime / 60 / 60).toFixed(1)}</p>
            <h4>hours spent</h4>
            <i className="fa-solid fa-clock"></i>
          </div>
          <div className="gameInformation-container-info">
            <p>{gameInfo.playedTime.toLocaleString()}</p>
            <h4> played time </h4>
            <i className="fa-solid fa-hand-pointer"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default GameInformations;

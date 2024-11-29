import { FunctionComponent } from "react";

interface GameDifficultyProps {
  difficulty: string;
  difficultyBar: number;
  difficultyColor: string;
}

const GameDifficulty: FunctionComponent<GameDifficultyProps> = (props) => {
  const { difficulty, difficultyBar, difficultyColor } = props;

  const bars = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      style={{
        backgroundColor:
          index < difficultyBar ? difficultyColor : "transparent",
        width: "30px",
        height: "20px",
      }}
    ></div>
  ));

  return (
    <div className="gameDifficulty-container">
      <div className="gameDifficulty-container-title">
        <i className="fa-solid fa-brain"></i>
        <h4>difficulty</h4>
      </div>

      <div className="gameDifficulty-container-content">
        <div className="gameDifficulty-container-content-bar">{bars}</div>
        <p
          style={{
            color: difficultyColor,
          }}
        >
          {difficulty}
        </p>
      </div>
    </div>
  );
};

export default GameDifficulty;

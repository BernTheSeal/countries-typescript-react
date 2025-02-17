import { FunctionComponent, useEffect } from "react";
import useGetGameInfo from "../../../hooks/use-getGameInfo";

interface iGameCardProps {
  title: string;
  openGameMenu: () => void;
  storageName: string;
}

const GameCard: FunctionComponent<iGameCardProps> = (props) => {
  const { title, openGameMenu, storageName } = props;
  const { gameInfo, getGameInfo } = useGetGameInfo(storageName);

  useEffect(() => {
    getGameInfo();
  }, []);

  return (
    <button className="game-card" onClick={openGameMenu}>
      <div className="game-card-name">
        {title.split(" ").map((w) => (
          <span>{w}</span>
        ))}
      </div>
      <div className="game-card-highScore">
        <span>{gameInfo?.highScore}</span>
        <p>high score</p>
      </div>
    </button>
  );
};

export default GameCard;

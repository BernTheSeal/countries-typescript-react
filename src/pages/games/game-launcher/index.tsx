import { FunctionComponent, useEffect, useState, useRef } from "react";
import { gameContent, GamesInformation } from "../../../types/gamesCardType";
import gamesCardData from "../../../data/gamesCardData";
import { commonGameOptionsType } from "../../../types/gamesOptionsType";
import { NavigateFunction, useNavigate } from "react-router-dom";
import CommonGameOptionsForm from "../games-options-forms/CommonGameOptionsForm";
import GameInformations from "./GameInformations";
import GameContent from "./GameContent";
import { GameInfoType } from "../../../types/gameInfoType";
import GameForms from "./GameForms";
import GameDifficulty from "./GameDifficulty";

interface GameActionMenu {
  id: number | null;
  handleCloseGameMenu: () => void;
}

const GamesLauncher: FunctionComponent<GameActionMenu> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const { id, handleCloseGameMenu } = props;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<GamesInformation>();
  const [commonGameOptions, setCommonGameOptions] =
    useState<commonGameOptionsType>({});
  const [specificGameOptions, setSpecificGameOptions] = useState<any>({});

  const [gameData, setGameData] = useState<GameInfoType>();
  const [gameContent, setGameContent] = useState<gameContent[]>();

  const [isCustomGame, setIsCustomGame] = useState<boolean>(false);

  const handleStartGame = () => {
    if (selectedGame) {
      if (commonGameOptions || specificGameOptions) {
        navigate(selectedGame?.navigate, {
          state: { commonGameOptions, specificGameOptions },
        });
      } else {
        navigate(selectedGame?.navigate);
      }
    }
  };

  const handleCloseMenu = () => {
    handleCloseGameMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleCloseMenu();
    }
  };

  const handleCustomGameSettingAppear = () => {
    setIsCustomGame((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    const selectedGame = gamesCardData.find(
      (game: GamesInformation) => game.id === id
    );
    setSelectedGame(selectedGame);

    if (selectedGame && selectedGame.getStorageData) {
      const data = selectedGame.getStorageData();
      setGameData(data);
    }

    if (selectedGame && selectedGame.gameContent) {
      const gameContent = selectedGame.gameContent;
      setGameContent(gameContent);
    }
  }, [selectedId]);

  useEffect(() => {
    setSelectedId(id);
  }, []);

  return (
    <div className="game-action-menu">
      <div className="game-action-menu-container" ref={menuRef}>
        <header className="game-action-menu-container-header">
          <div className="game-action-menu-container-header-title">
            <h2>{selectedGame?.name}</h2>
            <i onClick={handleCloseMenu} className="fa-solid fa-xmark"></i>
          </div>
          {gameData && <GameInformations gameInfo={gameData} />}
        </header>
        <main className="game-action-menu-container-main">
          <GameForms
            handleCustomGameSettingAppear={handleCustomGameSettingAppear}
            classNameProps={
              isCustomGame ? "active-gameForms" : "inactive-gameForms"
            }
          >
            <CommonGameOptionsForm
              setOptions={setCommonGameOptions}
              resetForm={isCustomGame}
            />
            {selectedGame?.formComponent && (
              <selectedGame.formComponent
                setOptions={setSpecificGameOptions}
                resetForm={isCustomGame}
              />
            )}
          </GameForms>
          {selectedGame && gameContent && (
            <div className="game-action-menu-container-main-content">
              <GameDifficulty
                difficulty={selectedGame.difficulty}
                difficultyBar={selectedGame.difficultyBar}
                difficultyColor={selectedGame.difficultyColor}
              />
              <GameContent gameContent={gameContent} />
            </div>
          )}
        </main>
        <footer className="game-action-menu-container-footer">
          <div
            style={{ width: isCustomGame ? "100%" : "80%" }}
            className={`game-action-menu-container-footer-default ${
              isCustomGame ? "fm-custom-game" : "fm-default-game"
            }`}
          >
            <button onClick={handleStartGame}>
              start {isCustomGame && "custom"} game{" "}
            </button>
          </div>
          <div
            style={{ width: isCustomGame ? "0%" : "20%" }}
            className="game-action-menu-container-footer-custom"
          >
            <button onClick={handleCustomGameSettingAppear}>
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GamesLauncher;

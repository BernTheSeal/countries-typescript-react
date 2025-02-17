import { useState } from "react";
import Header from "../../components/Header";
import gamesCardData from "../../data/gamesCardData";
import GamesLauncher from "./game-launcher";
import GameCard from "./game-card";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import GameCardWrapper from "./game-card/GameCardWrapper";

const GamesPage = () => {
  const [gameActionMenu, setGameActionMenu] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const pageTitleIcons = [
    { radius: "20px", color: "#fa2828" },
    { radius: "20px", color: "#faf128" },
    { radius: "20px", color: "#1cb319" },
    { radius: "20px", color: "#9d19b3" },
  ];

  const handleOpenGameMenu = (id: number) => {
    setGameActionMenu(true);
    setSelectedId(id);
  };

  const handleCloseGameMenu = () => {
    setGameActionMenu(false);
    setSelectedId(null);
  };

  return (
    <>
      <Header onPage="games" />
      {gameActionMenu && (
        <GamesLauncher
          id={selectedId}
          handleCloseGameMenu={handleCloseGameMenu}
        />
      )}
      <PageContainer>
        <PageTitle title={"games"} icons={pageTitleIcons} />
        <GameCardWrapper>
          {gamesCardData.map((gameCard, index) => (
            <GameCard
              key={index}
              title={gameCard.name}
              openGameMenu={() => handleOpenGameMenu(gameCard.id)}
              storageName={gameCard.storageName}
            />
          ))}
        </GameCardWrapper>
      </PageContainer>
    </>
  );
};

export default GamesPage;

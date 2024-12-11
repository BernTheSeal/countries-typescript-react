import { useState } from "react";
import Header from "../../components/Header";
import gamesCardData from "../../data/gamesCardData";
import GamesLauncher from "./game-launcher";
import GameCard from "./game-card";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";

const GamesPage = () => {
  const [gameActionMenu, setGameActionMenu] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const pageTitleIcon = [{ radius: "20px", color: "red" }];

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
        <PageTitle title={"games"} icons={pageTitleIcon} />
        {gamesCardData.map((gameCard, index) => (
          <GameCard
            key={index}
            title={gameCard.name}
            openGameMenu={() => handleOpenGameMenu(gameCard.id)}
          />
        ))}
      </PageContainer>
    </>
  );
};

export default GamesPage;

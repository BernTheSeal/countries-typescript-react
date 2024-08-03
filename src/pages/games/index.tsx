import { useState } from "react"
import Header from "../../components/Header"
import gamesCardData from "../../data/gamesCardData"
import GameActionMenu from "./GameActionMenu"
import GameCard from "./GameCard"
import PageContainer from "../../components/PageContainer"
import PageTitle from "../../components/PageTitle"

const GamesPage = () => {
    const [gameActionMenu, setGameActionMenu] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleOpenGameMenu = (id: number) => {
        setGameActionMenu(true)
        setSelectedId(id)
    }

    const handleCloseGameMenu = () => {
        console.log('game menu kapandi')
        setGameActionMenu(false)
        setSelectedId(null)
    }

    return (
        <>
            <Header onPage="games" />
            {gameActionMenu && <GameActionMenu id={selectedId} handleCloseGameMenu={handleCloseGameMenu} />}
            <PageContainer>
                <PageTitle title={'games'} />
                {gamesCardData.map((gameCard, index) => (
                    <GameCard
                        key={index}
                        title={gameCard.name}
                        openGameMenu={() => handleOpenGameMenu(gameCard.id)}
                    />
                ))}
            </PageContainer>
        </>
    )
}

export default GamesPage

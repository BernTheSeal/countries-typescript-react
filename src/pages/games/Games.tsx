import { useNavigate, NavigateFunction } from "react-router-dom"
import Header from "../../components/utils/Header"

interface gameMenu {
    name: string,
    onClick: any
}

const Games = () => {
    const navigate: NavigateFunction = useNavigate()
    const gameMenu: gameMenu[] = [
        {
            name: "population showdown",
            onClick: () => navigate('/games/populationShowdown')
        },
        {
            name: "flag match",
            onClick: () => navigate('/games/flagMatch')
        },
        {
            name: "hidden flag",
            onClick: () => navigate('/games/hiddenFlag')
        },
    ]

    return (
        <>
            <Header onPage="games" />
            <div className="games">
                <h2 className="page-title">Games</h2>
                <ul className="games-gamesMenu">
                    {gameMenu.map((game) => (
                        <li className="games-gamesMenu-game" onClick={game.onClick}>{game.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Games

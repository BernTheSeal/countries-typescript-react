import { FunctionComponent, useEffect, useState, useRef } from "react"
import { GamesInformation } from "../../types/gamesCard"
import gamesCardData from "../../data/gamesCardData"
import { NavigateFunction, useNavigate } from "react-router-dom"

interface GameActionMenu {
    id: number | null,
    handleCloseGameMenu: () => void;
}

const GameActionMenu: FunctionComponent<GameActionMenu> = (props) => {
    const navigate: NavigateFunction = useNavigate()
    const menuRef = useRef<HTMLDivElement>(null);

    const { id, handleCloseGameMenu } = props
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [selectedGame, setSelectedGame] = useState<GamesInformation>()

    const handleStartGame = () => {
        if (selectedGame) {
            navigate(selectedGame?.navigate)
        }
    }

    const handleCloseMenu = () => {
        handleCloseGameMenu()
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            handleCloseMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, false)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, false)
        };
    }, [])

    useEffect(() => {
        const selectedGame = gamesCardData.find((game: GamesInformation) => game.id === id)
        setSelectedGame(selectedGame)
    }, [selectedId])

    useEffect(() => {
        setSelectedId(id)
    }, [])

    return (
        <div className="game-action-menu">
            <div className="game-action-menu-container" ref={menuRef}>
                <p>{selectedGame?.name}</p>
                <button onClick={handleCloseMenu}>x</button>
                <br />
                <button onClick={handleStartGame}>start game</button>
            </div>
        </div>
    )
}

export default GameActionMenu

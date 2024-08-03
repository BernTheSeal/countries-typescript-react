import { FunctionComponent, useEffect, useState } from "react"
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate, NavigateFunction } from "react-router-dom"

import useGetGameInfo from "../../hooks/use-getGameInfo";
import useUpdateGameInfo from "../../hooks/use-updateGameInfo";



interface iGameOverProps {
    score: number,
    storageName: string,
    playAgainFunction: any,
}

const GameOver: FunctionComponent<iGameOverProps> = (props) => {
    const { score, storageName, playAgainFunction } = props
    const [gameInfo, setGameInfo] = useState<any>('')
    const [newGameInfo, setNewGameInfo] = useState<any>('')
    const [isHighScore, setIsHighScore] = useState<boolean>(false)
    const [isExploding, setIsExploding] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate()
    const { getGameInfo } = useGetGameInfo()
    const { updateGameInfo } = useUpdateGameInfo()


    const handleGameInfo = () => {
        //!buraya yine hookum gelecek. 
        const gameInfo = getGameInfo(storageName)
        setGameInfo(gameInfo)
    }

    const handleGameOver = () => {
        let playedTime: number = gameInfo.playedTime + 1
        let newTotalScore: number = gameInfo.totalScore + score

        if (score > gameInfo.highScore) {
            setIsHighScore(true)
            setIsExploding(true)
            const newGameInfo = { highScore: score, playedTime: playedTime, totalScore: newTotalScore }
            updateGameInfo(storageName, newGameInfo)
            setNewGameInfo(newGameInfo)
        } else {
            const newGameInfo = { highScore: gameInfo.highScore, playedTime: playedTime, totalScore: newTotalScore }
            updateGameInfo(storageName, newGameInfo)
            setNewGameInfo(newGameInfo)
        }
    }

    const handlePlayAgain = () => {
        playAgainFunction()
    }

    const handleBackToMenu = () => {
        navigate('/games')
    }

    useEffect(() => {
        handleGameInfo()
    }, [])

    useEffect(() => {
        handleGameOver()
    }, [gameInfo])

    return (
        <div className="game-over">
            <div className="game-over-container">
                <div className="game-over-container-score">
                    {isExploding && <ConfettiExplosion force={0.5} duration={3000} particleCount={200} width={1700} />}
                    <h3>You scored:</h3>
                    <h4> {score.toLocaleString()}</h4>
                    {isHighScore && (
                        <div className="game-over-container-score-highScore">
                            <i className="fa-solid fa-crown"></i>
                            <p>New High Score</p>
                        </div>
                    )}
                </div>
                <div className="game-over-container-comment">
                    <p>keep playing. Your current average score is {(newGameInfo.totalScore / newGameInfo.playedTime).toFixed(1)}</p>
                </div>
                <div className="game-over-container-buttons">
                    <button onClick={handleBackToMenu}>
                        Back to menu
                    </button>
                    <button onClick={handlePlayAgain}>
                        Play again
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOver
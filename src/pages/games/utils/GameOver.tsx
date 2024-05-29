import { FunctionComponent, useEffect, useState } from "react"

interface iGameOverProps {
    score: number,
    storageName: string,
    gameName: string,
    playAgainFunction: any,
    time?: number
}

const GameOver: FunctionComponent<iGameOverProps> = (props) => {

    //todo : eger highscore olursa konfeti patlasin. 
    //todo: ortalama skore yazsin. buna gore kullaniciya bir seyler denebilir. ort : 100 ve su anki score 10 ise bu ortalamanin cok altidir ve ona gore 
    //todo : bir seyler denebilir? yuzdelik dilime gore olsun. yuzde 10 yuzde 30 yuzde 50 yuzde 100 vs vs gitsin. diyecek bir seyler bul.

    const { score, storageName, gameName, time, playAgainFunction } = props
    const [gameInfo, setGameInfo] = useState<any>('')
    const [isHighScore, setIsHighScore] = useState<boolean>(false)

    const getPlayerInfo = () => {
        const gameInfo = JSON.parse(localStorage.getItem(storageName) || '{"highScore": 0, "playedTime": 0, "totalScore": 0}')
        setGameInfo(gameInfo)
    }

    const handleGameOver = () => {
        let playedTime: number = gameInfo.playedTime + 1
        if (score > gameInfo.highScore) {
            setIsHighScore(true)
            const updatedGameInfo = { highScore: score, playedTime: playedTime }
            localStorage.setItem(storageName, JSON.stringify(updatedGameInfo))
        } else {
            const updatedGameInfo = { highScore: gameInfo.highScore, playedTime: playedTime }
            localStorage.setItem(storageName, JSON.stringify(updatedGameInfo))
        }
    }

    const handlePlayAgain = () => {
        playAgainFunction()
    }

    useEffect(() => {
        getPlayerInfo()
    }, [])
    useEffect(() => {
        handleGameOver()
    }, [gameInfo])

    return (
        <div>
            <h3>{gameName}</h3>
            <h4>{time === 0 ? 'TIMES UP' : 'get better another time'}</h4>
            <p>score: {score} {isHighScore ? 'new high score ##' : null}</p>
            <div>
                <button onClick={handlePlayAgain}>
                    play again
                </button>
                <button>
                    games menu
                </button>
            </div>
        </div>
    )
}

export default GameOver

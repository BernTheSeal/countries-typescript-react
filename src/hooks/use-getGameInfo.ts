import { useEffect, useState } from "react";
import gameInfoData from "../data/gameInfoData";
import { GameInfoType } from "../types/gameInfoType";

const useGetGameInfo = (gameKey: string) => {
    const [gameInfo, setGameInfo] = useState<GameInfoType>(gameInfoData)
    const [trigger, setTrigger] = useState<number>(0)

    const getGameInfo = () => {
        const games = JSON.parse(localStorage.getItem('gamesData') || '{}')
        const gameInfo = games[gameKey] || gameInfoData
        setGameInfo(gameInfo)
    };

    useEffect(() => {
        getGameInfo()
    }, [trigger])

    const handleTrigger = () => {
        setTrigger(prev => prev + 1)
    }

    return { gameInfo, getGameInfo, gameInfotTrigger: handleTrigger }
}
export default useGetGameInfo
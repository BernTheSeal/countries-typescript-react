import { GameInfoType } from "../types/gameInfoType";

const data: GameInfoType = { highScore: 0, playedTime: 0, totalScore: 0 }

const useGetGameInfo = () => {
    const getGameInfo = (gameKey: string) => {
        const games = JSON.parse(localStorage.getItem('gamesData') || '{}')
        const gameInfo = games[gameKey] || data
        return gameInfo
    };

    return { getGameInfo }
}
export default useGetGameInfo
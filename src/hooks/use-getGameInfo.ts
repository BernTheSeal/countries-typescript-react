import gameInfoData from "../data/gameInfoData";

const useGetGameInfo = () => {
    const getGameInfo = (gameKey: string) => {
        const games = JSON.parse(localStorage.getItem('gamesData') || '{}')
        const gameInfo = games[gameKey] || gameInfoData
        return gameInfo
    };

    return { getGameInfo }
}
export default useGetGameInfo
const useGetPlayerInfo = () => {
    const getPlayerInfo = (gameKey: string) => {
        const games = JSON.parse(localStorage.getItem('games') || '{}');
        const gameInfo = games[gameKey] || { highScore: 0, playedTime: 0, totalScore: 0 };
        return gameInfo;
    };

    return { getPlayerInfo };
};

export default useGetPlayerInfo;
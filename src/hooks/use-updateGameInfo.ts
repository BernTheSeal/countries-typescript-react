const useUpdateGameInfo = () => {
    const updateGameInfo = (gameKey: string, newInfo: any) => {
        const games = JSON.parse(localStorage.getItem('gamesData') || '{}');
        const game = games[gameKey] || {};

        games[gameKey] = { ...game, ...newInfo };
        localStorage.setItem('gamesData', JSON.stringify(games));
    };

    return { updateGameInfo };
};

export default useUpdateGameInfo;
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Countries from "../pages/countries/Countries";
import Details from "../pages/details/Details";
import GamesPage from "../pages/games";

import PopulationShowdown from "../game-modes/population-showdown";
import FlagMatch from "../game-modes/flag-match";
import HiddenFlag from "../game-modes/hidden-flag";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/countries',
        element: <Countries />,
    },
    {
        path: 'countries/:name',
        element: <Details />
    },
    {
        path: 'games',
        element: <GamesPage />
    },
    {
        path: 'games/populationShowdown',
        element: <PopulationShowdown />
    },
    {
        path: 'games/flagMatch',
        element: <FlagMatch />
    },
    {
        path: 'games/hiddenFlag',
        element: <HiddenFlag />
    }
]);

export default routes;
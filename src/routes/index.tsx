import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Countries from "../pages/countries/Countries";
import Details from "../pages/details/Details";
import Games from "../pages/games/Games";
import PopulationShowdown from "../pages/games/game-modes/population-showdown";
import FlagMatch from "../pages/games/game-modes/flag-match";
import HiddenFlag from "../pages/games/game-modes/hidden-flag";

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
        element: <Games />
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
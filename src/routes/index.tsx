import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Countries from "../pages/countries/Countries";
import Details from "../pages/details/Details";
import Games from "../pages/games/Games";
import PopulationShowdown from "../pages/games/components/PopulationShowdown";

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
    }
]);

export default routes;
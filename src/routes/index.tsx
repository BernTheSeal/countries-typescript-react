import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Countries from "../pages/countries/Countries";
import Details from "../pages/details";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/countries',
        element: <Countries />
    },
    {
        path: '/details',
        element: <Details />
    }
]);

export default routes;
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";

const Home = lazy(() => import("../pages/home"));
const Countries = lazy(() => import("../pages/countries-page"));
const Details = lazy(() => import("../pages/details/Details"));
const GamesPage = lazy(() => import("../pages/games"));

const PopulationShowdown = lazy(
  () => import("../game-modes/population-showdown")
);
const FlagMatch = lazy(() => import("../game-modes/flag-match"));
const HiddenFlag = lazy(() => import("../game-modes/hidden-flag"));

const withSuspense = (Component: React.FunctionComponent) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routeConfig = [
  { path: "/", element: Home },
  { path: "/countries", element: Countries },
  { path: "countries/:name", element: Details },
  { path: "games", element: GamesPage },
  { path: "games/populationShowdown", element: PopulationShowdown },
  { path: "games/flagMatch", element: FlagMatch },
  { path: "games/hiddenFlag", element: HiddenFlag },
];

const routes = createBrowserRouter(
  routeConfig.map((route) => ({
    path: route.path,
    element: withSuspense(route.element),
  }))
);

export default routes;

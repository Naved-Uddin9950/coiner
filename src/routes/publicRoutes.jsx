import MainScreen from "../pages/MainScreen";
import Game from "../pages/Game";
import { ROUTES } from "../utils/routeConstants";

export const publicRoutes = [
  {
    path: ROUTES.MAIN_SCREEN,
    component: MainScreen,
    exact: true,
  },
  {
    path: ROUTES.GAME,
    component: Game,
    exact: true,
  },
];

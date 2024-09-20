import { Route } from "react-router-dom";
import Login from "./app/common/Login";

import BackTestPage from "./app/BackTest/BackTestPage";
import StrategyDiscovery from "./app/StrategyDiscovery/StrategyDiscovery";
import PublicSidebarRoute from "./utils/PublicSidebarRoute";
import SignUpPage from "./app/SignUpPage/SignUpPage";
const routes = [
  {
    path: "/",
    name: "Login",
    type: Route,
    component: Login,
  },

  {
    path: "/strategy-builder",
    name: "Strategy Builder Page",
    type: PublicSidebarRoute,
    component: BackTestPage,
  },
  {
    path: "/sign-up",
    name: "Sign Up Page",
    type: PublicSidebarRoute,
    component: SignUpPage,
  },
  {
    path: "/home",
    name: "Strategy Discovery Page",
    type: PublicSidebarRoute,
    component: StrategyDiscovery,
  },
];
export default routes;

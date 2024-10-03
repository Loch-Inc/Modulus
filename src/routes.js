import BackTestPage from "./app/BackTest/BackTestPage";
import LeaderboardPage from "./app/LeaderboardPage/LeaderboardPage";
import ModulusHome from "./app/ModulusHome/ModulusHome";
import ProfilePage from "./app/ProfilePage/ProfilePage";
import SignInPage from "./app/SignInUpPage/SignInPage/SignInPage";
import SignUpPage from "./app/SignInUpPage/SignUpPage/SignUpPage";
import StrategyDiscovery from "./app/StrategyDiscovery/StrategyDiscovery";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
const routes = [
  {
    path: "/",
    name: "Modulus Home",
    type: PrivateRoute,
    component: ModulusHome,
  },
  {
    path: "/home",
    name: "Modulus Home",
    type: PrivateRoute,
    component: ModulusHome,
  },
  {
    path: "/discover",
    name: "Strategy Discovery Page",
    type: PrivateRoute,
    component: StrategyDiscovery,
  },
  {
    path: "/builder",
    name: "Strategy Builder Page",
    type: PrivateRoute,
    component: BackTestPage,
  },
  {
    path: "/sign-up",
    name: "Sign Up Page",
    type: PublicRoute,
    component: SignUpPage,
  },
  {
    path: "/sign-in",
    name: "Sign In Page",
    type: PublicRoute,
    component: SignInPage,
  },
  {
    path: "/profile",
    name: "Profile Page",
    type: PrivateRoute,
    component: ProfilePage,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard Page",
    type: PublicRoute,
    component: LeaderboardPage,
  },
];
export default routes;

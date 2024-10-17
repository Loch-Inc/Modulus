import BackTestPage from "./app/BackTest/BackTestPage";
import InAppTelegramChat from "./app/IntegratedTelegramChat/IntegratedTelegramChat";
import LeaderboardPage from "./app/LeaderboardPage/LeaderboardPage";
import ModulusHome from "./app/ModulusHome/ModulusHome";
import ProfilePage from "./app/ProfilePage/ProfilePage";
import ShareStrategy from "./app/ShareStrategy/ShareStrategy";
import SignInPage from "./app/SignInUpPage/SignInPage/SignInPage";
import SignUpPage from "./app/SignInUpPage/SignUpPage/SignUpPage";
import StrategyDiscovery from "./app/StrategyDiscovery/StrategyDiscovery";
import TermsAndConditionsPage from "./app/TermsAndConditions/TermsAndConditions";
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
  {
    path: "/terms-and-conditions",
    name: "Leaderboard Page",
    type: PublicRoute,
    component: TermsAndConditionsPage,
  },
  {
    path: "/telegram-chat",
    name: "Telegram Chat",
    type: PrivateRoute,
    component: InAppTelegramChat,
  },
  {
    path: "/share",
    name: "Share Strategy",
    type: PublicRoute,
    component: ShareStrategy,
  },
];
export default routes;

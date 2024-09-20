import { combineReducers } from "redux";
/* PLOP_INJECT_REDUCER_IMPORT */

import { ProfileReducer } from "../app/profile";

import {
  HeaderReducer,
  IsWalletConnectedReducer,
  MetamaskConnectedReducer,
} from "../app//header/HeaderReducer";
import {
  AddLocalAddWalletReducer,
  CommonReducer,
  UserPaymentReducer,
} from "../app/common/CommonReducer";
import { HomeReducer } from "../app/home";
import {
  InflowOutflowAssetListReducer,
  InflowOutflowChartReducer,
  InflowOutflowSelectedAssetReducer,
  InflowOutflowTimeTabReducer,
  InflowOutflowWalletReducer,
} from "../app/intelligence/InflowOutflowReducer";
import IntelligenceReducer from "../app/intelligence/IntelligenceReducer";
import OnboardingReducer from "../app/onboarding/OnboardingReducer";
import PortfolioReducer from "../app/Portfolio/PortfolioReducer";
import LochUserReducer from "../app/profile/LochUserReducer";

import {
  BackTestChartReducer,
  BackTestLatestStrategyReducer,
  BackTestQueryReducer,
  BackTestTableReducer,
} from "../app/BackTest/Api/BackTestReducer";
import DarkModeReducer from "../app/intelligence/darkMode";
import { ReferralCodesReducer } from "../app/ReferralCodes/ReferralCodesReducer";
import { StrategyDiscoveryTableReducer } from "../app/StrategyDiscovery/Api/StrategyDiscoveryReducer";
import WalletReducer from "../app/wallet/WalletReducer";

export default combineReducers({
  HeaderState: HeaderReducer,
  IsWalletConnectedState: IsWalletConnectedReducer,
  MetamaskConnectedState: MetamaskConnectedReducer,

  ProfileState: ProfileReducer,
  CommonState: CommonReducer,
  BackTestChartState: BackTestChartReducer,
  BackTestTableState: BackTestTableReducer,
  StrategyDiscoveryTableState: StrategyDiscoveryTableReducer,
  BackTestQueryState: BackTestQueryReducer,
  BackTestLatestStrategyState: BackTestLatestStrategyReducer,
  UserPaymentState: UserPaymentReducer,
  LochUserState: LochUserReducer,
  HomeState: HomeReducer,
  OnboardingState: OnboardingReducer,
  PortfolioState: PortfolioReducer,
  WalletState: WalletReducer,
  IntelligenceState: IntelligenceReducer,
  darkModeState: DarkModeReducer,
  InflowOutflowSelectedAssetState: InflowOutflowSelectedAssetReducer,
  InflowOutflowAssetListState: InflowOutflowAssetListReducer,
  InflowOutflowChartState: InflowOutflowChartReducer,
  InflowOutflowWalletState: InflowOutflowWalletReducer,
  InflowOutflowTimeTabState: InflowOutflowTimeTabReducer,
  AddLocalAddWalletState: AddLocalAddWalletReducer,

  ReferralCodesState: ReferralCodesReducer,
});

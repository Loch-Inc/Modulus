//Api Config
import Mixpanel from "mixpanel-browser";
import { mobileCheck } from "./ReusableFunctions";

export const initMixpanel = () => {
  Mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, {
    loaded: function (mixpanel) {},
  });
};

// send Aplitude Data
export const sendMixpanelData = (eventType, eventProperties) => {
  let newEventProperties = {
    ...eventProperties,
    isMobile: mobileCheck(),
  };
  Mixpanel.track(eventType, newEventProperties);
};

export const ModulusWebsiteView = ({ email_address }) => {
  const event_name = "Modulus: Website View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

//Discover Page
export const DiscoverPageView = ({ email_address }) => {
  const event_name = "Discover: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const DiscoverTablePageChanged = ({ email_address, page }) => {
  const event_name = "Discover: Table: Page Changed";
  const eventProperties = {
    "email address": email_address,
    page: page,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const DiscoverCreateYourAlgoStrategy = ({ email_address }) => {
  const event_name = "Discover: Create Your Own Algorithmic Strategy Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const DiscoverSortTable = ({ email_address, sortType, sortBy }) => {
  const event_name = "Discover: Table Sorted";
  const eventProperties = {
    "email address": email_address,
    "sort type": sortType,
    "sort by": sortBy,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const DiscoverStrategyClicked = ({ email_address, strategy_name }) => {
  const event_name = "Discover: Strategy Clicked";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategy_name,
  };
  sendMixpanelData(event_name, eventProperties);
};

//Discover Page

//Builder Page
export const BuilderPageView = ({ email_address }) => {
  const event_name = "Builder: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderChartInfoHover = ({ email_address }) => {
  const event_name = "Builder: Visualization: Info hover";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPerformanceMetricsTableSorted = ({
  email_address,
  sortType,
  sortBy,
}) => {
  const event_name = "Builder: Performance Metrics: Table Sorted";
  const eventProperties = {
    "email address": email_address,
    "sort type": sortType,
    "sort by": sortBy,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderChartAddAssets = ({ email_address, assets }) => {
  const event_name = "Builder: Visualization: Benchmark Changed";
  const eventProperties = {
    "email address": email_address,
    "assets list": assets,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderTableChangeDate = ({ email_address, fromDate, toDate }) => {
  const event_name = "Builder: Performance Metrics: Change Date";
  const eventProperties = {
    "email address": email_address,
    "from date": fromDate,
    "to date": toDate,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderRenameClicked = ({ email_address }) => {
  const event_name = "Builder: Rename Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderStrategySaved = ({ email_address, strategyName }) => {
  const event_name = "Builder: Strategy Created";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategyName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderStrategyEdited = ({ email_address, strategyName }) => {
  const event_name = "Builder: Strategy Updated";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategyName,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const BuilderUndoClicked = ({ email_address }) => {
  const event_name = "Builder: Undo Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const BuilderRedoClicked = ({ email_address }) => {
  const event_name = "Builder: Redo Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const BuilderFirstAssetBlockAdded = ({ email_address }) => {
  const event_name = "Builder: First Asset Block Added";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderFirstConditionBlockAdded = ({ email_address }) => {
  const event_name = "Builder: First Condition Block Added";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionCloseClicked = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Close Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionAddClicked = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Check Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionFirstFunctionSelected = ({
  email_address,
  functionName,
}) => {
  const event_name = "Builder: Pop Up: Condition: First Function Selected";
  const eventProperties = {
    "email address": email_address,
    "function name": functionName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionSecondFunctionSelected = ({
  email_address,
  functionName,
}) => {
  const event_name = "Builder: Pop Up: Condition: Second Function Selected";
  const eventProperties = {
    "email address": email_address,
    "function name": functionName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionFirstAssetSelected = ({
  email_address,
  assetName,
}) => {
  const event_name = "Builder: Pop Up: Condition: First Asset Selected";
  const eventProperties = {
    "email address": email_address,
    "asset name": assetName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionSecondAssetSelected = ({
  email_address,
  assetName,
}) => {
  const event_name = "Builder: Pop Up: Condition: Second Asset Selected";
  const eventProperties = {
    "email address": email_address,
    "asset name": assetName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionFirstDaysChanged = ({
  email_address,
  days,
}) => {
  const event_name = "Builder: Pop Up: Condition: First Days Changed";
  const eventProperties = {
    "email address": email_address,
    days: days,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionSecondDaysChanged = ({
  email_address,
  days,
}) => {
  const event_name = "Builder: Pop Up: Condition: Second Days Changed";
  const eventProperties = {
    "email address": email_address,
    days: days,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionOperatorSelected = ({
  email_address,
  operatorName,
}) => {
  const event_name = "Builder: Pop Up: Condition: Operator Selected";
  const eventProperties = {
    "email address": email_address,
    "operator name": operatorName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionAmountChanged = ({
  email_address,
  amount,
}) => {
  const event_name = "Builder: Pop Up: Condition: Amount Changed";
  const eventProperties = {
    "email address": email_address,
    amount: amount,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpConditionFixedValueSelected = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Fixed Value Selected";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const BuilderAddBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Add Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderEditBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Edit Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderCopyBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Copy Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderDeleteBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Delete Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderAddBellowAssetClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Asset Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderAddBellowConditionClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Condition Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderAddBellowPasteClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Paste Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpAssetAssetSelected = ({
  email_address,
  assetName,
}) => {
  const event_name = "Builder: Pop Up: Asset: Asset Selected";
  const eventProperties = {
    "email address": email_address,
    "asset name": assetName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderPopUpWeightPercentageChanged = ({
  email_address,
  weightName,
}) => {
  const event_name = "Builder: Pop Up: Weight Percentage: Percentage Changed";
  const eventProperties = {
    "email address": email_address,
    "weight name": weightName,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderToggleCollapseWeightPercentage = ({
  email_address,
  isCollapsed,
}) => {
  const event_name = "Builder: Toggle Collapse: Weight Percentage";
  const eventProperties = {
    "email address": email_address,
    "is collapsed": isCollapsed,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderToggleCollapseIf = ({ email_address, isCollapsed }) => {
  const event_name = "Builder: Toggle Collapse: If";
  const eventProperties = {
    "email address": email_address,
    "is collapsed": isCollapsed,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const BuilderToggleCollapseElse = ({ email_address, isCollapsed }) => {
  const event_name = "Builder: Toggle Collapse: Else";
  const eventProperties = {
    "email address": email_address,
    "is collapsed": isCollapsed,
  };
  sendMixpanelData(event_name, eventProperties);
};

//Builder Page

// Profile Page
export const ProfilePageView = ({ email_address }) => {
  const event_name = "Profile: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileTablePageChanged = ({ email_address, page }) => {
  const event_name = "Profile: Table: Page Changed";
  const eventProperties = {
    "email address": email_address,
    page: page,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileShareReferralCodeClicked = ({ email_address }) => {
  const event_name = "Profile: Share Referral Code Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileReferralCodeCopied = ({ email_address, referralCode }) => {
  const event_name = "Profile: Referral Code Copied";
  const eventProperties = {
    "email address": email_address,
    "referral code": referralCode,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileAllReferralCodesCopied = ({ email_address }) => {
  const event_name = "Profile: All Referral Codes Copied";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileEditUsernameClicked = ({ email_address }) => {
  const event_name = "Profile: Edit Username Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const ProfileUsernameEdited = ({ email_address, username }) => {
  const event_name = "Profile: Username Edited";
  const eventProperties = {
    "email address": email_address,
    username: username,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileSignOutClicked = ({ email_address }) => {
  const event_name = "Profile: Sign Out Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ProfileSignedOut = ({ email_address }) => {
  const event_name = "Profile: Signed Out";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

// Profile Page
// Leaderboard Page
export const LeaderboardPageView = ({ email_address }) => {
  const event_name = "Leaderboard: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
// Leaderboard Page

// Top Bar

export const TopBarDiscoverClicked = ({ email_address }) => {
  const event_name = "Top Bar: Discover Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarLeaderboardClicked = ({ email_address }) => {
  const event_name = "Top Bar: Leaderboard Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarBuilderClicked = ({ email_address }) => {
  const event_name = "Top Bar: Builder Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarConnectClicked = ({ email_address }) => {
  const event_name = "Top Bar: Connect Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarFeedbackClicked = ({ email_address }) => {
  const event_name = "Top Bar: Feedback Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarProfileClicked = ({ email_address }) => {
  const event_name = "Top Bar: Profile Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarSignOutClicked = ({ email_address }) => {
  const event_name = "Top Bar: Sign Out Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarSignedOut = ({ email_address }) => {
  const event_name = "Top Bar: Signed Out";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

export const TopBarSignInClicked = ({ email_address }) => {
  const event_name = "Top Bar: Sign In Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const TopBarHomeClicked = ({ email_address }) => {
  const event_name = "Top Bar: Home Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

// Top Bar

// Sign In Page
export const SignInPageView = () => {
  const event_name = "Sign In: Page View";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties);
};
export const SignInVerifyAccountPageView = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignInVerifyAccountSendCodeAgainClicked = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Send Code Again Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignInVerifyAccountGoBack = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignedIn = ({ email_address }) => {
  const event_name = "Sign In: Signed In";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

// Sign In Page

// Sign Up Page
export const SignUpPageView = () => {
  const event_name = "Sign Up: Page View";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpTermsAndConditionsClicked = () => {
  const event_name = "Sign Up: Terms and Conditions Clicked";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties);
};

export const SignUpReferralCodePageView = ({ email_address }) => {
  const event_name = "Sign Up: Referral Code: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpReferralCodeGoBack = ({ email_address }) => {
  const event_name = "Sign Up: Referral Code: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpVerifyAccountPageView = ({ email_address }) => {
  const event_name = "Sign Up: Verify Account: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpVerifyAccountGoBack = ({ email_address }) => {
  const event_name = "Sign Up: Verify Account: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignedUp = ({ email_address }) => {
  const event_name = "Sign Up: Signed Up";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};

// Sign Up Page

// API Fail Check
// Sign In
export const SignInApiCallFailed = ({ email_address, error_message }) => {
  const event_name = "Sign In: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignInVerifyOtpApiCallFailed = ({
  email_address,
  error_message,
}) => {
  const event_name = "Sign In: Verify OTP: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties);
};
// Sign In

// Sign Up
export const SignUpApiCallFailed = ({ email_address, error_message }) => {
  const event_name = "Sign Up: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpVerifyReferralCodeApiCallFailed = ({
  email_address,
  error_message,
}) => {
  const event_name = "Sign Up: Verify Referral Code: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const SignUpVerifyOtpApiCallFailed = ({
  email_address,
  error_message,
}) => {
  const event_name = "Sign Up: Verify OTP: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties);
};
// Sign Up
// Modulus Builder
export const ModulusBuilderCreateStrategyApiCallFailed = ({
  email_address,
}) => {
  const event_name = "Modulus Builder: Create Strategy: API Call Failed";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const ModulusBuilderUpdateStrategyApiCallFailed = ({
  email_address,
  strategy_id,
}) => {
  const event_name = "Modulus Builder: Update Strategy: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "strategy id": strategy_id,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const PerformanceVisualizationApiCallFailed = ({
  email_address,
  assets,
  strategy_id,
}) => {
  const event_name =
    "Modulus Builder: Performance Visualization: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    assets: assets,
    "strategy id": strategy_id,
  };
  sendMixpanelData(event_name, eventProperties);
};
export const PerformanceMetricsApiCallFailed = ({
  email_address,
  assets,
  strategy_id,
}) => {
  const event_name = "Modulus Builder: Performance Metrics: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    assets: assets,
    "strategy id": strategy_id,
  };
  sendMixpanelData(event_name, eventProperties);
};

// Modulus Builder
// API Fail Check

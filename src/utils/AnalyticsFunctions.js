//Api Config
import Mixpanel from "mixpanel-browser";
import { mobileCheck } from "./ReusableFunctions";

export const initMixpanel = () => {
  Mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, {
    loaded: function (mixpanel) {},
  });
};
export const setMixpanelDataPoints = (email_address) => {
  Mixpanel.alias(email_address);
  Mixpanel.identify(email_address);
  Mixpanel.people.set({
    $email: email_address,
    $user_id: email_address,
    $distinct_id: email_address,
  });
};

// send Aplitude Data
export const sendMixpanelData = (eventType, eventProperties, email_address) => {
  let newEventProperties = {
    ...eventProperties,
    isMobile: mobileCheck(),
    distinct_id: email_address ? email_address : "",
  };
  Mixpanel.track(eventType, newEventProperties);
};

export const ModulusWebsiteView = ({ email_address }) => {
  const event_name = "Modulus: Website View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

//Discover Page
export const DiscoverPageView = ({ email_address }) => {
  const event_name = "Discover: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const DiscoverTablePageChanged = ({ email_address, page }) => {
  const event_name = "Discover: Table: Page Changed";
  const eventProperties = {
    "email address": email_address,
    page: page,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const DiscoverCreateYourAlgoStrategy = ({ email_address }) => {
  const event_name = "Discover: Create Your Own Algorithmic Strategy Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const DiscoverSortTable = ({ email_address, sortType, sortBy }) => {
  const event_name = "Discover: Table Sorted";
  const eventProperties = {
    "email address": email_address,
    "sort type": sortType,
    "sort by": sortBy,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const DiscoverStrategyClicked = ({ email_address, strategy_name }) => {
  const event_name = "Discover: Strategy Clicked";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategy_name,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

//Discover Page

//Builder Page
export const BuilderPageView = ({ email_address }) => {
  const event_name = "Builder: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderChartInfoHover = ({ email_address }) => {
  const event_name = "Builder: Visualization: Info hover";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderChartAddAssets = ({ email_address, assets }) => {
  const event_name = "Builder: Visualization: Benchmark Changed";
  const eventProperties = {
    "email address": email_address,
    "assets list": assets,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderTableChangeDate = ({ email_address, fromDate, toDate }) => {
  const event_name = "Builder: Performance Metrics: Change Date";
  const eventProperties = {
    "email address": email_address,
    "from date": fromDate,
    "to date": toDate,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderRenameClicked = ({ email_address }) => {
  const event_name = "Builder: Rename Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderStrategySaved = ({ email_address, strategyName }) => {
  const event_name = "Builder: Strategy Created";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategyName,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderStrategyEdited = ({ email_address, strategyName }) => {
  const event_name = "Builder: Strategy Updated";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategyName,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const BuilderUndoClicked = ({ email_address }) => {
  const event_name = "Builder: Undo Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const BuilderRedoClicked = ({ email_address }) => {
  const event_name = "Builder: Redo Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const BuilderFirstAssetBlockAdded = ({ email_address }) => {
  const event_name = "Builder: First Asset Block Added";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderFirstConditionBlockAdded = ({ email_address }) => {
  const event_name = "Builder: First Condition Block Added";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderPopUpConditionCloseClicked = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Close Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderPopUpConditionAddClicked = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Check Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderPopUpConditionFixedValueSelected = ({ email_address }) => {
  const event_name = "Builder: Pop Up: Condition: Fixed Value Selected";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const BuilderAddBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Add Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderEditBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Edit Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderCopyBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Copy Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderDeleteBlockClicked = ({ email_address }) => {
  const event_name = "Builder: Delete Block Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderAddBellowAssetClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Asset Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderAddBellowConditionClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Condition Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderAddBellowPasteClicked = ({ email_address }) => {
  const event_name = "Builder: Add Below: Paste Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderToggleCollapseIf = ({ email_address, isCollapsed }) => {
  const event_name = "Builder: Toggle Collapse: If";
  const eventProperties = {
    "email address": email_address,
    "is collapsed": isCollapsed,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderToggleCollapseElse = ({ email_address, isCollapsed }) => {
  const event_name = "Builder: Toggle Collapse: Else";
  const eventProperties = {
    "email address": email_address,
    "is collapsed": isCollapsed,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const BuilderShareStrategyClicked = ({
  email_address,
  strategyName,
  strategyId,
}) => {
  const event_name = "Builder: Share Strategy Clicked";
  const eventProperties = {
    "email address": email_address,
    "strategy name": strategyName,
    "strategy id": strategyId,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const BuilderSharedStrategyOpened = ({ email_address, strategyId }) => {
  const event_name = "Builder: Shared Strategy Opened";
  const eventProperties = {
    "email address": email_address,
    "strategy id": strategyId,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

//Builder Page

// Profile Page
export const ProfilePageView = ({ email_address }) => {
  const event_name = "Profile: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileTablePageChanged = ({ email_address, page }) => {
  const event_name = "Profile: Table: Page Changed";
  const eventProperties = {
    "email address": email_address,
    page: page,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileInviteAFriendClicked = ({ email_address }) => {
  const event_name = "Profile: Invite a friend Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileShareReferralCodeClicked = ({ email_address }) => {
  const event_name = "Profile: Share Referral Code Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileReferralCodeCopied = ({ email_address, referralCode }) => {
  const event_name = "Profile: Referral Code Copied";
  const eventProperties = {
    "email address": email_address,
    "referral code": referralCode,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileAllReferralCodesCopied = ({ email_address }) => {
  const event_name = "Profile: All Referral Codes Copied";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileEditUsernameClicked = ({ email_address }) => {
  const event_name = "Profile: Edit Username Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const ProfileUsernameEdited = ({ email_address, username }) => {
  const event_name = "Profile: Username Edited";
  const eventProperties = {
    "email address": email_address,
    username: username,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileSignOutClicked = ({ email_address }) => {
  const event_name = "Profile: Sign Out Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const ProfileSignedOut = ({ email_address }) => {
  const event_name = "Profile: Signed Out";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

// Profile Page
// Leaderboard Page
export const LeaderboardPageView = ({ email_address }) => {
  const event_name = "Leaderboard: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
// Leaderboard Page

// Top Bar

export const TopBarDiscoverClicked = ({ email_address }) => {
  const event_name = "Top Bar: Discover Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarLeaderboardClicked = ({ email_address }) => {
  const event_name = "Top Bar: Leaderboard Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarBuilderClicked = ({ email_address }) => {
  const event_name = "Top Bar: Builder Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarConnectClicked = ({ email_address }) => {
  const event_name = "Top Bar: Connect Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarFeedbackClicked = ({ email_address }) => {
  const event_name = "Top Bar: Feedback Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarProfileClicked = ({ email_address }) => {
  const event_name = "Top Bar: Profile Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarSignOutClicked = ({ email_address }) => {
  const event_name = "Top Bar: Sign Out Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarSignedOut = ({ email_address }) => {
  const event_name = "Top Bar: Signed Out";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

export const TopBarSignInClicked = ({ email_address }) => {
  const event_name = "Top Bar: Sign In Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const TopBarHomeClicked = ({ email_address }) => {
  const event_name = "Top Bar: Home Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

// Top Bar

// Sign In Page
export const SignInPageView = () => {
  const event_name = "Sign In: Page View";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties, "");
};
export const SignInVerifyAccountPageView = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignInVerifyAccountSendCodeAgainClicked = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Send Code Again Clicked";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignInVerifyAccountGoBack = ({ email_address }) => {
  const event_name = "Sign In: Verify Account: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignedIn = ({ email_address }) => {
  Mixpanel.alias(email_address);
  Mixpanel.identify(email_address);
  Mixpanel.people.set({
    $email: email_address,
    $user_id: email_address,
    $distinct_id: email_address,
  });
  const event_name = "Sign In: Signed In";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};

// Sign In Page

// Sign Up Page
export const SignUpPageView = () => {
  const event_name = "Sign Up: Page View";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties, "");
};
export const SignUpTermsAndConditionsClicked = () => {
  const event_name = "Sign Up: Terms and Conditions Clicked";
  const eventProperties = {};
  sendMixpanelData(event_name, eventProperties, "");
};

export const SignUpReferralCodePageView = ({ email_address }) => {
  const event_name = "Sign Up: Referral Code: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignUpReferralCodeGoBack = ({ email_address }) => {
  const event_name = "Sign Up: Referral Code: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignUpVerifyAccountPageView = ({ email_address }) => {
  const event_name = "Sign Up: Verify Account: Page View";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignUpVerifyAccountGoBack = ({ email_address }) => {
  const event_name = "Sign Up: Verify Account: Go Back";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
};
export const SignedUp = ({ email_address }) => {
  Mixpanel.alias(email_address);
  Mixpanel.identify(email_address);
  Mixpanel.people.set({
    $email: email_address,
    $user_id: email_address,
    $distinct_id: email_address,
  });
  const event_name = "Sign Up: Signed Up";
  const eventProperties = {
    "email address": email_address,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
};
// Sign In

// Sign Up
export const SignUpApiCallFailed = ({ email_address, error_message }) => {
  const event_name = "Sign Up: API Call Failed";
  const eventProperties = {
    "email address": email_address,
    "error message": error_message,
  };
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
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
  sendMixpanelData(event_name, eventProperties, email_address);
};

// Modulus Builder
// API Fail Check

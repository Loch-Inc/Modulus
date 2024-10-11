import Mixpanel from "mixpanel-browser";
import { deleteToken } from "./ManageToken";

//Api Config
export const initAmplitudeAnalytics = () => {
  // amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_KEY);
};
export const initAmplitude = () => {
  // amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_KEY);
  // Mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, {
  //   loaded: function (mixpanel) {
  //     // let distinct_id = mixpanel.get_distinct_id();
  //     // // Mixpanel.alias("test");
  //     // Mixpanel.identify(distinct_id);
  //     //  mixpanel.people.set({
  //     //   //  $first_name: "Test",
  //     //   //  $last_name: "Test",
  //     //   //  $email: "Test",
  //     //  });
  //   },
  // });
};

// send Aplitude Data
export const sendAmplitudeData = (eventType, eventProperties) => {
  // amplitude.getInstance().logEvent(eventType, eventProperties);
  // let baseToken = window.localStorage.getItem("baseToken");
  // let newEventProperties = {
  //   ...eventProperties,
  //   access_code: baseToken,
  //   isMobile: mobileCheck(),
  // };
  // Mixpanel.track(eventType, newEventProperties);
  // if (amplitude.getInstance()) {
  //   amplitude.getInstance().logEvent(eventType, newEventProperties);
  // }
};

export const CopyTradeWelcomeAddressAdded = ({
  session_id,
  email_address,
  page,
}) => {
  const event_name = "Copy Trade: Welcome: address added";
  const eventProperties = {
    "session id": session_id,
    "email address": email_address,
    page: page,
  };
  sendAmplitudeData(event_name, eventProperties);
};

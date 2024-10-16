import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

import { getToken } from "./ManageToken";
import { removeSessionSavedStrategyId } from "./ReusableFunctions";

// import { DiscoverPageView } from "./AnalyticsFunctions";

const PrivateRoute = ({
  component: Component,

  ...rest
}) => {
  const [token] = useState(getToken());

  useEffect(() => {
    if (rest.path !== "/builder") {
      removeSessionSavedStrategyId();
    }
  }, [rest.path]);
  useEffect(() => {
    const tempHolder = sessionStorage.getItem("decoded-token");
    if (tempHolder) {
      // tempHolder = JSON.parse(tempHolder);
    } else {
      if (token) {
        const decodedToken = jwtDecode(token);
        sessionStorage.setItem("decoded-token", JSON.stringify(decodedToken));
      }
    }
  }, []);

  if (!token || token === "jsk") {
    return (
      <Redirect
        to={{
          pathname: "/sign-in",
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className="main-section">
            <div className={`main-section-right`}>
              <div className="main-content-wrapper">
                <Component
                  connectedWalletBalance={rest.connectedWalletBalance}
                  connectedWalletAddress={rest.connectedWalletAddress}
                  isWalletConnected={rest.isWalletConnected}
                  connectedWalletevents={rest.connectedWalletevents}
                  openConnectWallet={rest.openConnectWallet}
                  disconnectWallet={rest.disconnectWallet}
                  key={props.location.pathname}
                  {...props}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default PrivateRoute;

import { useEffect } from "react";
import { Route } from "react-router-dom";
import { removeSessionSavedStrategyId } from "./ReusableFunctions";

const PublicRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    removeSessionSavedStrategyId();
  }, []);

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

export default PublicRoute;

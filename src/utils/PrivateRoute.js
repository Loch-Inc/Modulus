import { Route } from "react-router-dom";
import { getToken } from "./ManageToken";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [token] = useState(getToken());
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
                <Component key={props.location.pathname} {...props} />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default PrivateRoute;

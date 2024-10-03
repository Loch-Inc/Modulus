import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
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

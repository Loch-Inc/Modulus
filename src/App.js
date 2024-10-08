import { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// import './App.css';
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SwitchDarkMode } from "./app/common/Api";
import routes from "./routes";
import { DarkModeDefaltView } from "./utils/AnalyticsFunctions";
import {
  mobileCheck,
  switchToDarkMode,
  switchToLightMode,
} from "./utils/ReusableFunctions";

function App(props) {
  const [isMobile] = useState(mobileCheck());
  useEffect(() => {
    if (!mobileCheck()) {
      // document;
    }
  }, []);
  useEffect(() => {
    const isRendered = window.localStorage.getItem("isRendered");
    if (!isRendered) {
      setTimeout(() => {
        window.localStorage.setItem("isRendered", true);
        window.location.reload(true);
      }, 1000);
    }
    return () => {
      window.localStorage.removeItem("isRendered");
    };
  }, []);
  useEffect(() => {
    // ReactGA.initialize(BASE_GA_KEY);
  }, []);

  useEffect(() => {
    let isDarkTheme = localStorage.getItem("isDarkTheme");
    if (isDarkTheme && isDarkTheme === "true") {
      document.documentElement.style.backgroundColor = "#141414";
      switchToDarkMode();
      props.SwitchDarkMode(true);
      DarkModeDefaltView({
        mode: "Dark",
        isMobile: mobileCheck(),
      });
    } else {
      document.documentElement.style.backgroundColor = "#f2f2f2";
      switchToLightMode();
      props.SwitchDarkMode(false);
      DarkModeDefaltView({
        mode: "Light",
        isMobile: mobileCheck(),
      });
    }
  }, []);

  // return isMobile ? (
  //   <MobileDevice />
  // ) : (
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routes.map((prop, key) => {
            return (
              <prop.type
                exact
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })}
          {/* <Route exact path="/" component={Home} /> */}
        </Switch>
      </BrowserRouter>
      {/* <ToastContainer hideProgressBar /> */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        // closeOnClick
        closeButton={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
  // );
}
const mapDispatchToProps = {
  SwitchDarkMode,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);

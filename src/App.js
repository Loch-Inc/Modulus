import {
  createWeb3Modal,
  defaultConfig,
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalEvents,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import {
  getModulusUserWalletBalance,
  updateModulusUserWallet,
} from "src/app/CommonApi/CommonApi";
// import './App.css';
import { connect, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
import {
  ModulusWebsiteView,
  setMixpanelDataPoints,
} from "./utils/AnalyticsFunctions";
import { getModulusUser } from "./utils/ManageToken";
import { switchToDarkMode, switchToLightMode } from "./utils/ReusableFunctions";

function App(props) {
  const [apiCallCount, setApiCallCount] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();
  const [connectedWalletBalance, setConnectedWalletBalance] = useState(0);
  useEffect(() => {
    let tempTotalBalance = 0;

    if (
      props.ModulusUserWalletBalanceState &&
      props.ModulusUserWalletBalanceState.data
    ) {
      let tempBalance = 0;
      if (props.ModulusUserWalletBalanceState.data.total_balance) {
        tempBalance = props.ModulusUserWalletBalanceState.data.total_balance;
      }
      if (tempBalance === 0 && apiCallCount < 8 && isConnected) {
        setApiCallCount(apiCallCount + 1);
        setTimeout(() => {
          connectWalletSuccess();
        }, 20000);
      }
      tempTotalBalance = tempBalance;
    }
    setConnectedWalletBalance(tempTotalBalance);
  }, [props.ModulusUserWalletBalanceState]);

  useEffect(() => {
    const isPageViewRegistered = sessionStorage.getItem("isPageViewRegistered");
    if (isPageViewRegistered !== "true") {
      sessionStorage.setItem("isPageViewRegistered", true);
      const modulusUser = getModulusUser();
      let userEmail = "";
      if (modulusUser && modulusUser.email) {
        userEmail = modulusUser.email;
        setMixpanelDataPoints(userEmail);
      }
      ModulusWebsiteView({
        email_address: userEmail,
      });
    }
  }, []);
  useEffect(() => {
    // dispatch(getModulusUserWalletBalance());
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
    } else {
      document.documentElement.style.backgroundColor = "#f2f2f2";
      switchToLightMode();
    }
  }, []);

  // Wallet
  const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  };
  const metadata = {
    name: "Loch",
    description: "My Website description",
    url: "https://app.loch.one/", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
  };
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId: "4ba0f16b53f8888a667cbbb8bb366918",
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });
  const walletevents = useWeb3ModalEvents();
  const { address, isConnected } = useWeb3ModalAccount();
  const { open: openConnectWallet } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const openDisconnectConnectWallet = () => {
    if (isConnected) {
      disconnect();
      setTimeout(() => {
        openConnectWallet();
      }, 1000);
    } else {
      openConnectWallet();
    }
  };
  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
    } else {
      const connectWalletInitiated = sessionStorage.getItem(
        "connect_wallet_initiated"
      );
      if (isConnected) {
        if (connectWalletInitiated === "true") {
          // toast.success("Wallet Connect");

          dispatch(
            updateModulusUserWallet(
              {
                wallet_address: address,
              },
              connectWalletSuccess
            )
          );
        }
      } else {
        // toast.success("Wallet Disconnected");
      }
      // console.log("isConnected", isConnected);
    }
  }, [isConnected]);
  const connectWalletSuccess = () => {
    // dispatch(getModulusUserWalletBalance());
    dispatch(getModulusUserWalletBalance());
  };
  // Wallet
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
                // wallet
                connectedWalletBalance={connectedWalletBalance}
                connectedWalletAddress={address}
                isWalletConnected={isConnected}
                connectedWalletevents={walletevents}
                openConnectWallet={openDisconnectConnectWallet}
                disconnectWallet={disconnect}
                // wallet
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
const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  ModulusUserWalletBalanceState: state.ModulusUserWalletBalanceState,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

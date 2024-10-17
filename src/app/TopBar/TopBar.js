import React from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import {
  ConnectedWalletIcon,
  LochModulusLogoIcon,
  TopBarBuilderIcon,
  TopBarConnectIcon,
  TopBarDiscoverIcon,
  TopBarFeedbackIcon,
  TopBarLeaderboardIcon,
  TopBarProfileIcon,
  TopBarSignInOutIcon,
} from "src/assets/images/icons";
import {
  TopBarBuilderClicked,
  TopBarConnectClicked,
  TopBarDiscoverClicked,
  TopBarFeedbackClicked,
  TopBarHomeClicked,
  TopBarLeaderboardClicked,
  TopBarProfileClicked,
  TopBarSignedOut,
  TopBarSignInClicked,
  TopBarSignOutClicked,
} from "src/utils/AnalyticsFunctions";
import { deleteToken, getModulusUser, getToken } from "src/utils/ManageToken";
import { numToCurrency, TruncateText } from "src/utils/ReusableFunctions";
import ConfirmLeaveModal from "../common/ConfirmLeaveModal";
import "./_topBar.scss";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmLeaveModalForWalletDisconect: false,
      showConfirmLeaveModal: false,
      selectedItem: "",
      isSignnedIn: getToken() ? true : false,
      profileItems: [],
    };
  }
  setTopBarItems = () => {
    let tempHolder = [
      {
        icon: TopBarDiscoverIcon,
        text: "Discover",
        link: "/discover",
      },
      {
        icon: TopBarLeaderboardIcon,
        text: "Leaderboard",
        link: "/leaderboard",
      },
      {
        icon: TopBarBuilderIcon,
        text: "Builder",
        link: "/builder",
      },
      {
        icon: TopBarFeedbackIcon,
        text: "Feedback",
        link: "/feedback",
      },
      {
        icon: TopBarProfileIcon,
        text: "Profile",
        link: "/profile",
      },
    ];
    if (getToken()) {
      tempHolder = [
        {
          icon: TopBarDiscoverIcon,
          text: "Discover",
          link: "/discover",
        },
        {
          icon: TopBarLeaderboardIcon,
          text: "Leaderboard",
          link: "/leaderboard",
        },
        {
          icon: TopBarBuilderIcon,
          text: "Builder",
          link: "/builder",
        },
        // {
        //   icon: TopBarConnectIcon,
        //   text: this.props.isWalletConnected ? "Connected" : "Connect",
        //   link: "/connect",
        // },
        {
          icon: TopBarFeedbackIcon,
          text: "Feedback",
          link: "/feedback",
        },
        {
          icon: TopBarProfileIcon,
          text: "Profile",
          link: "/profile",
        },
      ];
    }
    this.setState(
      {
        profileItems: [...tempHolder],
      },
      () => {
        // Get the current URL path
        const currentPath = window.location.pathname;

        // Remove leading slash and convert to lowercase
        const path = currentPath.slice(1).toLowerCase();

        // Find the matching item in profileItems
        const matchingItem = this.state.profileItems.find(
          (item) => item.link.slice(1).toLowerCase() === path
        );

        // Set the selectedItem state if a match is found
        if (matchingItem) {
          this.setState({ selectedItem: matchingItem.text });
        }
      }
    );
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isWalletConnected !== this.props.isWalletConnected) {
      this.setTopBarItems();
    }
  }
  componentDidMount() {
    this.setTopBarItems();
  }
  gotoPage = (page) => {
    const modulusUser = getModulusUser();
    let userEmail = "";
    if (modulusUser) {
      userEmail = modulusUser.email;
    }
    if (page === "/connect") {
      sessionStorage.setItem("connect_wallet_initiated", "true");
      TopBarConnectClicked({
        email_address: userEmail,
      });
      this.connectDisconnectWalletEthers();
    } else if (page === "/feedback") {
      TopBarFeedbackClicked({
        email_address: userEmail,
      });
      window.open("https://t.me/prithvir1", "_blank");
    } else {
      if (page !== "/discover") {
        TopBarDiscoverClicked({
          email_address: userEmail,
        });
      } else if (page === "/leaderboard") {
        TopBarLeaderboardClicked({
          email_address: userEmail,
        });
      } else if (page === "/builder") {
        TopBarBuilderClicked({
          email_address: userEmail,
        });
      } else if (page === "/profile") {
        TopBarProfileClicked({
          email_address: userEmail,
        });
      }
      this.props.history.push(page);
    }
  };
  // Connect Disconnect Wallet
  disconnectWalletEthers = async () => {
    if (this.props.isWalletConnected) {
      if (this.props.disconnectWallet) {
        this.props.disconnectWallet();
        this.closeWalletLeaveModal();
      }
    }
  };
  connectDisconnectWalletEthers = async () => {
    if (this.props.isWalletConnected) {
      this.openWalletLeaveModal();
    } else {
      if (this.props.openConnectWallet) {
        this.props.openConnectWallet();
      }
    }
  };
  openWalletLeaveModal = () => {
    this.setState({
      showConfirmLeaveModalForWalletDisconect: true,
    });
  };
  closeWalletLeaveModal = () => {
    this.setState({
      showConfirmLeaveModalForWalletDisconect: false,
    });
  };
  // Connect Disconnect Wallet
  onclickSignInOut = () => {
    const modulusUser = getModulusUser();
    let userEmail = "";
    if (modulusUser) {
      userEmail = modulusUser.email;
    }
    if (this.state.isSignnedIn) {
      TopBarSignOutClicked({
        email_address: userEmail,
      });
      this.openLeaveModal();
      // this.setState({ isSignnedIn: false });
    } else {
      TopBarSignInClicked({
        email_address: userEmail,
      });
      this.props.history.push("/sign-in");
    }
  };
  openLeaveModal = () => {
    this.setState({
      showConfirmLeaveModal: true,
    });
  };
  closeLeaveModal = () => {
    this.setState({
      showConfirmLeaveModal: false,
    });
  };
  signOutFun = () => {
    const modulusUser = getModulusUser();
    let userEmail = "";
    if (modulusUser) {
      userEmail = modulusUser.email;
    }
    TopBarSignedOut({
      email_address: userEmail,
    });
    deleteToken();
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 500);
  };
  goToHome = () => {
    const modulusUser = getModulusUser();
    let userEmail = "";
    if (modulusUser) {
      userEmail = modulusUser.email;
    }
    TopBarHomeClicked({
      email_address: userEmail,
    });
    this.gotoPage("/discover");
  };
  render() {
    return (
      <div className="top-bar-parent">
        {this.state.showConfirmLeaveModal ? (
          <ConfirmLeaveModal
            show
            history={this.props.history}
            handleClose={this.closeLeaveModal}
            handleAccept={this.signOutFun}
          />
        ) : null}
        {this.state.showConfirmLeaveModalForWalletDisconect ? (
          <ConfirmLeaveModal
            customMessage="Are you sure you want to disconnect your wallet?"
            show
            history={this.props.history}
            handleClose={this.closeWalletLeaveModal}
            handleAccept={this.disconnectWalletEthers}
          />
        ) : null}
        <div className="top-bar-container">
          <div className="top-bar">
            <div className="top-bar-content">
              <div className="top-bar-content-left">
                <Image
                  onClick={this.goToHome}
                  className={`top-bar-content-left-logo ${
                    this.state.selectedItem === "Discover"
                      ? "no-pointer-event"
                      : ""
                  }`}
                  src={LochModulusLogoIcon}
                />
              </div>
              <div className="top-bar-content-middle">
                {this.state.profileItems.map((item, index) => {
                  const BarIcon = item.icon;
                  return (
                    <div
                      onClick={() => this.gotoPage(item.link)}
                      className={`top-bar-content-middle-item ${
                        this.state.selectedItem === item.text
                          ? "top-bar-content-middle-item-selected"
                          : ""
                      }`}
                      key={index}
                    >
                      <BarIcon className="top-bar-content-middle-item-icon" />
                      <div className="top-bar-content-middle-item-text">
                        {item.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                // onClick={this.connectWalletEthers}
                className="top-bar-content-right"
              >
                {this.props.isWalletConnected ? (
                  <>
                    <div className="top-bar-content-right-title">
                      <ConnectedWalletIcon className="top-bar-content-right-title-icon" />
                      <div>
                        {TruncateText(this.props.connectedWalletAddress)}
                      </div>
                    </div>
                    <div className="top-bar-content-right-amount">
                      {this.props.connectedWalletBalance
                        ? numToCurrency(
                            this.props.connectedWalletBalance.toFixed(2)
                          ).toLocaleString("en-US") + " USD"
                        : // : "0.00 USD"}
                          ""}
                      {/* {this.props.connectedWalletBalance} USD */}
                    </div>
                  </>
                ) : (
                  <div
                    onClick={this.onclickSignInOut}
                    className="top-bar-content-right-sign-in-out"
                  >
                    <TopBarSignInOutIcon className="top-bar-content-right-sign-in-out-icon" />
                    <div className="top-bar-content-right-sign-in-out-text">
                      {this.state.isSignnedIn ? "Sign out" : "Sign in"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  StrategyDiscoveryTableState: state.StrategyDiscoveryTableState,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

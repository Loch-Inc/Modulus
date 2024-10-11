import React from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import {
  LochModulusLogoIcon,
  TopBarBuilderIcon,
  TopBarConnectIcon,
  TopBarDiscoverIcon,
  TopBarFeedbackIcon,
  TopBarLeaderboardIcon,
  TopBarProfileIcon,
  TopBarSignInOutIcon,
} from "src/assets/images/icons";
import "./_topBar.scss";
import { getToken } from "src/utils/ManageToken";
import { resetUser } from "src/utils/AnalyticsFunctions";
import ConfirmLeaveModal from "../common/ConfirmLeaveModal";

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
        {
          icon: TopBarConnectIcon,
          text: this.props.isWalletConnected ? "Connected" : "Connect",
          link: "/connect",
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
    if (page === "/connect") {
      this.connectDisconnectWalletEthers();
    } else if (page === "/feedback") {
      window.open("https://t.me/prithvir1", "_blank");
    } else {
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
    if (this.state.isSignnedIn) {
      this.openLeaveModal();
      // this.setState({ isSignnedIn: false });
    } else {
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
    resetUser();
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 500);
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
                  onClick={() => this.gotoPage("/discover")}
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
                <div
                  onClick={this.onclickSignInOut}
                  className="top-bar-content-right-sign-in-out"
                >
                  <TopBarSignInOutIcon className="top-bar-content-right-sign-in-out-icon" />
                  <div className="top-bar-content-right-sign-in-out-text">
                    {this.state.isSignnedIn ? "Sign out" : "Sign in"}
                  </div>
                </div>
                {/* <div className="top-bar-content-right-green-dot"></div>
                <div className="top-bar-content-right-title">
                  {this.props.isWalletConnected
                    ? "Connected Wallet"
                    : "Connect Wallet"}
                </div>
                <div className="top-bar-content-right-title">
                  Cumulative Return
                </div>
                <div className="top-bar-content-right-amount">3.32M USD</div> */}
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

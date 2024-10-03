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
} from "src/assets/images/icons";
import { resetUser } from "src/utils/AnalyticsFunctions";
import "./_topBar.scss";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      profileItems: [
        {
          icon: TopBarDiscoverIcon,
          text: "Discover",
          link: "/discover",
        },
        {
          icon: TopBarBuilderIcon,
          text: "Builder",
          link: "/builder",
        },
        {
          icon: TopBarLeaderboardIcon,
          text: "Leaderboard",
          link: "/leaderboard",
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
      ],
    };
  }

  componentDidMount() {
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
  gotoPage = (page) => {
    this.props.history.push(page);
  };

  render() {
    return (
      <div className="top-bar-parent">
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

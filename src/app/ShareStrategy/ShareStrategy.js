import React, { Component } from "react";
import TopBar from "../TopBar/TopBar";
import "./_shareStrategy.scss";
import { Image } from "react-bootstrap";
import { SpinningLogo } from "src/assets/images";
import { getModulusUser } from "src/utils/ManageToken";
import { BuilderShareStrategyClicked } from "src/utils/AnalyticsFunctions";

class ShareStrategy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let uid = "";
    let sid = "";
    const urlParams = new URLSearchParams(window.location.search);
    uid = urlParams.get("uid");
    sid = urlParams.get("sid");

    this.goToStrategyBuilderPage({
      user_id: uid,
      strategy_id: sid,
      strategy_name: "",
    });
  }
  goToStrategyBuilderPage = (passedItem) => {
    const modulusUser = getModulusUser();

    if (passedItem && passedItem.strategy_id) {
      if (modulusUser) {
        // BuilderShareStrategyClicked({
        //   email_address: modulusUser.email,
        //   userId: passedItem.user_id,
        //   strategyId: passedItem.strategy_id,
        // });
      }
      this.props.history.push({
        pathname: "/builder",
        state: {
          passedStrategyId: passedItem.strategy_id,
          passedStrategyName: passedItem.strategy_name,
          passedUserId: passedItem.user_id,
        },
      });
    } else {
      if (modulusUser) {
        // DiscoverCreateYourAlgoStrategy({
        //   email_address: modulusUser.email,
        // });
      }
      this.props.history.push("/builder");
    }
  };

  render() {
    return (
      <div className="share-strategy-page">
        <TopBar
          connectedWalletBalance={this.props.connectedWalletBalance}
          isWalletConnected={this.props.isWalletConnected}
          connectedWalletAddress={this.props.connectedWalletAddress}
          connectedWalletevents={this.props.connectedWalletevents}
          openConnectWallet={this.props.openConnectWallet}
          disconnectWallet={this.props.disconnectWallet}
          history={this.props.history}
        />
        <div className="page">
          <div className=" page-scroll">
            <div className="page-scroll-child">
              <div className="share-strategy-page-content">
                <Image
                  className="share-strategy-page-spinning-logo"
                  src={SpinningLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareStrategy;

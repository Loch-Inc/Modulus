import React, { Component } from "react";
import TopBar from "../TopBar/TopBar";
import "./_shareStrategy.scss";
import { Image } from "react-bootstrap";
import { SpinningLogo } from "src/assets/images";
import { getModulusUser, getToken } from "src/utils/ManageToken";
import { BuilderSharedStrategyOpened } from "src/utils/AnalyticsFunctions";
import { jwtDecode } from "jwt-decode";

class ShareStrategy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let tempStrategyId = "";
    const { strategyId } = this.props?.match?.params;
    if (strategyId) {
      tempStrategyId = strategyId;
    }
    this.goToStrategyBuilderPage({
      strategy_id: tempStrategyId,
      strategy_name: "",
    });
  }
  goToStrategyBuilderPage = (passedItem) => {
    const modulusToken = getToken();

    if (passedItem && passedItem.strategy_id) {
      if (modulusToken) {
        const modulusUser = jwtDecode(modulusToken);
        BuilderSharedStrategyOpened({
          email_address: modulusUser.email,
          strategyId: passedItem.strategy_id,
        });
        this.props.history.push({
          pathname: "/builder",
          state: {
            passedStrategyId: passedItem.strategy_id,
            passedStrategyName: passedItem.strategy_name,
          },
        });
      } else {
        sessionStorage.setItem("sharedStrategyId", passedItem.strategy_id);
        this.props.history.push("/sign-up");
      }
    } else {
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

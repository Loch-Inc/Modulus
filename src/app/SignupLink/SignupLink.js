import { Component } from "react";
import { Image } from "react-bootstrap";
import { SpinningLogo } from "src/assets/images";
import TopBar from "../TopBar/TopBar";
import "./_signupLink.scss";

class SignupLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let tempUserReferralCode = "";
    const { userReferralCode } = this.props?.match?.params;

    if (userReferralCode) {
      tempUserReferralCode = userReferralCode;
    }

    sessionStorage.setItem("sharedUserReferralCode", tempUserReferralCode);
    this.props.history.push("/sign-up");
  }

  render() {
    return (
      <div className="sign-up-link-page">
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
              <div className="sign-up-link-page-content">
                <Image
                  className="sign-up-link-page-spinning-logo"
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

export default SignupLink;

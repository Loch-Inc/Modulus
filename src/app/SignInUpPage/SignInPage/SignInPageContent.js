import React from "react";
import { Image } from "react-bootstrap";
import { SignUpIllustration } from "src/assets/images";
import { BackArrowSmartMoneyIcon } from "src/assets/images/icons";

import SignInUpFunctionality from "../Components/SignInUpFunctionality";

class SignInPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize state here
    };
  }

  componentDidMount() {
    // Lifecycle method for when component mounts
  }
  onBackButtonClickPass = () => {
    this.props.onBackButtonClick();
  };

  render() {
    return (
      <div className="sign-in-page-content">
        <div className="sign-in-page-content-left">
          <Image
            className="sign-in-page-content-left-image"
            src={SignUpIllustration}
          />
        </div>
        <div className="sign-in-page-content-right">
          <div
            onClick={this.onBackButtonClickPass}
            className={`sign-in-page-content-right-back ${
              this.props.showBackButton
                ? ""
                : "sign-in-page-content-right-back-hidden"
            }`}
          >
            <Image
              className="sign-in-page-content-right-back-icon"
              src={BackArrowSmartMoneyIcon}
            />
          </div>
          <div className="sign-in-page-content-right-data">
            <SignInUpFunctionality
              disableButton={this.props.disableButton}
              titleOne={this.props.titleOne}
              titleTwo={this.props.titleTwo}
              buttonText={this.props.buttonText}
              bottomText={this.props.bottomText}
              placeholder={this.props.placeholder}
              onBottomTextClick={this.props.onBottomTextClick}
              onButtonClick={this.props.onButtonClick}
              subText={this.props.subText}
              isOtp={this.props.isOtp}
              changeOtp={this.props.changeOtp}
              inputValue={this.props.email}
              otpValue={this.props.otp}
              changeInput={this.props.changeEmail}
              showBrowseLeaderboard={this.props.showBrowseLeaderboard}
              goToLeaderboard={this.props.goToLeaderboard}
            />
          </div>
          <div className="sign-in-page-content-right-footer"></div>
        </div>
      </div>
    );
  }
}

export default SignInPageContent;

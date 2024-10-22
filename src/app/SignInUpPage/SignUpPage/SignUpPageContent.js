import React from "react";
import { Image } from "react-bootstrap";
import { SignUpIllustration } from "src/assets/images";
import { BackArrowSmartMoneyIcon } from "src/assets/images/icons";

import SignInUpFunctionality from "../Components/SignInUpFunctionality";

class SignUpPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onBackButtonClickPass = () => {
    this.props.onBackButtonClick();
  };

  render() {
    return (
      <div className="sign-up-page-content">
        <div className="sign-up-page-content-left">
          <Image
            className="sign-up-page-content-left-image"
            src={SignUpIllustration}
          />
        </div>
        <div className="sign-up-page-content-right">
          <div
            onClick={this.onBackButtonClickPass}
            className={`sign-up-page-content-right-back ${
              this.props.showBackButton
                ? ""
                : "sign-up-page-content-right-back-hidden"
            }`}
          >
            <Image
              className="sign-up-page-content-right-back-icon"
              src={BackArrowSmartMoneyIcon}
            />
          </div>
          <div className="sign-up-page-content-right-data">
            <SignInUpFunctionality
              isTermsAndConditions={this.props.isTermsAndConditions}
              goToTermsAndConditions={this.props.goToTermsAndConditions}
              disableButton={this.props.disableButton}
              titleOne={this.props.titleOne}
              titleTwo={this.props.titleTwo}
              buttonText={this.props.buttonText}
              bottomText={this.props.bottomText}
              placeholder={this.props.placeholder}
              onBottomTextClick={this.props.onBottomTextClick}
              onButtonClick={this.props.onButtonClick}
              subText={this.props.subText}
              isOtp={this.props.screenPosition === 3}
              changeOtp={this.props.changeOtp}
              inputValue={
                this.props.screenPosition === 1
                  ? this.props.email
                  : this.props.referralCode
              }
              otpValue={this.props.otp}
              changeInput={
                this.props.screenPosition === 1
                  ? this.props.changeEmail
                  : this.props.changeReferralCode
              }
              showBrowseLeaderboard={this.props.showBrowseLeaderboard}
              history={this.props.history}
            />
          </div>
          <div className="sign-up-page-content-right-footer"></div>
        </div>
      </div>
    );
  }
}

export default SignUpPageContent;

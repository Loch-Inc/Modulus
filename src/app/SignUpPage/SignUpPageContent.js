import React from "react";
import { Image } from "react-bootstrap";
import { SignUpIllustration } from "src/assets/images";
import {
  BackArrowSmartMoneyIcon,
  FooterQuestionMarkIcon,
  LockIcon,
} from "src/assets/images/icons";

import CustomOverlay from "src/utils/commonComponent/CustomOverlay";
import SignInUpFunctionality from "./Components/SignInUpFunctionality";

class SignUpPageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize state here
    };
  }

  componentDidMount() {
    // Lifecycle method for when component mounts
  }

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
          <div className="sign-up-page-content-right-back">
            <Image
              className="sign-up-page-content-right-back-icon"
              src={BackArrowSmartMoneyIcon}
            />
          </div>
          <div className="sign-up-page-content-right-data">
            <SignInUpFunctionality
              titleOne="Get access to"
              titleTwo="Loch Modulus now"
              buttonText="Sign Up"
              subText="Join waiting list"
              placeholder="Enter email address"
            />
          </div>
          <div className="sign-up-page-content-right-footer">
            <div>
              Don't worry. All your information remains private and anonymous.
            </div>
            <CustomOverlay
              text="Your privacy is protected. No third party will know which wallet addresses(es) you added."
              position="top"
              isIcon={true}
              IconImage={LockIcon}
              isInfo={true}
              className={"fix-width"}
            >
              <Image
                src={FooterQuestionMarkIcon}
                className="info-icon"
                onMouseEnter={this.privacymessage}
                style={{ cursor: "pointer" }}
              />
            </CustomOverlay>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPageContent;

import React from "react";

import { Image } from "react-bootstrap";
import {
  LochLogoBlackThinIcon,
  SignUpLeaderBoardRightArrowIcon,
  SignUpTrophyIcon,
} from "src/assets/images/icons";
import "./_signInUpFunctionality.scss";
class SignInUpFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCodeTimer: 60,
      disableSendCode: false,
    };
  }
  resendCode = () => {
    this.onBottomTextClickPass();
    this.startSendCodeTimer();
  };
  startSendCodeTimer = () => {
    clearInterval(this.interval);
    this.setState({
      sendCodeTimer: 60,
      disableSendCode: true,
    });
    this.interval = setInterval(() => {
      this.setState(
        (prevState) => ({
          sendCodeTimer: prevState.sendCodeTimer - 1,
        }),
        () => {
          if (this.state.sendCodeTimer <= 0) {
            clearInterval(this.interval);
            this.setState({
              disableSendCode: false,
            });
          }
        }
      );
    }, 1000);
  };

  componentDidMount() {
    if (this.props.isOtp) {
      this.startSendCodeTimer();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOtp !== this.props.isOtp) {
      if (this.props.isOtp) {
        this.startSendCodeTimer();
      } else {
        clearInterval(this.interval);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onBottomTextClickPass = () => {
    if (this.props.onBottomTextClick) {
      this.props.onBottomTextClick();
    }
  };
  onButtonClickPass = () => {
    if (this.props.onButtonClick) {
      this.props.onButtonClick();
    }
  };
  onChangeInputPass = (e) => {
    if (this.props.changeInput) {
      this.props.changeInput(e.target.value);
    }
  };
  onInputKeyDownPass = (e) => {
    if (e.key === "Enter") {
      this.onButtonClickPass();
    }
  };
  onOtpInputKeyDownPass = (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      const previousInput = e.target.previousElementSibling;
      if (previousInput) {
        previousInput.focus();
      }
    } else if (e.key === "Enter") {
      this.onButtonClickPass();
    }
  };

  goToLeaderboard = () => {
    this.props.history.push("/leaderboard", {
      showBackButton: "true",
    });
  };
  render() {
    return (
      <div className="sign-in-up-functionality">
        <div className="sign-in-up-functionality-logo">
          <Image
            src={LochLogoBlackThinIcon}
            className="sign-in-up-functionality-logo-image"
          />
        </div>

        <div className="sign-in-up-functionality-title">
          {this.props.titleOne}
          <br />
          {this.props.titleTwo}
        </div>
        {this.props.subText ? (
          <div className="sign-in-up-functionality-sub-text">
            {this.props.subText}
          </div>
        ) : null}
        <div className="sign-in-up-functionality-input-btn-container">
          {this.props.isOtp ? (
            <div className="otp-input-container">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  className="sign-in-up-functionality-input otp-input"
                  type="text"
                  maxLength="1"
                  value={
                    this.props.otpValue.length > index
                      ? this.props.otpValue[index]
                      : ""
                  }
                  onKeyDown={this.onOtpInputKeyDownPass}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (/^\d+$/.test(paste) && paste.length <= 6) {
                      const otpInputs = document.querySelectorAll(".otp-input");
                      otpInputs.forEach((input, index) => {
                        input.value = paste[index] || "";
                      });
                      if (this.props.changeOtp) {
                        this.props.changeOtp(paste);
                      }
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length === 1) {
                      const nextInput = e.target.nextElementSibling;
                      if (nextInput) {
                        nextInput.focus();
                      }
                    }
                    const otpInputs = document.querySelectorAll(".otp-input");
                    let otpValue = "";
                    otpInputs.forEach((input) => {
                      otpValue += input.value;
                    });
                    if (this.props.changeOtp) {
                      this.props.changeOtp(otpValue);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <input
              className="sign-in-up-functionality-input"
              type="text"
              placeholder={this.props.placeholder}
              value={this.props.inputValue}
              onChange={this.onChangeInputPass}
              onKeyDown={this.onInputKeyDownPass}
            />
          )}

          <button
            disabled={this.props.disableButton}
            onClick={this.onButtonClickPass}
            className={`sign-in-up-functionality-button ${
              this.props.disableButton
                ? "sign-in-up-functionality-button-disabled"
                : ""
            }`}
          >
            {this.props.buttonText}
          </button>
        </div>
        {this.props.isTermsAndConditions ? (
          <div className="sign-in-up-functionality-bottom-text-light">
            By signing up, you agree to the{" "}
            <span
              onClick={this.props.goToTermsAndConditions}
              className="sign-in-up-functionality-bottom-text-light-highlighted"
            >
              Terms and Conditions
            </span>
          </div>
        ) : null}
        {this.props.isOtp ? (
          <div
            onClick={this.resendCode}
            className={`sign-in-up-functionality-bottom-text ${
              this.state.disableSendCode
                ? "sign-in-up-functionality-bottom-text-disabled"
                : ""
            }`}
          >
            {this.state.disableSendCode ? (
              `Send code again in ${this.state.sendCodeTimer}`
            ) : (
              <span onClick={this.resendCode}>Send code again</span>
            )}
          </div>
        ) : (
          <div
            onClick={this.onBottomTextClickPass}
            className="sign-in-up-functionality-bottom-text"
          >
            {this.props.bottomText}
          </div>
        )}
        {this.props.showBrowseLeaderboard ? (
          <div
            onClick={this.goToLeaderboard}
            className="sign-in-up-functionality-browse-leaderboard-container"
          >
            <SignUpTrophyIcon className="sign-in-up-functionality-browse-leaderboard-icon" />
            <div className="sign-in-up-functionality-browse-leaderboard-text">
              <div className="sign-in-up-functionality-browse-leaderboard-text-subheading">
                Browse the
              </div>
              <div className="sign-in-up-functionality-browse-leaderboard-text-heading">
                <div>Loch Leaderboard</div>
                <SignUpLeaderBoardRightArrowIcon className="sign-in-up-functionality-browse-leaderboard-text-heading-icon" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SignInUpFunctionality;

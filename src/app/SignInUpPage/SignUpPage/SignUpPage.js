import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getToken, setToken } from "src/utils/ManageToken";
import validator from "validator";
import { signUpApi } from "../Api/SignInUpApi";
import SignUpPageContent from "./SignUpPageContent";
import "./_signUpPage.scss";
import {
  SignUpApiCallFailed,
  SignUpPageView,
  SignUpReferralCodeGoBack,
  SignUpReferralCodePageView,
  SignUpTermsAndConditionsClicked,
  SignUpVerifyAccountGoBack,
  SignUpVerifyAccountPageView,
  SignUpVerifyOtpApiCallFailed,
  SignUpVerifyReferralCodeApiCallFailed,
} from "src/utils/AnalyticsFunctions";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenPosition: 1,
      titleOne: "Get access to",
      titleTwo: "Loch Modulus now",
      buttonText: "Get access",
      bottomText: "Sign in to Loch Modulus",
      placeholder: "Enter email address",
      subText: "",

      // Items
      email: "",
      otp: "",
      referralCode: "",
      disableButton: false,
    };
  }

  changeOtp = (otp) => {
    this.setState({ otp });
  };
  changeEmail = (email) => {
    this.setState({ email });
  };
  changeReferralCode = (referralCode) => {
    this.setState({ referralCode });
  };
  componentDidMount() {
    SignUpPageView();
    const token = getToken();
    if (token) {
      this.props.history.push("/");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.screenPosition !== this.state.screenPosition) {
      if (this.state.screenPosition === 3) {
        SignUpVerifyAccountPageView({
          email_address: this.state.email,
        });
        this.setState({
          titleOne: "Verify your account",
          titleTwo: "",
          buttonText: "Verify",
          bottomText: "Send code again",
          placeholder: "Enter OTP",
          subText: "Check the code that has been sent to your email",
        });
      } else if (this.state.screenPosition === 2) {
        SignUpReferralCodePageView({
          email_address: this.state.email,
        });
        this.setState({
          titleOne: "Now enter your",
          titleTwo: "referral code",
          buttonText: "Next",
          bottomText: "Go back",
          placeholder: "Enter referral code here",
          subText: "",
        });
      } else {
        this.setState({
          titleOne: "Get access to",
          titleTwo: "Loch Modulus now",
          buttonText: "Get access",
          bottomText: "Sign in to Loch Modulus",
          placeholder: "Enter email address",
          subText: "",
        });
      }
    }
  }

  goToSignInScreen = () => {
    this.setState({
      screenPosition: 1,
    });
  };
  goToReferralCodeScreen = () => {
    this.setState({
      screenPosition: 2,
    });
  };
  goToOtpScreen = () => {
    this.setState({
      screenPosition: 3,
    });
  };

  goToSignInPage = () => {
    this.props.history.push("/sign-in");
  };

  onButtonClick = () => {
    if (this.state.screenPosition === 1) {
      // this.goToReferralCodeScreen();
      this.signUpApiCall();
    } else if (this.state.screenPosition === 2) {
      this.verifyReferralCodeCall();
    } else if (this.state.screenPosition === 3) {
      this.verifyOtpCall();
    }
  };
  onBottomTextClick = () => {
    if (this.state.screenPosition === 1) {
      this.goToSignInPage();
    } else if (this.state.screenPosition === 2) {
      SignUpReferralCodeGoBack({
        email_address: this.state.email,
      });
      this.goToSignInScreen();
    } else if (this.state.screenPosition === 3) {
      SignUpVerifyAccountGoBack({
        email_address: this.state.email,
      });
      this.goToReferralCodeScreen();
    }
  };
  onBackButtonClick = () => {
    if (this.state.screenPosition === 3) {
      SignUpVerifyAccountGoBack({
        email_address: this.state.email,
      });
    } else if (this.state.screenPosition === 2) {
      SignUpReferralCodeGoBack({
        email_address: this.state.email,
      });
    }
    this.setState({
      screenPosition: this.state.screenPosition - 1,
    });
  };

  // Sign in API call
  signUpApiCall = () => {
    if (!validator.isEmail(this.state.email)) {
      toast.error("Please enter a valid email address");
    } else {
      this.setState({ disableButton: true });
      const data = {
        email: this.state.email,
      };
      this.props.signUpApi(
        data,
        this.afterSignUpApiCallSuccess,
        this.afterSignUpApiCallError
      );
    }
  };
  afterSignUpApiCallSuccess = () => {
    this.setState({
      disableButton: false,
      screenPosition: this.state.screenPosition + 1,
    });
  };
  afterSignUpApiCallError = (errorMessage = "") => {
    this.setState({ disableButton: false });
    SignUpApiCallFailed({
      email_address: this.state.email,
      error_message: errorMessage,
    });
  };

  // Verify Referral Code API call
  verifyReferralCodeCall = () => {
    this.setState({ disableButton: true });
    const data = {
      email: this.state.email,
      referral_code: this.state.referralCode,
    };
    this.props.signUpApi(
      data,
      this.afterVerifyReferralCodeCallSuccess,
      this.afterVerifyReferralCodeCallError
    );
  };
  afterVerifyReferralCodeCallSuccess = () => {
    this.setState({
      disableButton: false,
    });
    this.setState({
      screenPosition: 3,
    });
  };
  afterVerifyReferralCodeCallError = (errorMessage = "") => {
    this.setState({ disableButton: false });
    SignUpVerifyReferralCodeApiCallFailed({
      email_address: this.state.email,
      error_message: errorMessage,
    });
  };

  // Verify OTP API call
  verifyOtpCall = () => {
    if (this.state.otp.length < 6) {
      toast.error("Invalid OTP");
    } else {
      this.setState({ disableButton: true });
      const data = {
        email: this.state.email,
        referral_code: this.state.referralCode,
        otp_token: this.state.otp,
      };
      this.props.signUpApi(
        data,
        this.afterVerifyOtpCallSuccess,
        this.afterVerifyOtpCallError
      );
    }
  };
  afterVerifyOtpCallSuccess = (passedData) => {
    this.setState({
      disableButton: false,
    });
    let userToken = passedData.token;
    if (userToken) {
      setToken(userToken);
      this.props.history.push("/");
    }
  };
  afterVerifyOtpCallError = (errorMessage = "") => {
    this.setState({ disableButton: false });
    SignUpVerifyOtpApiCallFailed({
      email_address: this.state.email,
      error_message: errorMessage,
    });
  };
  goToTermsAndConditions = () => {
    SignUpTermsAndConditionsClicked();
    window.open("/terms-and-conditions", "_blank");
  };

  render() {
    return (
      <div className="sign-up-page-container">
        <SignUpPageContent
          email={this.state.email}
          otp={this.state.otp}
          referralCode={this.state.referralCode}
          screenPosition={this.state.screenPosition}
          changeEmail={this.changeEmail}
          changeOtp={this.changeOtp}
          changeReferralCode={this.changeReferralCode}
          disableButton={this.state.disableButton}
          titleOne={this.state.titleOne}
          titleTwo={this.state.titleTwo}
          buttonText={this.state.buttonText}
          bottomText={this.state.bottomText}
          subText={this.state.subText}
          placeholder={this.state.placeholder}
          onButtonClick={this.onButtonClick}
          onBottomTextClick={this.onBottomTextClick}
          showBackButton={this.state.screenPosition > 1}
          onBackButtonClick={this.onBackButtonClick}
          goToTermsAndConditions={this.goToTermsAndConditions}
          isTermsAndConditions={this.state.screenPosition === 1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  StrategyDiscoveryTableState: state.StrategyDiscoveryTableState,
});
const mapDispatchToProps = {
  signUpApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

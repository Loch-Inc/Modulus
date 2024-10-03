import React from "react";
import SignInPageContent from "./SignInPageContent";
import "./_signInPage.scss";
import { connect } from "react-redux";
import { signInApi } from "../Api/SignInUpApi";
import validator from "validator";
import { toast } from "react-toastify";
import { getToken, setToken } from "src/utils/ManageToken";

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtpScreen: false,
      titleOne: "Sign in to",
      titleTwo: "Loch Modulus now",
      buttonText: "Sign in",
      bottomText: "Sign up to Loch Modulus",
      placeholder: "Enter email address",
      subText: "",
      showBackButton: false,
      email: "",
      otp: "",
      disableButton: false,
    };
  }

  changeOtp = (otp) => {
    this.setState({ otp });
  };
  changeEmail = (email) => {
    this.setState({ email });
  };
  componentDidMount() {
    const token = getToken();
    if (token) {
      this.props.history.push("/");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOtpScreen !== this.state.isOtpScreen) {
      if (this.state.isOtpScreen) {
        this.setState({
          titleOne: "Verify your account",
          titleTwo: "",
          buttonText: "Verify",
          bottomText: "Send code again",
          placeholder: "Enter OTP",
          subText: "Check the code that has been sent to your email",
          showBackButton: true,
        });
      } else {
        this.setState({
          titleOne: "Sign in to",
          titleTwo: "Loch Modulus now",
          buttonText: "Sign in",
          bottomText: "Sign up to Loch Modulus",
          placeholder: "Enter email address",
          subText: "",
          showBackButton: false,
        });
      }
    }
  }
  goToOtpScreen = () => {
    this.setState({
      isOtpScreen: true,
    });
  };
  goToSignInScreen = () => {
    this.setState({
      isOtpScreen: false,
    });
  };
  goToSignUpPage = () => {
    this.props.history.push("/sign-up");
  };

  onButtonClick = () => {
    if (this.state.isOtpScreen) {
      this.verifyOtpCall();
    } else {
      this.signInApiCall();
    }
  };
  onBottomTextClick = () => {
    if (this.state.isOtpScreen) {
      this.signInApiCall();
    } else {
      this.goToSignUpPage();
    }
  };
  onBackButtonClick = () => {
    this.goToSignInScreen();
  };

  // Sign in API call
  signInApiCall = () => {
    if (!validator.isEmail(this.state.email)) {
      toast.error("Please enter a valid email address");
    } else {
      this.setState({ disableButton: true });
      const data = {
        email: this.state.email,
      };
      this.props.signInApi(
        data,
        this.afterSignInApiCallSuccess,
        this.afterSignInApiCallError
      );
    }
  };
  afterSignInApiCallSuccess = () => {
    this.setState({
      disableButton: false,
      isOtpScreen: true,
      isBackButton: true,
    });
  };
  afterSignInApiCallError = () => {
    this.setState({ disableButton: false });
  };

  // Verify OTP API call
  verifyOtpCall = () => {
    if (this.state.otp.length < 6) {
      toast.error("Invalid OTP");
    } else {
      this.setState({ disableButton: true });
      const data = {
        email: this.state.email,
        otp_token: this.state.otp,
      };
      this.props.signInApi(
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
  afterVerifyOtpCallError = () => {
    this.setState({ disableButton: false });
  };

  render() {
    return (
      <div className="sign-in-page-container">
        <SignInPageContent
          email={this.state.email}
          otp={this.state.otp}
          changeEmail={this.changeEmail}
          disableButton={this.state.disableButton}
          titleOne={this.state.titleOne}
          titleTwo={this.state.titleTwo}
          buttonText={this.state.buttonText}
          bottomText={this.state.bottomText}
          subText={this.state.subText}
          placeholder={this.state.placeholder}
          onButtonClick={this.onButtonClick}
          changeOtp={this.changeOtp}
          onBottomTextClick={this.onBottomTextClick}
          showBackButton={this.state.showBackButton}
          onBackButtonClick={this.onBackButtonClick}
          isOtp={this.state.isOtpScreen}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  StrategyDiscoveryTableState: state.StrategyDiscoveryTableState,
});
const mapDispatchToProps = {
  signInApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

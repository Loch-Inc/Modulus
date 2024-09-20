import React from "react";

import "./_signInUpFunctionality.scss";
import { Button, Image } from "react-bootstrap";
import { LochLogoBlackThinIcon } from "src/assets/images/icons";
class SignInUpFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
        <input
          className="sign-in-up-functionality-input"
          type="text"
          placeholder={this.props.placeholder}
        />
        <Button className="sign-in-up-functionality-button">
          {this.props.buttonText}
        </Button>
        <div className="sign-in-up-functionality-sub-text">
          {this.props.subText}
        </div>
      </div>
    );
  }
}

export default SignInUpFunctionality;

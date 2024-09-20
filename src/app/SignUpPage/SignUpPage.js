import React from "react";
import SignUpPageContent from "./SignUpPageContent";
import "./_signUpPage.scss";

class SignUpPage extends React.Component {
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
      <div className="sign-up-page-container">
        <SignUpPageContent />
      </div>
    );
  }
}

export default SignUpPage;

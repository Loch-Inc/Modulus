import React from "react";

class ModulusHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.history.push("/discover");
  }

  render() {
    return null;
  }
}

export default ModulusHome;

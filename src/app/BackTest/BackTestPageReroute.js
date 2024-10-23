import { Component } from "react";

class BackTestPageReroute extends Component {
  componentDidMount() {
    this.props.history.push("/builder");
  }
  render() {
    return null;
  }
}

export default BackTestPageReroute;

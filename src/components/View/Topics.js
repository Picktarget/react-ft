import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

class Topics extends Component {
  render() {
    return <div>{this.props.location}</div>;
  }

  componentWillMount() {
    console.log(this.props.location);
  }
}

export default withRouter(Topics);

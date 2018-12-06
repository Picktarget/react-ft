import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button3D from '../button/Button_3D';
import Button from '../button/Button';

class ButtonView extends Component {
  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <Button3D loading="false" onClick={this.handleclick} />
        <Button onClick={this.handleclick} type="primary" size="large">
          123132
        </Button>
        <Button
          onClick={this.handleclick}
          type="primary"
          disabled
          size="large"
        />
        <Button onClick={this.handleclick} type="primary" size="large" />
        <Button
          onClick={this.handleclick}
          type="primary"
          size="large"
          shape="circle"
        />
      </div>
    );
  }
}

ButtonView.propTypes = {
  name: PropTypes.string
};

ButtonView.defaultProps = {
  name: 'test1'
};

export default ButtonView;

import React, { Component } from 'react';
import classNames from 'classnames';
import './buttom.less';

class Button_3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      isRipple: false,
      onClick: props.onClick
    };
    this.handleClick = this.handleClick.bind(this);
  }
  tick() {
    this.setState(prevState => ({
      isRipple: !prevState.isRipple
    }));
  }
  handleClick(e) {
    e.preventDefault();
    this.tick();
    setTimeout(() => this.tick(), 700);
  }
  render() {
    let btnClass = classNames({
      ripple: true,
      active: this.state.isRipple
    });
    return (
      <div className="container" onClick={this.props.onClick}>
        <button type="button" className={btnClass} onClick={this.handleClick}>
          Click <span>Me</span>
        </button>
      </div>
    );
  }
}

export default Button_3D;

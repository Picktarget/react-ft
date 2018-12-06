import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wave from '../_util/Wave';
import classNames from 'classnames';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}
function insertSpace(child, needInserted) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return React.cloneElement(
      child,
      {},
      child.props.children.split('').join(SPACE)
    );
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

class Button extends Component {
  static defaultProps = {
    prefixCls: 'gd-btn',
    loading: false,
    ghost: false,
    block: false
  };

  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { loading } = this.state;
    const { onClick } = this.props;
    if (!!loading) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  }

  isNeedInserted() {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }

  render() {
    const {
      type,
      shape,
      size,
      className,
      children,
      icon,
      prefixCls,
      ghost,
      loading,
      block,
      ...rest
    } = this.props;

    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-block`]: block
    });
    const { htmlType, ...otherProps } = rest;

    const kids =
      children || children === 0
        ? React.Children.map(children, child =>
            insertSpace(child, this.isNeedInserted())
          )
        : null;

    return (
      <Wave>
        <button
          {...otherProps}
          type={htmlType || 'button'}
          className={classes}
          onClick={this.handleClick}
          ref={this.saveButtonRef}
        >
          {kids}
        </button>
      </Wave>
    );
  }
}

export default Button;

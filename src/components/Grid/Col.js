import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RowContext from './RowContext';

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);
const objectOrNumber = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number
]);

class Col extends Component {
  static propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
    xxl: objectOrNumber
  };

  render() {
    const props = this.props;
    const {
      span,
      order,
      offset,
      push,
      pull,
      className,
      children,
      prefixCls = 'gd-col',
      ...others
    } = props;
    let sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
      let sizeProps = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

      delete others[size];

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]:
          sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]:
          sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
          sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]:
          sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]:
          sizeProps.pull || sizeProps.pull === 0
      };
    });
    const classes = classNames(
      {
        [`${prefixCls}-${span}`]: span !== undefined,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-offset-${offset}`]: offset,
        [`${prefixCls}-push-${push}`]: push,
        [`${prefixCls}-pull-${pull}`]: pull
      },
      className,
      sizeClassObj
    );

    return (
      <RowContext.Consumer>
        {({ gutter }) => {
          let style = others.style;
          if (gutter > 0) {
            style = {
              paddingLeft: gutter / 2,
              paddingRight: gutter / 2,
              ...style
            };
          }
          return (
            <div {...others} style={style} className={classes}>
              {children}
            </div>
          );
        }}
      </RowContext.Consumer>
    );
  }
}

export default Col;

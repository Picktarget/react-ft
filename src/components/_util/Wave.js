import { Component } from 'react';
import { findDOMNode } from 'react-dom';

let styleForPesudo;
// Where el is the DOM element you'd like to test for visibility
function isHidden(element) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return !element || element.offsetParent === null;
}

export class Wave extends Component {
  componentDidMount() {
    const node = findDOMNode(this);
    if (node.nodeType !== 1) {
      return;
    }
    this.instance = this.bindAnimationEvent(node);
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.cancel();
    }
    if (this.clickWaveTimeoutId) {
      clearTimeout(this.clickWaveTimeoutId);
    }

    this.destroy = true;
  }

  isNotGrey(color) {
    const match = (color || '').match(
      /rgba?\((\d*), (\d*), (\d*)(, [\\.\d]*)?\)/
    );
    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }
    return true;
  }

  resetEffect(node) {
    if (!node) {
      return;
    }
    const attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
  }

  onClick(node, waveColor) {
    // 新增border-wave
    if (!node || isHidden(node)) {
      return;
    }
    const attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    node.setAttribute(attributeName, 'true');
    // Not white or transparnt or grey
    styleForPesudo = styleForPesudo || document.createElement('style');
    if (
      waveColor &&
      waveColor !== '#ffffff' &&
      waveColor !== 'rgb(255, 255, 255)' &&
      this.isNotGrey(waveColor) &&
      !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
      waveColor !== 'transparent'
    ) {
      styleForPesudo.innerHTML = `[border-wave]:after { border-color: ${waveColor}; }`;
      if (!document.body.contains(styleForPesudo)) {
        document.body.appendChild(styleForPesudo);
      }
    }
    setTimeout(() => this.resetEffect(node), 2000);
  }

  getAttributeName() {
    return 'border-wave';
  }

  bindAnimationEvent(node) {
    if (
      !node ||
      !node.getAttribute ||
      node.getAttribute('disabled') ||
      node.className.indexOf('disabled') >= 0
    ) {
      return;
    }
    const onClick = e => {
      // 重置node的Effect
      this.resetEffect(node);
      // 获取node的主元素的border颜色
      const waveColor =
        getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') ||
        getComputedStyle(node).getPropertyValue('background-color');
      this.clickWaveTimeoutId = window.setTimeout(
        () => this.onClick(node, waveColor),
        0
      );
    };
    node.addEventListener('click', onClick, true);
    return {
      cancel: () => {
        node.removeEventListener('click', onClick, true);
      }
    };
  }
  render() {
    return this.props.children;
  }
}

export default Wave;

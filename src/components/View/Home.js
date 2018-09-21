import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SingleLine from '../charts/SingleLine';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <SingleLine />
          </Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </div>
    );
  }
}

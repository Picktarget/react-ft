import React, { Component } from 'react';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import { Slider } from 'antd';

class GridView extends Component {
  gutters = {};

  colCounts = {};

  constructor() {
    super();
    this.state = {
      gutterKey: 1,
      colCountKey: 2
    };
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.gutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      this.colCounts[i] = value;
    });
  }

  onGutterChange = gutterKey => {
    this.setState({ gutterKey });
  };

  onColCountChange = colCountKey => {
    this.setState({ colCountKey });
  };
  render() {
    const { gutterKey, colCountKey } = this.state;
    const cols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';
    for (let i = 0; i < colCount; i++) {
      cols.push(
        <Col key={i.toString()} span={24 / colCount}>
          <div>Column</div>
        </Col>
      );
      colCode += `  <Col span={${24 / colCount}} />\n`;
    }

    return (
      <React.Fragment>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8} offset={8}>
            col-8
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            col-6 col-offset-6
          </Col>
          <Col span={6} offset={6}>
            col-6 col-offset-6
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            col-12 col-offset-6
          </Col>
        </Row>
        <Row>
          <Col span={18} push={6}>
            col-18 col-push-6
          </Col>
          <Col span={6} pull={18}>
            col-6 col-pull-18
          </Col>
        </Row>
        <div>
          <p>sub-element align left</p>
          <Row type="flex" justify="start">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>

          <p>sub-element align center</p>
          <Row type="flex" justify="center">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>

          <p>sub-element align right</p>
          <Row type="flex" justify="end">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>

          <p>sub-element monospaced arrangement</p>
          <Row type="flex" justify="space-between">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>

          <p>sub-element align full</p>
          <Row type="flex" justify="space-around">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
        </div>
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 6 }}>Gutter (px): </span>
            <div style={{ width: '50%' }}>
              <Slider
                min={0}
                max={Object.keys(this.gutters).length - 1}
                value={gutterKey}
                onChange={this.onGutterChange}
                marks={this.gutters}
                step={null}
              />
            </div>
            <span style={{ marginRight: 6 }}>Column Count:</span>
            <div style={{ width: '50%' }}>
              <Slider
                min={0}
                max={Object.keys(this.colCounts).length - 1}
                value={colCountKey}
                onChange={this.onColCountChange}
                marks={this.colCounts}
                step={null}
              />
            </div>
          </div>
          <Row gutter={this.gutters[gutterKey]}>{cols}</Row>
          <pre>{`<Row gutter={${
            this.gutters[gutterKey]
          }}>\n${colCode}</Row>`}</pre>
        </div>
      </React.Fragment>
    );
  }
}

export default GridView;

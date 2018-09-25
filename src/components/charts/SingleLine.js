import React, { Component } from 'react';
import * as d3 from 'd3';
export default class SingleLine extends Component {
  componentDidMount() {
    this.draw();
  }

  render() {
    let tooltip_style = {
      width: '90px',
      height: '100px',
      background: 'rgba(255,255,255,1)',
      border: '1px solid #ccc',
      borderRadius: '2px',
      position: 'absolute',
      top: 0,
      left: 0,
      visibility: 'hidden'
    };
    return (
      <div id="singleLine">
        <div className="tooltip" style={tooltip_style} />
      </div>
    );
  }

  draw = () => {
    const dataset = [
      {
        year: '1991',
        value: 3
      },
      {
        year: '1992',
        value: 4
      },
      {
        year: '1993',
        value: 3.5
      },
      {
        year: '1994',
        value: 5
      },
      {
        year: '1995',
        value: 4.9
      },
      {
        year: '1996',
        value: 6
      },
      {
        year: '1997',
        value: 7
      },
      {
        year: '1998',
        value: 9
      },
      {
        year: '1999',
        value: 13
      }
    ];
    let chart = d3.select('#singleLine');
    let svg = chart
      .append('svg')
      .attr('width', '500')
      .attr('height', '360');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;
    // 将日期处理为日期对象
    var parseTime = d3.timeParse('%Y');
    dataset.map(o => {
      o.year = parseTime(o.year);
    });
    let g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // x 轴坐标转换
    let x = d3
      .scaleTime()
      .domain([parseTime(1991), parseTime(1999)])
      .rangeRound([0, width]);
    // y 轴坐标转换
    let y = d3
      .scaleLinear()
      .domain([3, 13])
      .rangeRound([height, 0]);
    // line生成
    let line = d3
      .line()
      .x(d => {
        return x(d.year);
      })
      .y(d => {
        return y(d.value);
      });
    // 绘制grid
    let grid = g.append('g').attr('class', 'grid');
    let h = grid.append('g').attr('class', 'grid-horizontal');
    let v = grid.append('g').attr('class', 'grid-vertical');
    h.selectAll('line')
      .data(y.ticks(8))
      .enter()
      .append('line')
      .attr('class', 'horizontal')
      .attr('visibility', function(d, i) {
        if (!i) {
          return 'hidden';
        }
      })
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', function(d) {
        return y(d);
      })
      .attr('y2', function(d) {
        return y(d);
      })
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '3 3');
    v.selectAll('line')
      .data(x.ticks(8))
      .enter()
      .append('line')
      .attr('visibility', function(d, i) {
        if (!i) {
          return 'hidden';
        }
      })
      .attr('class', 'vertical')
      .attr('x1', function(d, i) {
        return x(d);
      })
      .attr('x2', function(d, i) {
        return x(d);
      })
      .attr('y1', 0)
      .attr('y2', height)
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '3 3');
    // 绘制x轴
    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
    // 绘制y轴
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');

    // 处理坐标轴颜色
    // g.selectAll('path.domain').attr('stroke', 'red');

    // g.selectAll('text').attr('fill', 'red');
    // g.select('text[text-anchor]').attr('fill', '#000');
    // g.selectAll('line').attr('stroke', 'red');
    // 绘制line
    g.append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
    // 绘制点
    let circle_g = g
      .append('g')
      .attr('class', 'circle')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', 'circle-g');
    circle_g
      .append('circle')
      .attr('class', 'c-n')
      .attr('cx', function(d) {
        return x(d.year);
      })
      .attr('cy', function(d) {
        return y(d.value);
      })
      .attr('r', 5)
      .attr('fill', '#fff')
      .attr('stroke', 'blue')
      .attr('stroke-width', '1')
      .on('mouseover', function(d, i) {
        d3.selectAll('.dot-active').remove();
        g.append('g')
          .attr('class', 'dot-active')
          .append('circle')
          .attr('cx', function() {
            return x(d.year);
          })
          .attr('cy', function() {
            return y(d.value);
          })
          .attr('r', 7)
          .attr('fill', 'red')
          .on('mouseout', function(d, i) {
            d3.selectAll('.dot-active').remove();
            d3.select('.tooltip')
              .transition()
              .duration(500)
              .style('visibility', 'hidden');
          });
        d3.select('.tooltip')
          .transition()
          .duration(500)
          .style('visibility', 'visible')
          .style('left', d3.event.offsetX + 10 + 'px')
          .style('top', d3.event.offsetY - 110 + 'px');
      });
  };
}

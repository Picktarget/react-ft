import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MySider extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  defaultSelectedKeys = [];
  defaultOpenKeys = [];
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={this.defaultSelectedKeys}
          defaultOpenKeys={this.defaultOpenKeys}
          mode="inline"
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>折线图</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">
              <Icon type="desktop" />
              <span>About</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/topics"
            title={
              <span>
                <Icon type="user" />
                <span>Topics</span>
              </span>
            }
          >
            <Menu.Item key="/topics/aric">
              <Link to="/topics/aric">Aric</Link>
            </Menu.Item>
            <Menu.Item key="/topics/bill">
              <Link to="/topics/bill">Bill</Link>
            </Menu.Item>
            <Menu.Item key="/topics/alex">
              <Link to="/topics/alex">Alex</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="/team"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="/topics/team_1">
              <Link to="/topics/team_1">Team 1</Link>
            </Menu.Item>
            <Menu.Item key="/topics/team_2">
              <Link to="/topics/team_2">Team 2</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/file">
            <Link to="/file">
              <Icon type="file" />
              <span>File</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  componentWillMount() {
    console.log(this.props.location);
    const p = this.props.location.pathname;
    this.defaultSelectedKeys = [];
    this.defaultSelectedKeys.push(p);

    this.defaultOpenKeys = [];
    this.defaultOpenKeys.push('/topics');
  }
}

export default withRouter(MySider);

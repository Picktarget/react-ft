import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import './App.css';
import Main from './components/main';
import { BrowserRouter as Router } from 'react-router-dom';
import MySider from './components/Sider/MySider';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <MySider />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0', display: 'none' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <Main />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;

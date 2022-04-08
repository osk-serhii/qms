import React from "react";
import { Outlet, Link } from "react-router-dom";

import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AuditOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Appcontainer extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="min-h-screen">
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo h-8 m-4 bg-gray-600" />
          <Menu theme="dark" defaultSelectedKeys={["home"]} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to={`/`}>Home</Link>
            </Menu.Item>

            <Menu.Item key="basic-settings" icon={<SettingOutlined />}>
              <Link to={`/settings/basic/product-group`}>Basic settings</Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<AuditOutlined />} title="Audit">
              <Menu.Item key="3">Internal Audit</Menu.Item>
              <Menu.Item key="4">Supplier Audit</Menu.Item>
              <Menu.Item key="5">NCR</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="p-0" />
          <Content className="my-0">
            <Outlet />
          </Content>
          <Footer className="text-center bg-white">QMS</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Appcontainer;

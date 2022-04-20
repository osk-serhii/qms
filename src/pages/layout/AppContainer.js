import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  Space, 
} from "antd";
import {
  HomeOutlined,
  AuditOutlined,
  SettingOutlined,
  FundViewOutlined,
  UserOutlined,
  DashboardOutlined,
  ControlOutlined  
} from "@ant-design/icons";
import { logout } from '../../store/authSlice';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function  Appcontainer() {
  
  const dispatch = useDispatch();;
  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" disabled>
          Profile
        </Button>
      </Menu.Item>
    </Menu>
  );

  const user = useSelector((state) => state.auth.user);

  const [collapsed, setCollapsed ] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) =>setCollapsed(collapsed)}>
        <div>
          <img 
            className="h-10 mx-auto bg-white  mt-3 mb-2"
            alt="logo"
            src="images/logo.png"
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to={`/`}>Home</Link>
          </Menu.Item>

          <Menu.Item key="basic-settings" icon={<SettingOutlined />}>
            <Link to={`/settings/basic/product-group`}>Basic settings</Link>
          </Menu.Item>

          <Menu.Item key="strategic-analysis" icon={<FundViewOutlined />}>
            <Link to={`/modules/strategic-analysis/interested-parties-analysis-expectation`}>Strategic Analysis</Link>
          </Menu.Item>

          <Menu.Item key="minutes-meeting" icon={<DashboardOutlined />}>
            <Link to={`/modules/minutes-meeting`}>Minutes of Meeting</Link>
          </Menu.Item>
          <Menu.Item key="management-change" icon={<ControlOutlined />}>
            <Link to={`/modules/management-change`}>Management of Change</Link>
          </Menu.Item>

          {/*<SubMenu key="sub1" icon={<AuditOutlined />} title="Audit">
            <Menu.Item key="3">Internal Audit</Menu.Item>
            <Menu.Item key="4">Supplier Audit</Menu.Item>
            <Menu.Item key="5">NCR</Menu.Item>
          </SubMenu>*/}
        </Menu>
      </Sider>
      <Layout className="site-layout static">
        <Header className="p-0">
        <Dropdown overlay={menu} 
          placement="bottomRight" 
          arrow
          className="absolute top-0 right-5"
        >
          <Space align="center" className="cursor-pointer">
            <Avatar size="large" icon={<UserOutlined />} />
            <p className="text-white inline">{user.name}</p>
          </Space>
        </Dropdown>
        </Header>
        
        <Content className="my-0">
          <Outlet />
        </Content>
        <Footer className="text-center bg-white">QMS</Footer>
      </Layout>
    </Layout>
  );
}

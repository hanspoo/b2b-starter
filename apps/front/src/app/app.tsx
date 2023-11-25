import {
  HomeOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import '../styles.css';

import {
  LoginState,
  LoginSection,
  UsersContainer,
  UserDetailFromRouter,
  CustomLink,
} from '@starter-ws/auth/ui';
import { useSelector } from 'react-redux';
import { RootState } from '@starter-ws/reductor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

enum Modo {
  HOME = 'Home',
  USERS = 'Users',
  ABOUT = 'Acerca de',
}

const DoApp = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [modo, setModo] = useState(Modo.HOME);
  const [collapsed, setCollapsed] = useState(false);

  if (!loggedIn) return <LoginSection />;

  function onChangeMenu(args: any) {
    setModo(args.key);
  }

  return (
    <BrowserRouter>
      <Layout id="container" role="container">
        <LoginState />
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />

          <Menu
            onClick={onChangeMenu}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[Modo.HOME + '']}
            items={[
              {
                key: Modo.HOME,
                icon: <HomeOutlined />,
                label: <CustomLink to="/">Home</CustomLink>,
              },
              {
                key: Modo.USERS,
                icon: <UserOutlined />,
                label: <CustomLink to="/users">Users</CustomLink>,
              },
              {
                key: Modo.ABOUT,
                icon: <InfoCircleOutlined />,
                label: <CustomLink to="/about">About</CustomLink>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="users">
                <Route path="" element={<UsersContainer />} />
                <Route path=":id" element={<UserDetailFromRouter />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default DoApp;

function Home() {
  return <div>Home</div>;
}
function About() {
  return <div>This is the about section.</div>;
}

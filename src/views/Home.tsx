import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

const { Header} = Layout;

// header
const itemsLabel1:string[] = ['机器人', '焊接', '相机']
const items1: MenuProps['items'] = ['/robot', '/weld', '/camera'].map((key,index) => ({
  key,
  label: itemsLabel1[index],
}));


const Home: React.FC = () => {
    const navTo = useNavigate();
    const menuNavClick = (e:{key:string}) => {
        // 编程式导航
        navTo(e.key);
    }
  return (
    <Layout style={{height: '100vh'}}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/robot']} items={items1} onClick={menuNavClick}/>
      </Header>

      <Outlet/>

    </Layout>
  );
};

export default Home;


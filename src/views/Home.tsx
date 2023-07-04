import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {NavigateFunction, Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header} = Layout;

// header
const itemsLabel1:string[] = ['机器人', '焊接']
const items1: MenuProps['items'] = ['/robot', '/weld', '/camera'].map(
    (key,index) => (
        {
            key,
            label: itemsLabel1[index],
        }
    )
);

const Home: React.FC = () => {
    // 导航跳转
    const navTo: NavigateFunction = useNavigate();
    const currentRoute = useLocation();
    const menuNavClick = (e:{key:string}) => {
        // 编程式导航
        navTo(e.key);
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    // 当前样式所在选中项
                    defaultSelectedKeys={[currentRoute.pathname]}
                    items={items1}
                    onClick={menuNavClick}
                />
            </Header>
            <Outlet/>
        </Layout>
    );
};

export default Home;


import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";
import * as THREE from "@types/three";
import React from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import RobotMenu from "@/components/Menu/RobotMenu";
import {Outlet} from "react-router-dom";

const { Content, Sider } = Layout;


const Robot: React.FC = () => {
    // colorBgContainer
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
                <RobotMenu/>
            </Sider>
            <Layout style={{ padding: '24px 24px 24px' }}>
                <Content
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '100%',
                      width: '100%',
                      background: colorBgContainer,
                    }}
                >
                    {/* => robotViews => home */}
                    <Outlet/>
                    {/*robot control and visualize*/}
                </Content>
            </Layout>
        </Layout>

    )
}

export default Robot;
import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";

import React from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import HelloLight from "@/threeComponents/CameraComp/index.tsx"

const { Content, Sider } = Layout;


const Camera = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
    );
    return (
        <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={items2}
                    // onClick={menuClick}
                />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                      padding: 0,
                      margin: 0,
                      minHeight: 600,
                      background: colorBgContainer,
                    }}
                >
                    <HelloLight/>
                </Content>
            </Layout>
        </Layout>

    )
}

export default Camera;
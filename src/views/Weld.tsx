import {Breadcrumb, Layout, Menu, MenuProps, theme, Button, message, Steps } from "antd";

import React, { useState } from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined,   VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;

// define steps items
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

// define items2 in sider
// const items2: MenuProps['items'] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
//     UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
//     UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
          key: `sub${key}`,
          icon: React.createElement(icon),
          label: `subnav ${key}`,

          children: new Array(10).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
              key: subKey,
              label: `option${subKey}`,
            };
          }),
        };
    },
);

const Weld = () => {
    // def colorBgContainer
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // Props of current step
    //next, previous
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const stepItems = steps.map((item) => (
        { key: item.title, title: item.title })
    );
    // return component "Weld"
    return (
        <Layout>
            <Sider width={200} style={{ height: '100%', background: colorBgContainer }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ overflow: 'auto',borderRight: 0, height: '100%', }}
                    items={items2}
                    // onClick={menuClick}
                />
            </Sider>
            <Layout style={{ padding: 0 }}>
                <Steps current={current} items={stepItems} style={{ padding: '12px'}}/>
                <Content
                    style={{
                      padding: 0,
                      margin: '0 24px 24px',
                      height: '100%',
                      background: colorBgContainer,
                    }}
                >
                </Content>

            </Layout>
        </Layout>

    )
}

export default Weld;
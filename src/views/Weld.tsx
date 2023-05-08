import {Breadcrumb, Layout, Menu, MenuProps, theme, Button, message, Steps } from "antd";
import { Canvas } from "@react-three/fiber"
import React, { useState, Suspense } from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Cloud, Sky } from "@react-three/drei";
import {useDispatch, useSelector} from "react-redux";
import WeldApp from "@/threeComponents/WeldComp";


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

    //create a useState control current workpiece
    const defaultName:string = "";
    const [WorkpieceName, setWorkpiece] = useState<string>(defaultName)

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
                    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30}}>
                        <WeldApp WorkpieceName={WorkpieceName}/>
                    </Canvas>
                </Content>

            </Layout>
        </Layout>

    )
}

export default Weld;
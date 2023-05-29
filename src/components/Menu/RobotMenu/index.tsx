import {MenuProps, Menu, MenuItem} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        label: '机器人运动',
        key: '/robot/home'
    },
    {
        label: '循环运动',
        key: '/robot/loop',
        children:
        [
            {
                label: '运动模式1',
                key: '/robot/loop/loop1'
            },
            {
                label: '运动模式2',
                key: '/robot/loop/loop2'
            },
        ]
    },
    {
        label: '机器人信息',
        key: '/robot/info',
        children:
        [
            {
                label: '硬件信息',
                key: '/robot/info/hard'
            },
            {
                label: '软件信息',
                key: '/robot/info/soft'
            },
        ]
    },
]
const RobotMenu: React.FC = () => {
    // 导航跳转
    const navTo: NavigateFunction = useNavigate();
    const menuNavClick = (e:{key:string}) => {
        // 编程式导航
        navTo(e.key);
    }
    //
    const currentRoute = useLocation();
    let firstOpenKey: string = "";
    function findKey(obj:{key:string}){
        return obj.key === currentRoute.pathname;
    }
    for ( let i = 0; i < items.length; i++){
        if( items[i]!['children'] && items[i]['children'].find(findKey) ){
            firstOpenKey = items[i]!.key;
            break;
        }
    }
    // 设置展开项初始值
    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys:string[]) => {
        console.log(keys)
        setOpenKeys([keys[keys.length - 1]]);
        console.log(openKeys)
    }
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[currentRoute.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            // 菜单项数据
            items={items}
            onClick={menuNavClick}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
        />
    )
};
export default RobotMenu;
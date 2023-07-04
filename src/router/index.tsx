import React, { lazy } from "react";
import Home from "@/views/Home.tsx";
import { Spin } from "antd";
// import Weld from "@/views/Weld.tsx";
// import Camera from "@/views/Camera.tsx";
// import About from "@/views/About.tsx";
// need a Loading component 不使用全部引入, 按需进行懒路由, 接收路由指令后再加载
// 重定向
import { Navigate } from "react-router-dom";
const Weld = lazy( ()=>import("@/views/Weld.tsx") )
const Camera = lazy( ()=>import("@/views/Camera.tsx") )
const Robot = lazy(()=>import("@/views/Robot.tsx"))
const RobotInfoHard = lazy(()=>import("@/views/RobotViews/pageHardInfo.tsx"))
const RobotHome = lazy(()=>import("@/views/RobotViews/home.tsx"))
const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={
        <div style={{textAlign: "center", padding: 300}}>
            <Spin tip="Loading" size="large"></Spin>
        </div>
    }>
        {comp}
    </React.Suspense>
)
const routes = [
    {
        path:"/",
        element: <Navigate to="/robot/home"/>
    },
    {
        path:"/home",
        element: <Home />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/robot",
                element: withLoadingComponent(<Robot />),
                children:[
                    {
                        path:"/robot/home",
                        element: withLoadingComponent(<RobotHome/>)
                    },
                    {
                        path: "/robot/info/hard",
                        element: withLoadingComponent(<RobotInfoHard/>)
                    }
                ]
            },
            {
                path:"/weld",
                element:withLoadingComponent(<Weld />)
            }
//             {
//                 path:"/camera",
//                 element:withLoadingComponent(<Camera />)
//             }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/robot"/>
    }
]
export default routes
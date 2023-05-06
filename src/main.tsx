import React from 'react'
import ReactDOM from 'react-dom/client'
// 样式引入顺序
// 1.样式初始化
import "reset-css"
// 2.UI框架样式
// 3.全局样式
import "@/assets/styles/global.scss"
// 4.组件样式
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// import Router from "@/router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </React.StrictMode>,
)

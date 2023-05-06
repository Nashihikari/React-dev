import App from "@/App.tsx";
import Home from "@/views/Home.tsx";
import About from "@/views/About.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// two ways of Router Components: BrowserRouter (History Mode), HashRouter ( Hash Mode )
// const baseRouter = () => {
//     return ()

// 如果函数没处理逻辑,可以省略return,直接 => ()
const baseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                {/* 访问 / 重定向到 /home */}
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home/>}> </Route>
                <Route path="/about" element={<About/>}> </Route>

            </Route>
        </Routes>
    </BrowserRouter>
)
export default baseRouter;
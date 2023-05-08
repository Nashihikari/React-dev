import { useRoutes } from "react-router-dom";
import router from "@/router";
const App = () => {

    const outlet = useRoutes(router)

    return (
        <div className="App">
            {/* 占位符组件 类似窗口 用来展示组件 */}
            {/*<Outlet></Outlet>*/}
            {outlet}
        </div>
    )
}

export default App;

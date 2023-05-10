import { Canvas } from "@react-three/fiber"
import RobotWorld from "@/threeComponents/RobotComp/scene.tsx"

const RobotHome = () => {
    return (
        // <Canvas camera={{ position: [0, 0, 16], fov: 30}}>
            <RobotWorld/>
        // </Canvas>
    )
}



export default RobotHome;
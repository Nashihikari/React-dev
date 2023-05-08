import { Canvas } from "@react-three/fiber"
import SceneRobot from "@/threeComponents/RobotComp/scene.tsx"



const RobotHome = () => {
    return (
        <Canvas camera={{ position: [0, 0, 16], fov: 75}}>
            <SceneRobot/>
        </Canvas>
    )
}



export default RobotHome;
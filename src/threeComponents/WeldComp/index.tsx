import * as THREE from "three";
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import WorkpieceScene from "@/threeComponents/WeldComp/workpiece.ts";

interface WorkpieceProps {
    WorkpieceName: string | null,
    WorkLines:  string | string[] | null,
    TransformMatrix: number[] | null
}

const WeldApp: React.FC<WorkpieceProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [curScene, setScene] = useState<THREE.Scene | null>(null)
    const [curcamera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)

    // 挂载基础场景， 不做任何额外场景物体的添加和变化
    useLayoutEffect(() => {
        if ( canvasRef.current === null ) { return }
        // @ts-ignore
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { canvas: canvasRef.current })
        const canvas: HTMLCanvasElement = canvasRef.current
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        // camera setting
        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000
        )
        camera.position.set(1, 0, 0)
        camera.up.set(0,0,1)
        camera.lookAt(0,0,0)
        setCamera(camera)

        // main scene create and setting
        const scene = new THREE.Scene()
        setScene(scene)
        scene.background = new THREE.Color( 0xffffff )
        // controls create and setting
        const controls = new OrbitControls(camera, canvas)
        scene.add(controls)

        // AxesHelper
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
        //render
        const render = () => {
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        //
        window.requestAnimationFrame(render)

        // function for reset the renderer's size
        const handleResize = () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        }
        handleResize() //默认打开时，即重新触发一次
        // observer bind resizeObserver
        const resizeObserver = new ResizeObserver( () => {
            handleResize()
        })
        resizeObserver.observe(canvasRef.current)
        // resizeHandleRef.current = handleResize //将 resizeHandleRef.current 与 useEffect() 中声明的函数进行绑定
        return () => {
            resizeObserver.disconnect()
        }

    }, [canvasRef]
    )

    useEffect(()=>{
        if (props.WorkpieceName === ''){
            return
        }
        const wps = WorkpieceScene(props.WorkpieceName, props.TransformMatrix)
        curScene?.add(wps)
        console.log(curScene)
        return ()=>{
            curScene?.remove(wps)
        }
    },[props.WorkpieceName, props.TransformMatrix])

    useEffect(()=>{
        console.log(props.TransformMatrix)
    }, [props.TransformMatrix])

    return (
        <canvas ref={canvasRef} style={{ display: "block", width: "inherit", height: "inherit"}} ></canvas>
    )

}
export default WeldApp;
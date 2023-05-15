import { useRef, useEffect } from "react";
import * as THREE from 'three';
// @ts-ignore
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { workpieceScene } from "@/threeComponents/RobotComp/workpiece.ts";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const RobotWorld = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
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
        camera.position.set(2, 0, 0)
        camera.up.set(0,0,1)
        camera.lookAt(0,0,0)
        // controls create and setting
        const controls = new OrbitControls(camera, document.body)
        // main scene create and setting
        const scene: THREE.Scene = new THREE.Scene()
        scene.background = new THREE.Color( 0xffffff )
        // scene.add
        scene.add(workpieceScene)
        scene.add(controls)
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
    return (
        <canvas ref={canvasRef} style={{ display: "block", width: "inherit", height: "inherit"}} ></canvas>
    )
}
export default RobotWorld;
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { solarSystem, earthOrbit, moonOribit, pointLight, pointLightHelper } from "@/threeComponents/RobotComp/test-solar.ts";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const nodeArr = [solarSystem, earthOrbit, moonOribit]
const SceneTest:React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<Three.WebGLRenderer | null>(null)
    const cameraRef = useRef<Three.PerspectiveCamera | null>(null)
    const sceneRef = useRef<Three.Scene | null>(null)
    useEffect(() => {
        if (canvasRef.current) {
            // renderer
            const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current as HTMLCanvasElement})
            const canvas = renderer.domElement
            // camera
            const camera = new THREE.PerspectiveCamera(
                30,
                canvas.clientWidth / canvas.clientHeight,
                0.1,
                1000
            )
            camera.position.set(0, 0, 50)
            camera.up.set(0,1,0)
            camera.lookAt(0,0,0)
            cameraRef.current = camera
            // controls
            const controls = new OrbitControls(camera, document.body)
            // scene
            const scene = new THREE.Scene()
            scene.background = new THREE.Color(0x000000)
            sceneRef.current = scene
            // add solar System
            scene.add(solarSystem)
            scene.add(pointLight)
            scene.add(pointLightHelper)
            scene.add(controls)
            //渲染器根据场景、透视镜头来渲染画面，并将该画面内容填充到 DOM 的 canvas 元素中
            //renderer.render(scene, camera)//由于后面我们添加了自动渲染渲染动画，所以此处的渲染可以注释掉
            //添加自动旋转渲染动画
            const render = (time: number) => {
                time = time * 0.001 //原本 time 为毫秒，我们这里对 time 进行转化，修改成 秒，以便于我们动画旋转角度的递增
                nodeArr.map( element => {
                    element.rotation.y = time
                })
                renderer.render(scene, camera)
                window.requestAnimationFrame(render)
            }
            window.requestAnimationFrame(render)
            nodeArr.map(element => {
                const axes = new THREE.AxesHelper()
                const material = axes.material as THREE.Material
                material.depthTest = true
                axes.renderOrder = 0
                element.add(axes)
            })
            // resize canvas
            const handleResize = () => {
                const canvas = renderer.domElement
                camera.aspect = canvas.clientWidth / canvas.clientHeight
                camera.updateProjectionMatrix()
                renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
            }
            handleResize() //默认打开时，即重新触发一次
            const resizeObserver = new ResizeObserver( () => {
                handleResize()
            })
            resizeObserver.observe(canvasRef.current)
            // resizeHandleRef.current = handleResize //将 resizeHandleRef.current 与 useEffect() 中声明的函数进行绑定
            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [canvasRef])
    return (
        <canvas ref={canvasRef}  style={{ display: "block", width: "inherit", height: "inherit"}}/>
    )
};
export default SceneTest;

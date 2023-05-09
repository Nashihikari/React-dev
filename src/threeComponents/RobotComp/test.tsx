import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {cos} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

const SceneTest = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasProps = canvas.getBoundingClientRect()
    const renderer = new THREE.WebGLRenderer({ canvas });

    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasProps.height / canvasProps.width,
      0.1,
      1000
    );

    camera.position.z = 16;

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 渲染场景
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // 在组件卸载时清理 Three.js 相关资源
    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{height:'100%', width:'100%'}}/>;
};

export default SceneTest;

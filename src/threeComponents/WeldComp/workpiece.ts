import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as THREE from 'three';
// import FAIRWorkpiece from '@/assets/FAIRWorkpiece.stl'
const WorkpieceScene = (workpieceName: string | null, transMatrix:number[] | null) => {
    const workpieceScene = new THREE.Object3D()
    // material
    const meshMat = new THREE.MeshPhongMaterial(
        {
            color: 0x897a70,
            fog: true,
            specular: 0xaf9350
        }
    )
    // texture loader
    // loader
    const stlLoader = new STLLoader()
    // material loader
    // @ts-ignore
    const mtlLoader = new MTLLoader()
    const objLoader = new OBJLoader()
    const fileLoader = new THREE.FileLoader()
    // load all work lines
    // objLoader.setPath('/src/assets/FAIROBJ/')
    /*
    *   $加载工件模型$
    * */
    if (workpieceName) {
        const workpiecePath: string = workpieceName.split('.')[0]
        const stlLoadPath = '/src/assets/workpiece/' + workpiecePath + '/'
        stlLoader.setPath(stlLoadPath)
        // @ts-ignore
        stlLoader.load('workpiece.stl',
            (workpiece) => {
                // work-piece
                const workpieceMesh: THREE.Mesh = new THREE.Mesh(workpiece, meshMat)
                workpieceMesh.position.set(0, 0, 0)
                workpieceMesh.castShadow = true;
                workpieceMesh.receiveShadow = false; //default
                workpieceScene.add(workpieceMesh)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            }
        )
    }
    // plane
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0xc6c6c6, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(0,0,-0.075)
    // light
    const pointLight = new THREE.PointLight(0xFFFFFF, 1)
    pointLight.position.set(0, 0, 2)
    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
    workpieceScene.add(pointLight)
    workpieceScene.add(ambientLight)
    workpieceScene.add(plane)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 512;
    pointLight.shadow.mapSize.height = 512
    pointLight.shadow.camera.near = 0.5;    // default
    pointLight.shadow.camera.far = 500      // default
    plane.receiveShadow = true;
    if (transMatrix){
        const mat4 = new THREE.Matrix4()
        // workpieceScene.applyMatrix4()
    }
    return (workpieceScene)
}
export default WorkpieceScene
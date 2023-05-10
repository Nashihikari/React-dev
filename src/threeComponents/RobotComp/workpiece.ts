import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as THREE from 'three';
// import FAIRWorkpiece from '@/assets/FAIRWorkpiece.stl'

export const workpieceScene = new THREE.Object3D()

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
const mtlLoader = new MTLLoader()
const objLoader = new OBJLoader()
objLoader.setPath('/src/assets/')

objLoader.load('FAIROBJ/FAIR5.obj', (robot) => {
    // work-piece

    robot.position.set(0, 0, -0.075)
    workpieceScene.add(robot)
})

stlLoader.setPath('/src/assets/')
// @ts-ignore
stlLoader.load('FAIRWorkpiece.stl', (workpiece) => {
    // work-piece
    const workpieceMesh: THREE.Mesh = new THREE.Mesh( workpiece, meshMat)
    workpieceMesh.position.set(1, 0, 0)
    workpieceMesh.castShadow = true;
    workpieceMesh.receiveShadow = false; //default
    workpieceScene.add(workpieceMesh)
})
// mtlLoader.setPath('/src/assets/')
// mtlLoader.load('FAIROBJ/FAIRWorkpiece.mtl', materialCreator => {
//     objLoader.setMaterials(materialCreator)
//     objLoader.load('/src/assets/FAIROBJ/FAIRWorkpiece.obj', (workpiece) => {
//         const workpieceMesh = new THREE.Mesh(workpiece)
//         workpieceScene.add(workpieceMesh)
//     })
// })

// plane
const plane = new THREE.Plane( new THREE.Vector3(0, 0, 0), 0.075);
const helper = new THREE.PlaneHelper( plane, 5, 0x000000 );

// light
const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.position.set(0, 0, 2)
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

workpieceScene.add(pointLight)
workpieceScene.add(ambientLight)
workpieceScene.add(helper)

pointLight.castShadow = true
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512
pointLight.shadow.camera.near = 0.5;    // default
pointLight.shadow.camera.far = 500      // default

helper.receiveShadow = true;



export default { workpieceScene }
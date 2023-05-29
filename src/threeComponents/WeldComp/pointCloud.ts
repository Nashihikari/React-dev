import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as THREE from 'three';
// import FAIRWorkpiece from '@/assets/FAIRWorkpiece.stl'
const PointCloudScene = (workpieceName: string | null, pointCloud:boolean) => {
    const pointCloudScene = new THREE.Object3D()
    // material
    const meshMat = new THREE.MeshPhongMaterial(
        {
            color: 0x897a70,
            fog: true,
            specular: 0xaf9350
        }
    )

    const objLoader = new OBJLoader()
    if(pointCloud && workpieceName){
        const workpiecePath: string = workpieceName.split('.')[0]
        const objLoadPath = '/src/assets/workpiece/' + workpiecePath + '/'
        objLoader.setPath(objLoadPath)
        objLoader.load('pointcloud.obj',(pc)=>{
//             const material = new THREE.MeshBasicMaterial( { color: 0xeee } );
//             const pcMesh: THREE.Mesh = new THREE.Mesh(pc, material)
            pc.scale.set(0.001, 0.001, 0.001)
            pointCloudScene.add(pc)
        })
    }


    return pointCloudScene
}
export default PointCloudScene
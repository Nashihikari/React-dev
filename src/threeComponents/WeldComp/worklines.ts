import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as THREE from 'three';
import WorkpieceScene from "@/threeComponents/WeldComp/workpiece.ts";
/*
*   场景中导入选择的worklines
*   Parameter :
*       workpiece name : string | null
*       work lines : string[] | string | null
*       transform matrix : number[] | null
* */
const WorklinesScene = (workpieceName: string | null, worklines: string[] | string | null, transMatrix:number[] | null) => {
    const worklinesScene = new THREE.Object3D()
    console.log(workpieceName)
    let fileLoadPath: string = ''
    const fileLoader = new THREE.FileLoader()
    if (workpieceName) {
        const workpiecePath: string = workpieceName.split('.')[0]
        fileLoadPath = '/src/assets/workpiece/' + workpiecePath + '/'
        fileLoader.setPath(fileLoadPath)
    }else {
        const workpiecePath: string = 'HFair.stl'.split('.')[0]
        fileLoadPath = '/src/assets/workpiece/' + workpiecePath + '/'
        fileLoader.setPath(fileLoadPath)
    }
    /*
    *   $可视化焊缝$
    * */
    if (worklines){
        fileLoader.load('lines.json', (linesJSON)=>{
            let linesOBJ = JSON.parse(linesJSON)
            // console.log(worklines)
            for ( let i = 0; i < worklines.length; i+=2)
            {
                let key = worklines[i]
                const v1 = new THREE.Vector3(linesOBJ[key][0][0], linesOBJ[key][0][1], linesOBJ[key][0][2]);
                const v2 = new THREE.Vector3(linesOBJ[key][1][0], linesOBJ[key][1][1], linesOBJ[key][1][2]);
                const line = new THREE.LineCurve3(v1, v2);
                // console.log(line)
                const lineTube = new THREE.TubeGeometry(line, 20, 0.002, 8, true);
                const materialTube = new THREE.MeshBasicMaterial( { color: 0xeee } );
                const tubeMesh = new THREE.Mesh( lineTube, materialTube );
                worklinesScene.add(tubeMesh)
            }
        // for ( let i = 0; i < linesJSON.length)
        })
    }
    else{
    }
    return (worklinesScene)
}
export default WorklinesScene
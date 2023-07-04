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
        const workpiecePath: string = workpieceName.split('.')[0] + '.json'
        fileLoadPath = '/src/threeComponents/WeldComp/config/worklines/'
        fileLoader.setPath(fileLoadPath)
    }else {
        const workpiecePath: string = 'HFair.stl'.split('.')[0] + '.json'
        fileLoadPath = '/src/threeComponents/WeldComp/config/worklines/'
        fileLoader.setPath(fileLoadPath)
    }
    /*
    *   $可视化焊缝$
    * */
    const workpiecePath: string = workpieceName.split('.')[0] + '.json'

    if (worklines){
        fileLoader.load(workpiecePath, (linesJSON)=>{
            let linesOBJ = JSON.parse(linesJSON)
            // console.log(worklines)
            for ( let i = 0; i < worklines.length; i += 2)
            {

                let key = worklines[i]
                console.log(linesOBJ[key]['data'])

                if(linesOBJ[key]['type'] === 'line'){
                    for (let j = 0; j < linesOBJ[key]['data'].length - 1; j ++){
                        console.log(linesOBJ[key]['data'][j])
                        let k = j + 1
                        const v1 = new THREE.Vector3(linesOBJ[key]['data'][j][0], linesOBJ[key]['data'][j][1], linesOBJ[key]['data'][j][2]);
                        const v2 = new THREE.Vector3(linesOBJ[key]['data'][k][0], linesOBJ[key]['data'][k][1], linesOBJ[key]['data'][k][2]);
                        const line = new THREE.LineCurve3(v1, v2);
                        const lineTube = new THREE.TubeGeometry(line, 20, 0.002, 8, true);
                        const materialTube = new THREE.MeshBasicMaterial( { color: 0xeee } );
                        const tubeMesh = new THREE.Mesh( lineTube, materialTube );
                        worklinesScene.add(tubeMesh)
                    }
                }else {
                    for (let j = 0; j < linesOBJ[key]['sample'].length - 1; j ++){
                        let k = j + 1
                        const v1 = new THREE.Vector3(linesOBJ[key]['sample'][j][0], linesOBJ[key]['sample'][j][1], linesOBJ[key]['sample'][j][2]);
                        const v2 = new THREE.Vector3(linesOBJ[key]['sample'][k][0], linesOBJ[key]['sample'][k][1], linesOBJ[key]['sample'][k][2]);
                        const line = new THREE.LineCurve3(v1, v2);
                        const lineTube = new THREE.TubeGeometry(line, 20, 0.002, 8, true);
                        const materialTube = new THREE.MeshBasicMaterial( { color: 0xeee } );
                        const tubeMesh = new THREE.Mesh( lineTube, materialTube );
                        worklinesScene.add(tubeMesh)
                    }
                }
                // if( linesOBJ[key]['type'] === 'arc'){
                //     let a1, b1, c1, d1;
                //     let a2, b2, c2, d2;
                //     let a3, b3, c3, d3;
                //
                //     let x1 = linesOBJ[key]['data'][0][0];
                //     let y1 = linesOBJ[key]['data'][0][1];
                //     let z1 = linesOBJ[key]['data'][0][2];
                //     let x2 = linesOBJ[key]['data'][1][0];
                //     let y2 = linesOBJ[key]['data'][1][1];
                //     let z2 = linesOBJ[key]['data'][1][2];
                //     let x3 = linesOBJ[key]['data'][2][0];
                //     let y3 = linesOBJ[key]['data'][2][1];
                //     let z3 = linesOBJ[key]['data'][2][2];
                //
                //     a1 = (y1*z2 - y2*z1 - y1*z3 + y3*z1 + y2*z3 - y3*z2);
                //     b1 = -(x1*z2 - x2*z1 - x1*z3 + x3*z1 + x2*z3 - x3*z2);
                //     c1 = (x1*y2 - x2*y1 - x1*y3 + x3*y1 + x2*y3 - x3*y2);
                //     d1 = -(x1*y2*z3 - x1*y3*z2 - x2*y1*z3 + x2*y3*z1 + x3*y1*z2 - x3*y2*z1);
                //
                //     a2 = 2 * (x2 - x1);
                //     b2 = 2 * (y2 - y1);
                //     c2 = 2 * (z2 - z1);
                //     d2 = x1 * x1 + y1 * y1 + z1 * z1 - x2 * x2 - y2 * y2 - z2 * z2;
                //
                //     a3 = 2 * (x3 - x1);
                //     b3 = 2 * (y3 - y1);
                //     c3 = 2 * (z3 - z1);
                //     d3 = x1 * x1 + y1 * y1 + z1 * z1 - x3 * x3 - y3 * y3 - z3 * z3;
                //
                //     let centerpoint: number[] = [];
                //     centerpoint[0] = -(b1*c2*d3 - b1*c3*d2 - b2*c1*d3 + b2*c3*d1 + b3*c1*d2 - b3*c2*d1) / (a1*b2*c3 - a1*b3*c2 - a2*b1*c3 + a2*b3*c1 + a3*b1*c2 - a3*b2*c1);
	            //     centerpoint[1] = (a1*c2*d3 - a1*c3*d2 - a2*c1*d3 + a2*c3*d1 + a3*c1*d2 - a3*c2*d1) / (a1*b2*c3 - a1*b3*c2 - a2*b1*c3 + a2*b3*c1 + a3*b1*c2 - a3*b2*c1);
	            //     centerpoint[2] = -(a1*b2*d3 - a1*b3*d2 - a2*b1*d3 + a2*b3*d1 + a3*b1*d2 - a3*b2*d1) / (a1*b2*c3 - a1*b3*c2 - a2*b1*c3 + a2*b3*c1 + a3*b1*c2 - a3*b2*c1);
                //     centerpoint[3] = Math.sqrt(Math.pow(x1 - centerpoint[0], 2) + Math.pow(y1 - centerpoint[1], 2) + Math.pow(z1 - centerpoint[2], 2));
                //
                //     console.log(centerpoint[0], centerpoint[1], centerpoint[2], centerpoint[3]);
                //
                // }
            }
        // for ( let i = 0; i < linesJSON.length)
        })
        if (transMatrix){
                const mat4 = new THREE.Matrix4()
                mat4.fromArray(transMatrix)
                worklinesScene.applyMatrix4(mat4)
                console.log(transMatrix)
        }
    }
    else{
    }
    return (worklinesScene)
}
export default WorklinesScene
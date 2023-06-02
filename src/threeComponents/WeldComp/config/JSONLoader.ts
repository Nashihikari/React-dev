import WorkpieceOptions from './workpiece.json'
import * as THREE from 'three';


export const OptionsWorkpieceLoader = () =>{
    let keyArray = []
    let valueArray = []
    console.log(WorkpieceOptions)
    // @ts-ignore
    for ( let key in WorkpieceOptions){
        keyArray.push(key)
    }
    // @ts-ignore
    for (let i = 0; i < keyArray.length; i ++){
        valueArray.push(WorkpieceOptions[keyArray[i]])
    }
    return {keyArray, valueArray}
}



export const OptionsWorklinesLoader = (workpieceName='HFair.stl') => {
    let linesJSON = ''
    let xhr = new XMLHttpRequest()
    const workpiece = workpieceName.split('.')[0] + '.json'
    const xhr_url = '/src/threeComponents/WeldComp/config/worklines/' + workpiece
    xhr.open('GET', xhr_url, false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send();
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        linesJSON = data
    } else {
        console.error('Failed to load data');
    }

    let keyArray = new Array()
    let valueArray = new Array()


    console.log(linesJSON)
    console.log(typeof linesJSON)
    for ( let key in linesJSON){
        keyArray.push(key)
    }
    console.log(keyArray)
    return keyArray
}



export default {OptionsWorkpieceLoader, OptionsWorklinesLoader};
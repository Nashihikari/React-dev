
/*
*   request: send workpiece
*   url: /upload_workpiece
*
* */
export const RequestWorkpiece = (workpiece: string) =>{
    try{
        const workpiecePath = '/src/assets/workpiece/' + workpiece.split('.')[0] + 'workpiece.stl'
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/upload_workpiece'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        formData.append('filepath', workpiecePath)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['msg'] === 'success'){
            return true
        }else{
            return false
        }
    }
    catch (err){
        console.log(err)
        return false
    }
}

/*
*   request: Move Far Shot And Take Photo
*   url: /move_far_shot_and_take_photo
*
* */
export const RequestMoveFarShotAndTakePhoto = (workpiece: string) => {
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/move_far_shot_and_take_photo'
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        // 预留相机参数设置
        formData.append('name', 'far')
        formData.append('exposure_time', '80')
        formData.append('auto_exposure', 'True')
        formData.append('target_light', '50')
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['msg'] === 'success') {
            return RequestSegmentation(workpiece)
        } else {
            return false
        }
    }
    catch (err){
        console.log(err)
        return false
    }
}

/*
*   request: segmentation
*   url: /segmentation
*
* */
// @ts-ignore
const RequestSegmentation = (workpiece: string, seg_type:string='seg1', name:string='default', save_dir:string=null) => {
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/segmentation'
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)

        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['msg'] === 'success') {
            return Response
        } else {
            return false
        }
    }
    catch (err){
        console.log(err)
        return false
    }
}

/*
*   request: use R1
*       /pose_estimation_alg1
* */
export const RequestR1 = (workpiece:string, name='far')=>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/pose_estimation_alg1'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        formData.append('name', name)
        formData.append('model_name_base', workpiece.split('.')[0])
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        console.log(Response)
        if (Response['Matrix']) {
            return Response
        } else {
            return false
        }
    }catch (err){
        console.log(err)
        return false
    }
}

/*
*   request: send work lines
*       /upload_work_lines
* */
export const RequestWorklines = (workpiece:string, worklines: string | string[]) =>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/upload_work_lines'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        formData.append('model_name_base', workpiece.split('.')[0])

        let numArr:string[] = []
        for (let i = 0; i < worklines.length; i+=2){
            numArr.push(worklines[i])
        }
        const data = numArr.toString()
        formData.append('work_lines', data)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['msg'] === 'success'){
            return true
        }else{
            return false
        }
    }
    catch (err){
        console.log(err)
        return false
    }
}

/*
*   request: run robot => weld
*
* */
export const RequestWeld = (workpiece:string) => {
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/execute_welding'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['msg'] === 'success'){

        }else{
            return false
        }
    }
    catch (err){
        console.log(err)
        return false
    }
}
export default {}
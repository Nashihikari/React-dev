/*
*   request: use R1
*       legacy: cmd 1105
* */
const RequestR1 = (workpiece:string)=>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/cmd'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        const cmdHead = '/f/bIII1III1105III'
        const data = 'get transform matrix'
        const len = '4'
        const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
        formData.append('cmd', sendCmd)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        console.log(Response)
        if (Response['Matrix']) {
            return Response['Matrix']
        } else {
            return false
        }
    }catch (err){
        console.log(err)
        return false
    }
}
/*
*   request: send workpiece
*       legacy: cmd 1101
* */
export const RequestWorkpiece = (workpiece: string) =>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/cmd'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        const cmdHead = '/f/bIII1III1101III'
        const data = 'send workpiece name'
        const len = '4'
        const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
        formData.append('cmd', sendCmd)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['result'] === 'success'){
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
*   request: send work lines
*       legacy: cmd 1107
* */
export const RequestWorklines = (workpiece:string, worklines: string | string[]) =>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/cmd'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        const cmdHead = '/f/bIII1III1107III'
        let numArr:string[] = []
        for (let i = 0; i < worklines.length; i+=2){
            numArr.push(worklines[i])
        }
        const data = numArr.toString()
        const len = '4'
        const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
        formData.append('cmd', sendCmd)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['result'] === 'success'){
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
*   request: far camera => take photo
*       legacy: cmd 1203
* */
export const RequestCamera = (workpiece:string) =>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/cmd'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        const cmdHead = '/f/bIII1III1203III'

        const data = 'far camera'
        const len = '4'
        const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
        formData.append('cmd', sendCmd)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['result'] === 'success'){
            return RequestR1(workpiece)
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
*       legacy:
* */
export const RequestWeld = (workpiece:string) =>{
    try{
        const formData = new FormData()
        const xlr = new XMLHttpRequest()
        const tarUrl = 'http://127.0.0.1:3010/cmd'
        // 同步请求
        xlr.open("POST", tarUrl, false)
        formData.append('filename', workpiece)
        const cmdHead = '/f/bIII1III1205III'

        const data = 'run robot'
        const len = '4'
        const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
        formData.append('cmd', sendCmd)
        xlr.send(formData)
        const Response = JSON.parse(xlr.response)
        if (Response['result'] === 'success'){

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
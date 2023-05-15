

export const RequestR1 = (workpiece)=>{
    // const formData = new FormData()
    // const xlr = new XMLHttpRequest()
    // const tarUrl = 'http://127.0.0.1:3010/cmd'
    // // 同步请求
    // xlr.open("POST", tarUrl, false)
    // formData.append('filename', workpiece)
    // const cmdHead = '/f/bIII1III1105III'
    // const data = 'get transform matrix'
    // const len = '4'
    // const sendCmd = cmdHead + len + 'III' + data + 'III/b/f'
    // formData.append('cmd', sendCmd)
    // xlr.send(formData)
    // const Response = JSON.parse(xlr.response)
    // return Response['Matrix']
    const s = [1.007098198061495253e+00,1.161791961890690089e-01,4.502516108827074592e-02,-9.840600632018647502e+02,
                    1.288443439319326977e-01,-1.019353991541093629e+00,2.194904381402740245e-03,-2.640614914235508195e+02,
                    4.242408576535224712e-02,1.224822474453499815e-02,-1.0355015397e+00,-1.996307013089371765e+02,
                    0.000000000000000000e+00,0.000000000000000000e+00,0.000000000000000000e+00,1.000000000000000000e+00]
    const jsonmatrix = JSON.parse('{"Matrix": [1,2,3]}')
    const numArr:number[] = jsonmatrix['Matrix']
    return s
}

export default {}
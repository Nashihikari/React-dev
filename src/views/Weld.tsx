import {
    Select,
    Space,
    Breadcrumb,
    Layout,
    Menu,
    MenuProps,
    theme,
    Button,
    message,
    Steps,
    SelectProps,
    notification,
    Drawer, Image, Card, Col, Row
} from "antd";
import { Canvas } from "@react-three/fiber"
import React, {useState, Suspense, useEffect} from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import WeldApp from "@/threeComponents/WeldComp";
import {values} from "./object";
import {RequestWorkpiece, RequestMoveFarShotAndTakePhoto, RequestWorklines, RequestWeld, RequestR1} from "@/threeComponents/WeldComp/request.ts";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import PointCloudScene from "@/threeComponents/WeldComp/pointCloud.ts";
import {OptionsWorkpieceLoader, OptionsWorklinesLoader} from '@/threeComponents/WeldComp/config/JSONLoader.ts'

const { Content, Sider } = Layout;

const workpieceOptionsLoad = OptionsWorkpieceLoader()

/*  Create options for *selecting the work-piece*
*   day: 5-31 修改成读取json模式
* */
const options: SelectProps['options'] = [];
console.log(workpieceOptionsLoad.keyArray)
console.log(workpieceOptionsLoad.valueArray)

const optArrLabel: string[] = workpieceOptionsLoad.keyArray // ['法奥H型工件', 'TEST1','TEST2','其他工件']
const optArrVal: string[] = workpieceOptionsLoad.valueArray // ['HFair.stl','TEST1.stl','TEST2.stl' ,'OtherWorkpiece.stl']
for ( let i = 0; i < optArrLabel.length; i++ ){
    options.push(
        {
            label: optArrLabel[i],
            value: optArrVal[i]
        }
    )
}

/* define steps items
*  定义步骤线
* */
const steps = [
  {
    title: '焊件选择',
    content: '1',
  },
  {
    title: '拍照',
    content: '2',
  },
  {
      title: '焊缝识别',
      content: '3'
  },
  {
    title: '焊缝选择',
    content: '4',
  },
  {
      title: '执行',
    content: '5',
  }
];


const Weld = () => {
    // def colorBgContainer
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    /*
    *   选项disable属性修改。
    *   workpiece selected
    *   worklines selected
    *   trans matrix apply
    * */
    const [optDabWp, setOptDabWp] = useState(false);
    const [optDabWl, setOptDabWl] = useState(true);
    /*
    *  alg 01 return
    * */
    const [transMat, setTransMat] = useState<number[] | null>(null);
    // avg_dist_remove30mm
    const [avgDist, setAvgDist] = useState<number | null |string>('尚未获取数据');
    // obs_point_cloud_cover_rate
    const [pointCloudCoverRate, setPointCloudCoverRate] = useState<number | null | string>('尚未获取数据');


    const [workPiece, setWorkPiece] = useState<string | null>(null);
    const [workLines, setWorkLines] = useState<string[]|string|null>(null);
    /*
    *  camera return
    * */
    const [pointCloud, setPointCloud] = useState(false)
    const [totalPCRate, setTotalPCRate] =useState<number | null |string>('尚未获取数据');


    /*
    *   侧边栏展示图片
    * */
    const [open, setOpen] = useState(false)

    /*
    *   define optionsLines
    * */
    const [optionsLines, setOptionsLines] = useState<SelectProps['options']>([])

    /*
    *   当前步骤编号 current
    *
    * */
    const [current, setCurrent] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();

    const openNotification = () => {
      const placement = 'topLeft'
      const btn = (
      <Space>
        <Button type="primary" size="small" onClick={()=> {
            setCurrent(current)
            notification.destroy()
        }}>
          上一步
        </Button>
      </Space>
    );
      notification.error({
        message: '优复博智能焊接系统',
        description:
          '本次操作失败,请检查原因,然后返回上一步重试.',
        placement,
        btn,
        onClick: () => {
          console.log('操作异常!');
        },
      });
    };
    // const openMessage = () => {
    // messageApi.open({
    //   key: 'load',
    //   type: 'loading',
    //   content: 'Loading...',
    // });
    // setTimeout(() => {
    //   messageApi.open({
    //     key:,
    //     type: 'success',
    //     content: 'Loaded!',
    //     duration: 2,
    //   });
    // }, 1000);
    // };
    message.config(
            {
                top: 500
            }
            );

    /*
    *   Next逻辑
    *   $按步骤调用 $请求函数$
    *   current: 0 select
    * */
    const next = () => {

        messageApi.open(
            {
                key: 'load',
                type: 'loading',
                content: '正在执行任务，请稍后...',
                style: {
                    marginTop: '20vh',
                }
            }
        );
        setTimeout(()=>{
        if(current === 0)
        {
            // @ts-ignore
            if (RequestWorkpiece(workPiece)) {
                console.log(true)
            } else {
                console.log(false)
                openNotification()
            }
        }
        else if (current === 1) {
            setOpen(true)
            setRandom(Date.now)
            const ResponseCamera = RequestMoveFarShotAndTakePhoto(workPiece)
            const totalPointCloudRate = ResponseCamera['img_point_cloud_cover_rate']
            if (ResponseCamera) {
                console.log(true)
                console.log(totalPointCloudRate)
                setTotalPCRate(totalPointCloudRate * 100 + ' %')
            } else {
                console.log(false)
                openNotification()
            }
        } else if (current === 2) {
            const AllRequestR1 = RequestR1(workPiece)
            const curTransMat = AllRequestR1['Matrix']
            const curAvgDist = AllRequestR1['avg_dist_remove30mm']
            const curPCCR = AllRequestR1['obs_point_cloud_cover_rate']

            if (curTransMat) {
                setTransMat(curTransMat)
                setPointCloud(true)
                setAvgDist(curAvgDist + ' mm')
                setPointCloudCoverRate(curPCCR * 100 + ' %')
                setOpen(true)

            } else {
                console.log(false)
                openNotification()
            }
        } else if (current === 3) {
            if (RequestWorklines(workPiece, workLines)) {
                console.log(true)
            } else {
                console.log(false)
                openNotification()
            }
        } else if (current === 4) {
            console.log('weld-------')
            if (RequestWeld(workPiece)) {
                console.log(true)
                return
            } else {
                console.log(false)
                // openNotification()
                return
            }
        }
         messageApi.open({
        key:'load',
        type: 'success',
        content: '完成任务！',
        duration: 2,
         style: {
                marginTop: '20vh',
            }
      });
        setCurrent(current + 1);
    }, 1000);

    };
    /*
    *   prev 逻辑
    *   按步骤调撤回本步骤设置
    *
    * */
    const prev = () => {
        if (current === 1){
            setWorkPiece(null)
        }
        else if (current === 2){
            setTransMat(null)
            setPointCloud(false)


        }
        else if (current === 3){
            setWorkLines(null)
            setPointCloudCoverRate('尚未获取数据')
            setAvgDist('尚未获取数据')
        }
        setCurrent(current - 1);
    };

    // load step items
    const stepItems = steps.map((item) => (
        { key: item.title, title: item.title })
    );

    /*
    *   工件选择逻辑 Hooks
    * */
    const handleChangeWp = ( value: string ) => {

        console.log(`selected ${value}`);
        setWorkPiece(`${value}`);

        /*  Create options for * selecting the work-piece's weld lines *
        *   结构：key: num, value: linesArray
        *   reference: optArrLabel to find files name
        *   day: 5-31 修改成读取json模式
        * */
        const optionsLinesReplace: SelectProps['options'] = []

        const optionsWorklinesLoad = OptionsWorklinesLoader(`${value}`)

        let optLinesArrVal: string[] = optionsWorklinesLoad
        console.log(optLinesArrVal)
        console.log(optionsWorklinesLoad.length)
        for ( let i = 0; i < optLinesArrVal.length; i++ ){
            console.log(optLinesArrVal[i].toString())
            optionsLinesReplace.push(
                {
                    label: '焊缝' + optLinesArrVal[i].toString(),
                    value: optLinesArrVal[i]
                }
            )
        }
        setOptionsLines(optionsLinesReplace)

    }

    /*
    *   焊缝选择逻辑 Hooks
    * */
    const handleChangeWl = ( value: string[] ) => {
        console.log(`selected ${value}`);
        setWorkLines(`${value}`);
    }


    /*
    *   设置下拉选择窗口可选性
    * */
    useEffect(()=>{
        if (current === 0) {
            setOptDabWp(false)
        }else {
            setOptDabWp(true)
        }
        if (current === 3) {
            setOptDabWl(false)
        }else {
            setOptDabWl(true)
        }
    },[current])
    /*
    *   设置侧边栏打开关闭
    * */
    const [random, setRandom] = useState<number>()
    const onOpen = () => {
        setOpen(true)
        setRandom(Date.now)
    }
    const onClose = () => {
        setOpen(false)
    }
    // return component "Weld"
    return (

        <Layout>
            {contextHolder}
            <Drawer destroyOnClose={true} width={700} title="相机拍摄图" placement="right" onClose={onClose} open={open}>
                <Image
                    width={640}
                    height={512}
                    src={`/src/assets/current/rgb_far_vis.png?${random}`}
                >
                </Image>
                <Row gutter={16}>
                    <Col span={8}>
                      <Card title="整图点云覆盖率" bordered={false}>
                        <p>{totalPCRate}</p>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="目标区域平均距离" bordered={false}>
                        <p>{avgDist}</p>
                      </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="目标区域点云覆盖率" bordered={false}>
                            <p>{pointCloudCoverRate}</p>
                        </Card>
                    </Col>
                </Row>
            </Drawer>
            <Sider
                style={{
                    padding: '12px',
                    height: '100%',
                    width: '200px',
                  background: colorBgContainer
                }}
            >
                <Select
                    allowClear
                    disabled={optDabWp}
                    style={{width: '100%'}}
                    placeholder="请选择工件"
                    onChange={handleChangeWp}
                    options={options}
                />
                <Select
                    mode={'multiple'}
                    allowClear
                    disabled={optDabWl}
                    style={{margin:'20px 0 0 0',width: '100%'}}
                    placeholder="请选择焊缝"
                    onChange={handleChangeWl}
                    options={optionsLines}
                />
                <div>
                    {
                        current === 0 && (
                            <Button
                                disabled
                                style={{margin: '20px 0 0 0', width: '40%'}}
                                onClick={() => prev()}
                            >上一步</Button>)
                    }
                    {
                        current > 0 && (
                            <Button
                                style={{margin: '10px 0 0 0', width: '40%'}}
                                onClick={() => prev()}
                            >上一步</Button>)
                    }
                    {/*{*/}
                    {/*    current < stepItems.length - 1 && (<Button*/}
                    {/*        type="primary"*/}
                    {/*        style={{margin: '20px 0 0 34px', width: '40%'}}*/}
                    {/*        onClick={() => next()}*/}
                    {/*    >下一步</Button>)*/}
                    {/*}*/}
                    {
                        current === stepItems.length - 5 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >确认</Button>)
                    }
                   {
                        current === stepItems.length - 4 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >拍照</Button>)
                    }
                   {
                        current === stepItems.length - 3 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >识别</Button>)
                    }
                   {
                        current === stepItems.length - 2 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >确认</Button>)
                    }
                    {
                        current === stepItems.length - 1 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >执行</Button>)
                    }
                </div>
                <div>
                    <Button
                        style={{margin: '20px 0 0 0', width: '80%'}}
                        onClick={onOpen}
                    >查看相机拍摄结果</Button>
                </div>
                <div>
                    <Button
                        style={{margin: '20px 0 0 0', width: '70%'}}
                    >选择已有任务</Button>
                </div>
                <div>
                    <Button
                        style={{margin: '20px 0 0 0', width: '70%'}}
                    >保存当前任务</Button>
                </div>
            </Sider>
            <Layout style={{ padding: 0 }}>
                <Steps current={current} items={stepItems} style={{ padding: '24px', background: '#eee'}}/>
                <Content
                    style={{
                      padding: '0px 24px 24px',
                      margin: 0,
                      height: '100%',
                      width: '100%',
                      background: '#eee',
                    }}
                >
                    <WeldApp WorkpieceName={workPiece} WorkLines={workLines} TransformMatrix={transMat} PointCloud={pointCloud}/>
                </Content>
            </Layout>
        </Layout>

    )
}

export default Weld;
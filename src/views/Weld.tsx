import {Select, Space, Breadcrumb, Layout, Menu, MenuProps, theme, Button, message, Steps, SelectProps, notification} from "antd";
import { Canvas } from "@react-three/fiber"
import React, {useState, Suspense, useEffect} from "react";
import {LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import WeldApp from "@/threeComponents/WeldComp";
import {values} from "./object";
import {RequestWorkpiece, RequestCamera, RequestWorklines, RequestWeld} from "@/threeComponents/WeldComp/request.ts";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import PointCloudScene from "@/threeComponents/WeldComp/pointCloud.ts";

const { Content, Sider } = Layout;

/*  Create options for *selecting the work-piece*
*
* */
const options: SelectProps['options'] = [];
const optArrLabel: string[] = ['法奥H型工件', 'TEST1','TEST2','其他工件']
const optArrVal: string[] = ['HFair.stl','TEST1.stl','TEST2.stl' ,'OtherWorkpiece.stl']
for ( let i = 0; i < optArrLabel.length; i++ ){
    options.push(
        {
            label: optArrLabel[i],
            value: optArrVal[i]
        }
    )
}

/*  Create options for *selecting the work-piece's weld lines*
*
* */
const optionsLines: SelectProps['options'] = [];
const optLinesArrLabel: string[] = ['焊缝1', '焊缝2','焊缝3', '焊缝4', '焊缝5', '焊缝6']
const optLinesArrVal: string[] = ['1', '2', '3', '4','5','6']
for ( let i = 0; i < optLinesArrLabel.length; i++ ){
    optionsLines.push(
        {
            label: optLinesArrLabel[i],
            value: optLinesArrVal[i]
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
    title: '焊缝识别',
    content: '2',
  },
  {
    title: '焊缝选择',
    content: '3',
  },
  {
      title: '执行',
    content: '4',
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
    const [transMat, setTransMat] = useState<number[] | null>(null);
    const [workPiece, setWorkPiece] = useState<string | null>(null);
    const [workLines, setWorkLines] = useState<string[]|string|null>(null);
    const [pointCloud, setPointCloud] = useState(false)
    /*
    *   当前步骤编号 current
    *
    * */
    const [current, setCurrent] = useState(0);

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

    /*
    *   Next逻辑
    *   $按步骤调用 $请求函数$
    *   current: 0 select
    * */
    const next = () => {
        if (current === 0){
            // @ts-ignore
            if(RequestWorkpiece(workPiece)){ console.log(true) }
            else {
                console.log(false)
                openNotification()
            }
        }
        else if (current === 1){
            const curTransMat = RequestCamera(workPiece)
            if(curTransMat) {
                setTransMat(curTransMat)
                setPointCloud(true)
            }
            else{
                console.log(false)
                openNotification()
            }
        }
        else if (current === 2){
            if(RequestWorklines(workPiece, workLines)){
                console.log(true)
            }
            else {
                console.log(false)
                openNotification()
            }
        }
        else if (current === 3){
            console.log('weld-------')
            if(RequestWeld(workPiece)){
                console.log(true)
                return
            }
            else {
                console.log(false)
                openNotification()
                return
            }
        }
        setCurrent(current + 1);

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
        if (current === 2) {
            setOptDabWl(false)
        }else {
            setOptDabWl(true)
        }
    },[current])


    // return component "Weld"
    return (
        <Layout>
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
                                style={{margin: '20px 0 0 0', width: '40%'}}
                                onClick={() => prev()}
                            >上一步</Button>)
                    }
                    {
                        current < stepItems.length - 1 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >下一步</Button>)
                    }
                    {
                        current === stepItems.length - 1 && (<Button
                            type="primary"
                            style={{margin: '20px 0 0 34px', width: '40%'}}
                            onClick={() => next()}
                        >执行</Button>)
                    }
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
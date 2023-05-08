import React from "react";
import {useDispatch, useSelector} from "react-redux";

const pageHardInfo: React.FC = () => {
    const {num} = useSelector(
        (state:RootState)=>
        (
            {
                num:state.handleNum.num
            }
        )
    )
    const {sarr} = useSelector(
    (state:RootState)=>
    (
        {
            sarr:state.handleArr.sarr
        }
    )
    )

    // 修改仓库属性
    const dispatch = useDispatch();
    const changeNum = () => {
        dispatch({type:"add1",val:1})
    }
    const changeArr = ()=> {
        dispatch({type:"sarrpush", val:1})
    }

    return (
        <div>
            Robot Info
            <p> {num} </p>
            <p> {sarr} </p>
            <button onClick={changeNum}>add</button>
            <button onClick={changeArr}>arr</button>

        </div>
    )
}

export default pageHardInfo;
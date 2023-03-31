import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { TextPointModel } from "../../../../../models/text-point";

import axios from "axios";

export function TextPoint({point, pointIndex, taskId}: {point: TextPointModel, pointIndex: number, taskId: number}){

    const dispatch = useDispatch()
    const width = useSelector((state: any) => state.project.columns[pointIndex].width)

    const inputRef = React.useRef<any>()
    const [value, setValue] = React.useState(point.text)

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const onKeyDownHandler = (e: any) => {
        if(e.key === 'Enter') inputRef.current.blur()
    }

    const onBlurHandler = () => {
        dispatch({type: 'change-text-point', pointIndex, taskId, text: value})
        const promise = axios({
            method: 'patch',
            url: `${process.env["REACT_APP_SERVER_IP"]}/textPoints/update`,
            data: point
        })
        promise.then(() => {}).catch((e) => console.log(e))
    }

    return(
        <>
            <div className={`'h-[40px] flex flex-row flex-shrink-0 items-center box-border pl-2 border-2 border-l-0 border-r-0 bg-white`}
                 style={{width: `${width}px`}}>
                <div className={'w-[80%] h-[32px] box-border p-[5px]'}>
                    <input className={'text-[14px] w-full outline-none h-[24px]'} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                           ref={inputRef} onBlur={onBlurHandler}/>
                </div>
            </div>
            <div className={'h-[40px] w-[5px] bg-[#e5e7eb] flex-shrink-0'} />
        </>
    )
}
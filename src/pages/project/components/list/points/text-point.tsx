import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { TextPointModel } from "../../../../../models/text-point";

import axios from "axios";
import {Task} from "../../../../../models/task";

export function TextPoint({point, pointIndex, task}: {point: TextPointModel, pointIndex: number, task: Task}){

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
        dispatch({type: 'change-text-point', pointIndex, taskId: task.ID, text: value})
        const promise = axios({
            method: 'patch',
            url: `${process.env["REACT_APP_SERVER_IP"]}/textPoints/update`,
            data: point
        })
        promise.then(() => {}).catch((e) => console.log(e))
    }

    const DoneCircle = () => {

        const changeDone = () => {
            dispatch({type: "change-task", task: {...task, done: !task.done}})
        }

        if(pointIndex === 0){
            return(
                <div className={`w-[24px] h-[24px] border-[2px] rounded-full mr-2 cursor-pointer flex items-center justify-center 
                                ${task.done ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-b-blue-100'}`}
                     onClick={changeDone}>
                    <img src={` ${task.done ? '/images/daw-white.png' : '/images/daw-black.png'}`} alt={'daw'}/>
                </div>
            )
        }
        return <></>
    }

    return(
        <>
            <div className={`'h-[40px] flex flex-row flex-shrink-0 items-center box-border pl-2 bg-white`}
                 style={{width: `${width}px`}}>
                <DoneCircle/>
                <div className={'w-[80%] h-[32px] box-border p-[5px] flex items-center'}>
                    <input className={'text-[14px] w-full outline-none h-[24px]'} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                           ref={inputRef} onBlur={onBlurHandler}/>
                </div>
            </div>
            <div className={'h-[40px] w-[5px] bg-[#e5e7eb] flex-shrink-0'} />
        </>
    )
}
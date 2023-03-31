import * as React from 'react'

import { useSelector } from "react-redux";

import { TaskModel } from "../../../../models/task";
import { ColumnModel } from "../../../../models/column";

import { TextPoint } from "./points/text-point";

export function Task({task}: {task: TaskModel}){

    const columns: Array<ColumnModel> = useSelector((state: any) => state.project.columns)

    function Point({point, pointIndex}: {point: any, pointIndex: number}){
        switch(columns[pointIndex].type){
            case "text-point":
                return (<TextPoint point={point} pointIndex={pointIndex} taskId={task.task.ID}/>)
            default:
                return (<div></div>)
        }
    }

    return(
        <div className={'flex flex-row'}>
            {task.points.map((point, index) => (
                <Point point={point} pointIndex={index} key={point.ID}/>
            ))}
            <div className={'h-[40px] w-full flex flex-row items-center justify-center border-2 border-l-0 border-r-0 select-none'}/>
        </div>
    )
}

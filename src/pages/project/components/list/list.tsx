import * as React from 'react'
import {useSelector} from "react-redux";

export function List(){

    const columns = useSelector((state: any) => state.project.columns)
    const tasks = useSelector((state: any) => state.project.tasks)

    return(
        <div className={'mt-4'}>
            123
        </div>
    )
}
import * as React from 'react'
import {useSelector} from "react-redux";

export function ProjectHeader(){

    const project_info = useSelector((state: any) => state.project.project_info);

    return(
        <div className={'flex flex-row items-center'}>
            <div className={'w-[52px] h-[52px] box-border p-[5px] rounded-md max-[650px]:hidden mr-4'} style={{backgroundColor: project_info.color}}>
                <img className={'w-[42px] h-[42px]'} src={`${process.env["REACT_APP_SERVER_IP"]+ project_info.icon_src}`} alt={'icon'}/>
            </div>
            <p className={'font-bold text-[18px] break-words w-[500px]'}>{project_info.name}</p>
        </div>
    )
}
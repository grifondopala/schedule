import * as React from 'react'

import { AddTaskBtn } from "./add-task-btn";

export function ProjectNavbar({selected, setSelected}: {selected: string, setSelected: React.Dispatch<React.SetStateAction<string>>}){

    const ProjectNavbarButton = ({text}: {text: string}) => {
        return(
            <button className={`w-[50px] ${text === selected ? 'border-b-[3px] border-b-gray-700' : ''}`}
                    onClick={() => setSelected(text)}>
                <p className={`text-[16px] ${text === selected ? 'font-bold' : 'text-gray-500 font-bold'}`}>{text}</p>
            </button>
        )
    }

    return(
        <div>
            <div className={'w-full h-[50px] flex flex-row items-center gap-[30px] border-b-gray-300 border-b-[2px]'}>
                <ProjectNavbarButton text={'List'} />
                <ProjectNavbarButton text={'Table'} />
                <ProjectNavbarButton text={'Chat'} />
                <ProjectNavbarButton text={'Files'} />
            </div>
            <div className={'w-full h-[50px] flex flex-row items-center gap-[30px]'}>
                <AddTaskBtn />
            </div>
        </div>
    )
}
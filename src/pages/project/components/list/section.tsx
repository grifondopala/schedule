import * as React from 'react'
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";

import { SectionModel } from "../../../../models/section";
import { TaskModel } from "../../../../models/task";

import { Task } from "./task";
import { SectionInput } from "./section-input";


export function Section({section, index}: {section: SectionModel, index: number}){

    const dispatch = useDispatch()
    const tasks: Array<TaskModel> = useSelector((state: any) => state.project.tasks.filter((task: TaskModel) => task.task.section_id === section.ID))

    const [isOpen, setIsOpen] = React.useState(true)

    const addNewTask = () => {
        const promise = axios({
            method: 'post',
            url: `${process.env["REACT_APP_SERVER_IP"]}/tasks/createEmpty`,
            data: {section_id: section.ID, project_id: section.project_id}
        })
        promise.then((res) => {
            const newTask: TaskModel = {task: res.data.task, points: res.data.points};
            dispatch({type: "add-task", task: newTask});
        });
    }

    return(
        <>
            <div className={'flex flex-row items-center mt-4 select-none'}>
                <div className={`flex flex-row justify-center items-center w-[24px] h-[24px] hover:bg-gray-100 cursor-pointer rounded-md`}
                     onClick={() => setIsOpen((state) => !state)}>
                    <img className={`w-[16px] h-[16px] transition-all duration-500 select-none ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                         src={`/images/arrow-down.png`} alt={'arrow'}/>
                </div>
                <SectionInput section={section} index={index}/>
                <div className={`flex flex-row justify-center items-center w-[24px] h-[24px] hover:bg-gray-100 cursor-pointer ml-1 rounded-md`}>
                    <img className={`w-[16px] h-[16px] select-none`}
                         src={`/images/plus.png`} alt={'plus'} onClick={addNewTask}/>
                </div>
            </div>
            <div className={`flex flex-col mt-2 transition-all duration-300 select-none 
                            ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-1/3 opacity-0 pointer-events-none hidden'}`}>
                {tasks.map((task) => (
                    <Task task={task} key={task.task.ID}/>
                ))}
            </div>
        </>
    )
}
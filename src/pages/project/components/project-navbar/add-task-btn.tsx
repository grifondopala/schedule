import * as React from 'react'
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";

export function AddTaskBtn(){

    const [isDropShown, setIsDropShown] = React.useState(false)

    const dispatch = useDispatch()
    const project_info = useSelector((state: any) => state.project.project_info)
    const section_id = useSelector((state: any) => state.project.sections.length)

    const AddSection = () => {
        let promise = axios({
            method: "post",
            url: `${process.env["REACT_APP_SERVER_IP"]}/sections/create`,
            data: {name: "Untitled", order_number: section_id, project_id: project_info.id},
        })
        promise.then((res) => {
            dispatch({type: "add-section", section: res.data.section})
        })
    }

    return(
        <>
            <div className={'w-[150px] h-[35px] flex flex-row items-center select-none'}>
                <div className={'w-full h-full flex flex-row items-center box-border p-[5px] border-2 rounded-l-md cursor-pointer hover:bg-gray-100'}>
                    <img className={'w-[16px] h-[16px]'} src={'/images/plus.png'} alt={'plus'}/>
                    <p className={'ml-2'}>Add task</p>
                </div>
                <div className={'w-[32px] h-full border-2 border-l-0 rounded-r-md flex flex-row items-center justify-center cursor-pointer hover:bg-gray-100'}
                     onClick={() => setIsDropShown((state) => !state)}>
                    <img className={'w-[16px] h-[16px]'} src={'/images/arrow-down.png'} alt={'another'}/>
                </div>
            </div>
            <div className={`absolute ml-[120px] cursor-pointer bg-white mt-[75px] border-2 rounded-md w-[150px] h-[35px] flex flex-row items-center 
                             justify-center select-none ${isDropShown ? 'visible' : 'hidden'}`}>
                <button onClick={AddSection}>
                    <p>Add new section</p>
                </button>
            </div>
        </>
    )
}
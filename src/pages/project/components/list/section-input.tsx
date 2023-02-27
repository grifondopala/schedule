import * as React from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";

import { SectionModel } from "../../../../models/section";

export function SectionInput({section, index}: {section: SectionModel, index: number}){

    const dispatch = useDispatch()

    const [isInputFocus, setIsInputFocus] = React.useState(false)
    const sectionInput = React.useRef<any>()

    const inputChangeHandler = (e: any) => {
        dispatch({type: "change-section", index, data: {name: e.target.value}})
    }

    const inputKeyDownHandler = (e: any) => {
        if(e.key === 'Enter') sectionInput.current.blur()
    }

    const inputBlurHandler = (e: any) => {
        setIsInputFocus(false)
        const promise = axios({
            method: 'patch',
            url: `${process.env["REACT_APP_SERVER_IP"]}/sections/update`,
            data: section
        })
        promise.then(() => {}).catch((e) => console.log(e))
    }

    return(
        <div className={`h-[38px] ml-2 flex flex-row items-center justify-center rounded-md w-[200px]
                                ${isInputFocus ? 'border-2 border-gray-700' : ''}`}>
            <input className={'h-[32px] w-[180px] outline-none font-bold'} value={section.name} onChange={inputChangeHandler}
                   onKeyDown={inputKeyDownHandler} ref={sectionInput} onFocus={() => setIsInputFocus( true)} onBlur={inputBlurHandler}/>
        </div>
    )
}
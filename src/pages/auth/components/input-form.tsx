import * as React from "react";

import { useInput } from "../hooks/use-input";
import { useContext } from "react";
import { DispatchContext } from "../auth-page";

export const InputForm = ({type, label, dataKey}: {type: string, label: string, dataKey: string}) => {

    const state = useInput('', type);
    const dispatch = useContext(DispatchContext);

    const clearInput = () => state.clearValue();

    React.useEffect(() => {
        dispatch({dataKey, value: state.inputProps.value})
    }, [state.inputProps.value])

    return(
        <div className={'flex flex-col mt-2'}>
            <label className={'mb-1'}>{label}</label>
            <div className={'h-[38px] border-2 rounded-md flex items-center w-[100%]'}>
                <input {...state.inputProps} className={'focus:outline-0 ml-2 w-[100%]'}/>
                <button className={`w-[24px] mr-2 ${state.inputProps.value === '' ? 'hidden' : 'visible'}`} onClick={clearInput}>
                    <img src={'/images/closeIcon.png'} alt={'close'}/>
                </button>
            </div>
        </div>
    )
}
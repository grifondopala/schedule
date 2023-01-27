import * as React from "react";

interface InputFormProps{
    label: string,
    dataKey: string,
    value: string,
    dispatch: React.Dispatch<any>,
    type: string,
}

export const InputForm = (props: InputFormProps) => {

    const clearInput = () =>  props.dispatch({dataKey: props.dataKey, value: ''});
    const onChangeHandler = (value: string) => props.dispatch({dataKey: props.dataKey, value})

    return(
        <div className={'flex flex-col mt-2'}>
            <label className={'mb-1'}>{props.label}</label>
            <div className={'h-[38px] border-2 rounded-md flex items-center w-[100%]'}>
                <input type={props.type} className={'focus:outline-0 ml-2 w-[100%]'} value={props.value}
                       onChange={(e) => onChangeHandler(e.target.value)}/>
                <button className={`w-[24px] mr-2 ${props.value === '' ? 'hidden' : 'visible'}`} onClick={clearInput}>
                    <img src={'/images/closeIcon.png'} alt={'close'}/>
                </button>
            </div>
        </div>
    )
}
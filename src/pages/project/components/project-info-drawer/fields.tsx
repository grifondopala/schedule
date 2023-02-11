import * as React from 'react'
import {useDispatch} from "react-redux";

interface FieldProps{
    property: string,
    value: string,
    label: string
}

export function InputField({property, value, label}: FieldProps){

    const dispatch = useDispatch()

    const onChangeHandler = (e: any) => {
        dispatch({type: "change-project-info", property, value: e.target.value})
    }

    return(
        <div className={'mt-4 w-full'}>
            <p className={'mb-1 font-bold text-gray-900 text-[18px]'}>{label}</p>
            <div className={'w-full h-[42px] box-border bg-white p-[5px] rounded-md'}>
                <input value={value} className={'w-full h-[32px] rounded-md outline-none'}
                       onChange={onChangeHandler}/>
            </div>
        </div>
    )
}


export function TextareaField({property, value, label}: FieldProps){

    const dispatch = useDispatch()

    const onChangeHandler = (e: any) => {
        dispatch({type: "change-project-info", property, value: e.target.value})
    }

    return(
        <div className={'mt-4 w-full'}>
            <p className={'mb-1 font-bold text-gray-900 text-[18px]'}>{label}</p>
            <div className={'w-full h-[106px] box-border bg-white p-[5px] rounded-md'}>
                <textarea value={value} className={'w-full h-[96px] rounded-md resize-none outline-none'}
                          onChange={onChangeHandler}/>
            </div>
        </div>
    )
}
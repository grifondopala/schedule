import * as React from "react";
import Select from "react-select";

import {useDispatch} from "react-redux";

export function ColorSelector({value, name}: {value: string, name: string}){
    return(
        <div className={'flex flex-row items-center'}>
            <p className={'w-full'}>{name}</p>
            <div className={`w-[16px] h-[16px] rounded-full`} style={{backgroundColor: value}}></div>
        </div>
    );
}

export function IconSelector({value}: {value: string}){
    return(
        <div>
            <img alt={'icon'} className={'w-[32px] h-[32px]'} src={`${process.env["REACT_APP_SERVER_IP"]}${value}`}/>
        </div>
    );
}

interface SelectorProps{
    label: string,
    property: string,
    selectorProps: {
        options: any,
        defaultValue: any,
        formatOptionLabel: any,
        ref: any,
    }
}

export function SelectorTemp(props: SelectorProps){

    const dispatch = useDispatch()

    const onChangeHandler = (target: any) => {
        dispatch({type: 'change-project-info', property: props.property, value: target!.value})
    }

    return(
        <div className={'mt-4 w-full flex flex-row items-center'}>
            <p className={'mb-1 w-[70px] font-bold text-gray-900 text-[18px]'}>{props.label}</p>
            <Select className={'ml-4 w-full'} onChange={onChangeHandler} {...props.selectorProps}/>
        </div>
    )

}
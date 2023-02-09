import * as React from "react";

export function ColorSelector({value, name}: {value: string, name: string}){
    return(
        <div className={'flex flex-row items-center'}>
            <p className={'w-full'}>{name}</p>
            <div className={`${value} w-[16px] h-[16px] rounded-full`}></div>
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
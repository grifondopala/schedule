import * as React from 'react'

interface ErrorFieldProps{
    error: string
}

export function ErrorField(props: ErrorFieldProps){
    if(props.error !== ''){
        return(
            <div className={'w-full h-[38px] mt-2 bg-[#fdf6f6] flex items-center border-2 border-[#de7575] rounded-md'}>
                <p className={'text-[#de0a0a] ml-2'}>{props.error}</p>
            </div>
        )
    }
    return(<></>)
}
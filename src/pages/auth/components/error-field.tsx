import * as React from 'react'

export const ErrorField = ({error}: {error: string}) => {

    if(error === '') return null;

    return(
        <div className={'w-full h-[38px] mt-2 bg-[#fdf6f6] flex items-center border-2 border-[#de7575] rounded-md'}>
            <p className={'text-[#de0a0a] ml-2'}>{error}</p>
        </div>
    )

}
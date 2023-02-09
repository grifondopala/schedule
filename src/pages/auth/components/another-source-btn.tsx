import * as React from 'react'

export const AnotherSourceBtn = ({imageSrc, alt, color}: {imageSrc: string, alt: string, color: string}) => {
    return(
        <button className={`w-[48px] h-[48px] rounded-md cursor-pointer`} style={{backgroundColor: color}}>
            <div className={'items-center flex justify-center'}>
                <img className={'w-[24px] h-[24px]'} src={imageSrc} alt={alt} />
            </div>
        </button>
    )
}
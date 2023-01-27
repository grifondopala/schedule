import * as React from 'react'

interface AnotherSourceProps{
    imageSrc: string,
    alt: string,
    color: string,
}

export const AnotherSourceBtn = (props: AnotherSourceProps) => {
    return(
            <button className={`w-[48px] h-[48px] rounded-md cursor-pointer`} style={{backgroundColor: props.color}}>
                <div className={'items-center flex justify-center'}>
                    <img className={'w-[24px] h-[24px]'} src={props.imageSrc} alt={props.alt} />
                </div>
            </button>
        )
}
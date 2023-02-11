import * as React from 'react'

export function ProjectSavedBadge({isShown}: {isShown: boolean}){
    return(
        <div className={`bg-white w-[120px] h-[30px] m-auto flex flex-row items-center justify-center rounded-md
                        ${isShown ? 'transition-opacity duration-700 opacity-100' : 'transition-opacity duration-700 opacity-0'}`}>
            <p className={'font-bold'}>Project saved</p>
        </div>
    )
}
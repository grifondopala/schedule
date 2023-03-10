import * as React from 'react'

import { useNavigate } from "react-router-dom";

interface ProjectCardProps{
    id: number,
    name: string,
    description: string,
    color: string;
    icon_src: string,
}

export function ProjectCard({id, name, description, color, icon_src}: ProjectCardProps){

    const [isHover, setIsHover] = React.useState(false);
    const redirect = useNavigate();

    const shorterString = (value: string, maxLength: number): string => {
        if(value.length < maxLength) return value;
        return value.substring(0, maxLength) + '...';
    }

    return(
        <div className={`h-[350px] w-[250px] rounded-md box-border p-[16px] cursor-pointer ml-auto mr-auto
                        ${isHover ? 'transition-all delay-100 scale-[103%] ease-out' : 'transition-all delay-100 ease-out scale-100'}`}
             onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
             onClick={() => redirect(`/projects/${id}`)}
             style={{backgroundColor: color}}>
            <div className={'w-full h-full items-center flex flex-col'}>
                <div className={'h-[100px] flex items-center'}>
                    <img className={'w-[64px] h-[64px] w-full'} src={process.env.REACT_APP_SERVER_IP + icon_src} alt={'icon'}/>
                </div>
                <div className={'w-full h-[100px]'}>
                    <p className={'text-[24px] text-gray-900 font-bold text-center break-words'}>{name}</p>
                </div>
                <div className={'w-full h-[100px] mt-2'}>
                    <p className={'text-[18px] text-gray-900 text-center break-words'}>{shorterString(description, 50)}</p>
                </div>
            </div>
        </div>
    )
}
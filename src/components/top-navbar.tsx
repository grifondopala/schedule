import * as React from 'react'
import { DropDownMenu } from "./drop-down-menu";
import { Link } from "react-router-dom";

export function TopNavbar(){

    const NavLink = ({href, text}: {href: string, text:string}) => {
        return(
            <Link to={href} className={'ml-4 max-[600px]:hidden'}>
                <p className={'font-bold'}>{text}</p>
            </Link>
        )
    }

    return(
        <div className={'fixed left-0 top-0 h-[60px] flex items-center w-full z-50 bg-white border-b-2'}>
            <div className={'w-[calc(100%-200px)] flex flex-row items-center gap-[25px]'}>
                <NavLink href={'/home'} text={'Home'}/>
                <NavLink href={'/my-projects'} text={'My Projects'}/>
                <NavLink href={'/calendar'} text={'Calendar'}/>
                <div className={'w-[36px] h-[36px] border-2 rounded-md min-[600px]:hidden ml-4 cursor-pointer'}>
                    <img src={'/images/menu.png'} alt={'leftover'}/>
                </div>
            </div>
            <DropDownMenu/>
        </div>
    )
}
import * as React from 'react'
import { DropDownMenu } from "./drop-down-menu";
import {Link} from "react-router-dom";

interface NavLinkProps{
    href: string;
    text: string;
}

export function TopNavbar(){

    const NavLink = (props: NavLinkProps) => {
        return(
            <Link to={props.href} className={'ml-4 max-[600px]:hidden'}>
                <p>{props.text}</p>
            </Link>
        )
    }

    return(
        <div className={'sticky h-[60px] flex items-center w-full'}>
            <div className={'w-[calc(100%-200px)] flex flex-row items-center'}>
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
import * as React from 'react'

import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function DropDownMenu(){

    const [isShown, setIsShown] = React.useState(false);
    const redirect = useNavigate();

    const user = useSelector((state : any) => state.user);

    const dropDownHandler = () => {
        setIsShown((state) => !state);
    }

    const exit = () => {
        localStorage.removeItem('token');
        redirect('/auth');
    }

    const toMyProfile = () => {
        redirect('/my-profile')
    }

    return(
        <div className={'flex flex-col mr-4'}>
            <div className={'flex items-center h-[40px] box-border p-[10px] border-2 rounded-md cursor-pointer w-[200px] bg-white'} onClick={dropDownHandler}>
                <p className={'w-[100%]'}>{user.first_name} {user.last_name}</p>
                <img src={'/images/arrow-down.png'} className={'w-[16px] h-[16px] ml-2'} alt={'arrow'}/>
            </div>
            <div className={'absolute mt-[50px] w-[200px] transform ease-in-out' +
                (isShown
                    ? " transition-opacity opacity-100 duration-500 translate-y-0 cursor-pointer"
                    : " transition-all delay-500 opacity-0 -translate-y-3 pointer-events-none")}>
                <div className={'h-[40px] box-border p-[10px] border-2 rounded-t-md flex flex-row items-center bg-white'} onClick={toMyProfile}>
                    <p className={'w-[100%]'}>My profile</p>
                    <img src={'/images/user.png'} className={'w-[16px] h-[16px] ml-2'} alt={'user'}/>
                </div>
                <div className={'h-[40px] box-border p-[10px] border-2 border-t-0 rounded-b-md flex flex-row items-center bg-white'}>
                    <p className={'w-[100%]'} onClick={exit}>Exit</p>
                    <img src={'/images/logout.png'} className={'w-[16px] h-[16px] ml-2'} alt={'exit'}/>
                </div>
            </div>
        </div>
    )
}
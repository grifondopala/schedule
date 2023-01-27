import * as React from 'react'

import {AnotherSourceBtn} from "./elements/another-source-btn";
import {SignIn} from "./sign-in";
import {SignUp} from "./sign-up";


export function AuthPage(){

    const [isSignIn, setIsSignIn] = React.useState(true);

    const changeSignIn = () => setIsSignIn(state => !state);

    return(
        <div className={'flex items-center justify-center flex-col h-screen'}>
            <div className={'flex flex-row gap-[150px] items-center'}>
                <img className={'w-[400px] rounded-full border-2 max-[1150px]:hidden'} src={'/images/auth.jpg'} alt={'auth'}/>
                {isSignIn ? (<SignIn setIsSignIn={changeSignIn}/>) : (<SignUp setIsSignIn={changeSignIn}/>)}
            </div>
            <div className={'flex flex-row gap-[150px] items-center items-center'}>
                <div className={'w-[400px] max-[1150px]:hidden'}>
                    <p className={'text-[18px] hover:underline cursor-pointer w-[400px] h-[24px] text-center h-full'} onClick={() => setIsSignIn((state) => !state)}>
                        {isSignIn ? 'Create an account' : 'I have already an account'}
                    </p>
                </div>
                <div className={'w-[320px] flex flex-row gap-[15px] items-center'}>
                    <p className={'h-[24px]'}>{isSignIn ? 'Or sign in with:' : 'Or sign up with:'}</p>
                    <AnotherSourceBtn imageSrc={'/images/icons8-google-24.png'} alt={'google'} color={'#ea202e'}/>
                    <AnotherSourceBtn imageSrc={'/images/icons8-facebook-f-24.png'} alt={'facebook'} color={'#396097'}/>
                    <AnotherSourceBtn imageSrc={'/images/icons8-twitter-24.png'} alt={'twitter'} color={'#1ea2e2'}/>
                </div>
            </div>
        </div>
    )
}
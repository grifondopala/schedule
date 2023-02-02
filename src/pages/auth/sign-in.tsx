import * as React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

import {InputForm} from "./elements/input-form"
import {ContinueAuthBtn} from "./elements/continue-auth-btn"
import {ErrorField} from "./elements/error-field";

const dataReducer = (state: any, action: any) => {
    return {...state, [action.dataKey]: action.value};
}

interface SignInProps{
    setIsSignIn: () => void,
}

export const SignIn = (props: SignInProps) => {

    const [data, dispatch] = React.useReducer(dataReducer, {username: '',  password: ''});
    const [error, setError] = React.useState('');

    const redirect = useNavigate();

    const sendData = (isActive: boolean) => {
        if(!isActive) return;

        const promise = axios({
            method: 'post',
            url: `${process.env["REACT_APP_SERVER_IP"]}/login`,
            data: data,
        })

        promise.then((res) => {
            localStorage.setItem('token', res.data.token);
            redirect('/my-projects');
        }).catch((e) => {
            setError(e.response.data.error);
        })
    }

    return(
        <div className={'w-[320px] h-[600px] bg-white flex flex-col justify-start'}>
            <p className={'font-bold text-[24px]'}>Sign In</p>
            <ErrorField error={error}/>
            <div className={'mt-4'}>
                <InputForm label={'Username'} value={data['username']} dispatch={dispatch} dataKey={'username'} type={'text'}/>
                <InputForm label={'Password'} value={data['password']} dispatch={dispatch} dataKey={'password'} type={'password'}/>
            </div>
            <div className={'flex flex-row items-center justify-start gap-2 mt-4'}>
                <input className={'w-[18px] h-[18px] cursor-pointer'} type={'checkbox'}/>
                <label>Remember me</label>
            </div>
            <div className={'flex items-center mt-4'}>
                <ContinueAuthBtn text={'Log In'} data={data} onClickHandler={sendData}/>
                <p className={'ml-4 min-[1150px]:hidden cursor-pointer hover:underline'} onClick={props.setIsSignIn}>Don't have an account?</p>
            </div>
        </div>
    )
}
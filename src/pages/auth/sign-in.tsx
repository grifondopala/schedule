import * as React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { InputForm } from "./components/input-form"
import { ContinueAuthBtn } from "./components/continue-auth-btn"
import { ErrorField } from "./components/error-field";
import { DispatchContext } from "./auth-page";

const dataReducer = (state: any, action: any) => {
    return {...state, [action.dataKey]: action.value};
}

export const SignIn = ({setIsSignIn}:{setIsSignIn: () => void}) => {

    const [data, dispatch] = React.useReducer(dataReducer, {username: '',  password: ''});
    const [error, setError] = React.useState('');

    const redirect = useNavigate();

    const sendData = () => {
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
                <DispatchContext.Provider value={dispatch}>
                    <InputForm type={'text'} label={'Username'} dataKey={'username'}/>
                    <InputForm type={'password'} label={'Password'} dataKey={'password'}/>
                </DispatchContext.Provider>
            </div>
            <div className={'flex flex-row items-center justify-start gap-2 mt-4'}>
                <input className={'w-[18px] h-[18px] cursor-pointer'} type={'checkbox'}/>
                <label>Remember me</label>
            </div>
            <div className={'flex items-center mt-4'}>
                <ContinueAuthBtn text={'Log In'} data={data} onClickHandler={sendData}/>
                <p className={'ml-4 min-[1150px]:hidden cursor-pointer hover:underline'} onClick={setIsSignIn}>Don't have an account?</p>
            </div>
        </div>
    )
}
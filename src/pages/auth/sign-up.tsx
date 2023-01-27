import * as React from "react";
import axios from "axios"

import {InputForm} from "./elements/input-form";
import {ContinueAuthBtn} from "./elements/continue-auth-btn";
import {ErrorField} from "./elements/error-field";

const dataReducer = (state: any, action: any) => {
    return {...state, [action.dataKey]: action.value};
}

interface SignUpProps{
    setIsSignIn: () => void,
}

export const SignUp = (props: SignUpProps) => {

    const [data, dispatch] = React.useReducer(dataReducer, {username: '', password: '', confirmPassword: '', email: '', first_name: '', last_name: ''})
    const [error, setError] = React.useState('')

    const sendData = (isActive: boolean) => {
        if(!isActive) return;

        if(data.username.length < 5 || data.username.length > 24){
            setError('Username length must be 5-24 letters.');
            return;
        }

        if(data.password !== data.confirmPassword){
            setError('Passwords do not match');
            return;
        }

        // eslint-disable-next-line
        let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
        if (!regex.test(data.email)) {
            setError('Email is not right');
            return;
        }

        const {confirmPassword: _, ...newData} = data;
        const promise = axios({
            method: 'post',
            url: `${process.env["REACT_APP_SERVER_IP"]}/register`,
            data: newData,
        })

        promise.then(() => {
            props.setIsSignIn(); // Ask user to sign in after registration
        }).catch((e) => {
            setError(e.response.data.error);
        })

    }

    return(
        <div className={'w-[320px] h-[600px] bg-white flex flex-col'}>
            <p className={'font-bold text-[24px]'}>Sign Up</p>
            <ErrorField error={error}/>
            <div className={'mt-2'}>
                <InputForm label={'Username'} value={data['username']} dispatch={dispatch} dataKey={'username'} type={'text'}/>
                <InputForm label={'Password'} value={data['password']} dispatch={dispatch} dataKey={'password'} type={'password'}/>
                <InputForm label={'Confirm password'} value={data['confirmPassword']} dispatch={dispatch} dataKey={'confirmPassword'} type={'password'}/>
                <InputForm label={'Email'} value={data['email']} dispatch={dispatch} dataKey={'email'} type={'text'}/>
                <InputForm label={'First name'} value={data['first_name']} dispatch={dispatch} dataKey={'first_name'} type={'text'}/>
                <InputForm label={'Last name'} value={data['last_name']} dispatch={dispatch} dataKey={'last_name'} type={'text'}/>
            </div>
            <div className={'flex items-center mt-4'}>
                <ContinueAuthBtn text={'Sign Up'} data={data} onClickHandler={sendData}/>
                <p className={'ml-4 min-[1150px]:hidden cursor-pointer hover:underline'} onClick={props.setIsSignIn}>I have an account</p>
            </div>
        </div>
    )
}
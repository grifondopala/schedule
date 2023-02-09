import React from 'react';
import axios from "axios";

import {Route, Routes, useNavigate} from "react-router-dom";
import {AuthPage} from "./pages/auth/auth-page";
import {useDispatch} from "react-redux";

import {UserProjectsPage} from "./pages/user-projects/user-projects-page";
import {ProjectPage} from "./pages/project/project-page";

import './App.css';

function App() {

    const redirect = useNavigate();

    const dispatch = useDispatch()

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === null || token === ''){
            redirect('/auth');
            return;
        }

        const promise = axios({
            method: 'get',
            url: `${process.env["REACT_APP_SERVER_IP"]}/admin/user`,
            headers: {Authorization: `Bearer ${token}`}
        })

        promise.then((res) => {
            const user = {
                id: res.data.data['ID'],
                username: res.data.data['username'],
                email: res.data.data['email'],
                first_name: res.data.data['first_name'],
                last_name: res.data.data['last_name'],
            }
            dispatch({type: 'setUser', user})
        }).catch(() => {
            redirect('/auth');
            return;
        });
    }, [redirect, dispatch])

    return (
        <div className="App">
          <Routes>
            <Route path={'/auth'} element={<AuthPage/>}/>
            <Route path={'/my-projects'} element={<UserProjectsPage/>}/>
            <Route path={'/projects/:id'} element={<ProjectPage />}/>
          </Routes>
        </div>
    );
}

export default App;

import * as React from 'react'
import { TopNavbar } from "../../components/top-navbar";
import { ProjectInfoDrawer } from "./components/project-info-drawer/project-info-drawer";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";


export function ProjectPage(){

    let { id } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        if(!id) return;
        let promise = axios({
           method: "post",
           url: `${process.env["REACT_APP_SERVER_IP"]}/projects/getProjectById`,
           data: {project_id: parseInt(id)}
        })
        promise.then((res) => {
            const project_info = {
                id: res.data.projectInfo.ID,
                name: res.data.projectInfo.name,
                description: res.data.projectInfo.description,
                color: res.data.projectInfo.color,
                icon_src: res.data.projectInfo.icon_src
            };
            dispatch({type: 'set-project-info', project_info})
        })
    }, [id, dispatch])

    return(
        <div>
            <TopNavbar/>
            <ProjectInfoDrawer />
            <div>

            </div>
        </div>
    )
}
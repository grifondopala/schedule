import * as React from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ProjectHeader } from "./components/project-header/project-header";
import { ProjectNavbar } from "./components/project-navbar/project-navbar";
import { List } from "./components/list/list";
import { TopNavbar } from "../../components/top-navbar";
import { ProjectInfoDrawer } from "./components/project-info-drawer/project-info-drawer";

import axios from "axios";

export function ProjectPage(){

    let { id } = useParams();

    const dispatch = useDispatch()

    const [selectedPage, setSelectedPage] = React.useState('List')

    useEffect(() => {
        if(!id) return;
        let promise = axios({
           method: "get",
           url: `${process.env["REACT_APP_SERVER_IP"]}/projects/getProjectById/${id}`,
        })
        promise.then((res) => {
            const project_info = {
                id: res.data.projectInfo.ID,
                name: res.data.projectInfo.name,
                description: res.data.projectInfo.description,
                color: res.data.projectInfo.color,
                icon_src: res.data.projectInfo.icon_src,
                updated_at: res.data.projectInfo.UpdatedAt,
            };
            dispatch({type: 'set-project-info', project_info})
            dispatch({type: 'set-columns', columns: res.data.columns})
            dispatch({type: 'set-tasks', tasks: res.data.tasks})
            dispatch({type: 'set-sections', sections: res.data.sections})
        })
    }, [id, dispatch])

    return(
        <div className={'overflow-x-hidden'}>
            <TopNavbar/>
            <ProjectInfoDrawer />
            <div className={'mt-[80px] w-[calc(100%-4rem)] ml-[2rem] mr-[2rem] flex flex-col'}>
                <ProjectHeader />
                <ProjectNavbar selected={selectedPage} setSelected={setSelectedPage} />
                {selectedPage === 'List' ? <List /> : <></>}
            </div>
        </div>
    )
}
import * as React from 'react'
import axios from "axios";
import { useSelector } from "react-redux";

import { TopNavbar } from "../../components/top-navbar";
import { ProjectCard } from "./components/project-card";



export function UserProjectsPage(){

    const user_id = useSelector((state : any) => state.user.id);
    const [projects, setProjects] = React.useState<Array<any>>([])

    const createProject = () => {
        const data = {
            name: 'Untitled',
            description: 'No description',
            icon_src: '/static/project-icons/planning.png',
            color: 'bg-cyan-100',
            user_id: user_id,
        }
        const promise = axios({
            method: 'post',
            url: `${process.env["REACT_APP_SERVER_IP"]}/projects/create`,
            data,
        })
        promise.then((res) => {
            setProjects([...projects, res.data.data]);
        })
    }

    React.useEffect(() => {
        if(!user_id) return;
        const promise = axios({ //get projects from server
            method: "post",
            url: `${process.env["REACT_APP_SERVER_IP"]}/projects/getUserProjects`,
            data: {user_id}
        })
        promise.then((res) => {
            setProjects((state) => res.data.data);
        }).catch((e) => {console.log(e)})
    }, [user_id])

    return(
        <div>
            <TopNavbar/>
            <div className={'w-[1000px] flex flex-col ml-auto mr-auto mt-[110px] mb-[50px] max-[1050px]:w-[calc(100%-32px)]'}>
                <div className={'flex flex-row items-center w-full'}>
                    <h1 className={'text-[24px] font-bold '}>My Projects</h1>
                    <button className={`w-[120px] h-[40px] text-white rounded-md bg-blue-500 cursor-pointer mr-0 ml-auto`}
                            onClick={createProject}>
                        Create project
                    </button>
                </div>
                <div className={'grid w-full grid-cols-3 gap-[50px] mt-[30px] max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center max-[900px]:grid-cols-2'}>
                    {projects.map((project: any) => (
                        <ProjectCard name={project.name} id={project.ID} description={project.description} icon_src={project.icon_src} color={project.color} key={project.ID}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
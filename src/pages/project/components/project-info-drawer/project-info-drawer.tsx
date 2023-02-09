import * as React from 'react'
import Select  from "react-select";

import {useDispatch, useSelector} from "react-redux";
import {ColorSelector, IconSelector} from "./selectors";

import {colors, icons} from "../../constants";
import axios from "axios";

export function ProjectInfoDrawer(){

    const dispatch = useDispatch()
    const project_info = useSelector((state: any) => state.project.project_info);

    const [isShown, setIsShown] = React.useState(false);

    const iconSelector = React.useRef<any>();
    const colorSelector = React.useRef<any>();


    const updateProjectInfo = () => {
        const promise = axios({
            method: 'post',
            url: `${process.env['REACT_APP_SERVER_IP']}/projects/updateProjectInfo`,
            data: {...project_info, updated_at: Date.now(), id: project_info.ID}
        })
    }

    React.useEffect(() => {
        if(!project_info.id) return;

        const iconIndex = icons.findIndex((el) => el.value === project_info.icon_src);
        iconSelector.current.setValue(icons[iconIndex]);
        const colorIndex = colors.findIndex((el) => el.value === project_info.color);
        colorSelector.current.setValue(colors[colorIndex]);

    }, [project_info.id])

    return(
        <div className={`fixed h-full w-[332px] top-0 flex flex-row items-center z-50
                        ${isShown ? 'transition-all delay-200 right-0' : 'transition-all delay-200 -right-[300px]'}`}>
            <div className={'h-[50px] w-[36px] bg-cyan-100 flex flex-row items-center justify-end rounded-tl-[100%] rounded-bl-[100%]'}>
                <img alt={'arrow'} src={'/images/icons8-back-arrow-32.png'} className={`w-[32px] h-[32px] cursor-pointer ${isShown ? '-scale-x-100' : 'scale-x-100'}`}
                     onClick={() => setIsShown((state) => !state)}/>
            </div>
            <div className={'w-[300px] h-full bg-cyan-100 rounded-tl-md rounded-bl-md flex flex-col box-border pl-4 pr-4 pt-[60px]'}>
                <p className={'font-bold text-gray-900 text-[24px]'}>Settings</p>
                <div className={'mt-4 w-full'}>
                    <p className={'mb-1 font-bold text-gray-900 text-[18px]'}>Project name:</p>
                    <input value={project_info.name} className={'w-full h-[32px] rounded-md'}
                           onChange={(e) => dispatch({type: "change-project-info", property: "name", value: e.target.value})}/>
                </div>
                <div className={'mt-4 w-full'}>
                    <p className={'mb-1 font-bold text-gray-900 text-[18px]'}>Project description:</p>
                    <textarea value={project_info.description} className={'w-full h-[96px] rounded-md resize-none'}
                              onChange={(e) => dispatch({type: "change-project-info", property: "description", value: e.target.value})}/>
                </div>
                <div className={'mt-4 w-full flex flex-row'}>
                    <p className={'mb-1 w-[70px] font-bold text-gray-900 text-[18px]'}>Color:</p>
                    <Select className={'ml-4 w-full'} defaultValue={colors[0]} options={colors} formatOptionLabel={ColorSelector} ref={colorSelector}
                            onChange={(value) => dispatch({type: 'change-project-info', property: 'color', value: value!.value})}/>
                </div>
                <div className={'mt-4 w-full flex flex-row items-center'}>
                    <p className={'mb-1 w-[70px] font-bold text-gray-900 text-[18px]'}>Icon:</p>
                    <Select className={'ml-4 w-full'} options={icons} defaultValue={icons[0]} formatOptionLabel={IconSelector} ref={iconSelector}
                            onChange={(value) => dispatch({type: 'change-project-info', property: 'icon_src', value: value!.value})}/>
                </div>
                <button className={`w-[100px] h-[50px] text-white rounded-md bg-blue-500 cursor-pointer mt-4`}
                        onClick={updateProjectInfo}>
                    Save changes
                </button>
            </div>
        </div>
    )
}
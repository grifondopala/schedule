import * as React from 'react'
import axios from "axios";

import {useSelector} from "react-redux";
import {ColorSelector, IconSelector, SelectorTemp} from "./selectors";

import {InputField, TextareaField} from "./fields";
import {ProjectSavedBadge} from "./project-saved-badge";

import {colors, icons} from "./constants";


export function ProjectInfoDrawer(){

    const project_info = useSelector((state: any) => state.project.project_info);

    const [isShown, setIsShown] = React.useState(false);
    const [isSaveBadgeShown, setIsSaveBadgeShown] = React.useState(false);

    const iconSelector = React.useRef<any>();
    const colorSelector = React.useRef<any>();


    const updateProjectInfo = () => {

        const {updated_at: _, ...data} = project_info;

        const promise = axios({
            method: 'patch',
            url: `${process.env['REACT_APP_SERVER_IP']}/projects/updateInformation`,
            data
        })
        promise.then(() => {
            setIsSaveBadgeShown(true);
            setTimeout(() => setIsSaveBadgeShown(false), 2000);
        })

    }

    React.useEffect(() => {
        if(!project_info.id) return;

        const iconIndex = icons.findIndex((el) => el.value === project_info.icon_src);
        iconSelector.current.setValue(icons[iconIndex]);
        const colorIndex = colors.findIndex((el) => el.value === project_info.color);
        colorSelector.current.setValue(colors[colorIndex]);
        // eslint-disable-next-line
    }, [project_info.id])

    return(
        <div className={`fixed h-full w-[332px] top-0 flex flex-row items-center z-50
                        ${isShown ? 'transition-all delay-200 right-0' : 'transition-all delay-200 -right-[300px]'}`}>
            <div className={'h-[50px] w-[36px] flex flex-row items-center justify-end rounded-tl-[100%] rounded-bl-[100%]'} style={{backgroundColor: project_info.color}}>
                <img alt={'arrow'} src={'/images/icons8-back-arrow-32.png'} className={`w-[32px] h-[32px] cursor-pointer ${isShown ? '-scale-x-100' : 'scale-x-100'}`}
                     onClick={() => setIsShown((state) => !state)}/>
            </div>
            <div className={'w-[300px] h-full rounded-tl-md rounded-bl-md flex flex-col box-border pl-4 pr-4 pt-[60px]'} style={{backgroundColor: project_info.color}}>
                <p className={'font-bold text-gray-900 text-[24px]'}>Settings</p>
                <InputField property={'name'} value={project_info.name} label={'Project name:'}/>
                <TextareaField property={'description'} value={project_info.description} label={'Project description:'}/>
                <SelectorTemp label={'Color:'} property={'color'} selectorProps={{options: colors, defaultValue: colors[0], formatOptionLabel: ColorSelector, ref: colorSelector}}/>
                <SelectorTemp label={'Icon:'} property={'icon_src'} selectorProps={{options: icons, defaultValue: icons[0], formatOptionLabel: IconSelector, ref: iconSelector}}/>
                <div className={'flex flex-row mt-4 w-full'}>
                    <button className={`w-[120px] h-[50px] text-white rounded-md bg-blue-500 cursor-pointer box-border p-[5px]`} onClick={updateProjectInfo}>
                        Save changes
                    </button>
                    <ProjectSavedBadge isShown={isSaveBadgeShown}/>
                </div>
            </div>
        </div>
    )
}
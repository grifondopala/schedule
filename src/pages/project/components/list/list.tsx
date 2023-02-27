import * as React from 'react'
import {useSelector} from "react-redux";

import { Column } from './column';
import { Section }  from "./section"

import { ColumnModel } from "../../../../models/column";
import { SectionModel } from "../../../../models/section";

export function List(){

    const columns: Array<ColumnModel> = useSelector((state: any) => state.project.columns)
    const sections: Array<SectionModel> = useSelector((state: any) => state.project.sections)

    const [isOverlayShown, setIsOverlayShown] = React.useState(false);

    return(
        <>
            <div className={'mt-4'}>
                <div className={'flex flex-row'}>
                    {columns.map((column: ColumnModel, index: number) => (
                        <Column column={column} index={index} key={column.ID}/>
                    ))}
                    <div className={'h-[40px] w-full flex flex-row items-center justify-center border-2 border-l-0 border-r-0 select-none'}>
                        <div className={'w-[24px] h-[24px] flex items-center justify-center rounded-md hover:bg-gray-200 cursor-pointer'}
                             onClick={() => setIsOverlayShown(true)}>
                            <img className={'w-[16px] h-[16px]'} src={"/images/plus.png"} alt={'plus'}/>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    {sections.map((section: SectionModel, index) => (
                        <Section section={section} index={index} key={section.ID}/>
                    ))}
                </div>
            </div>
            <div className={`fixed w-full left-0 top-0 opacity-60 h-full bg-black z-50 ${isOverlayShown ? 'visible' : 'hidden'}`}
                 onClick={() => setIsOverlayShown(false)}>
            </div>
        </>
    )
}
import * as React from 'react'
import axios from "axios";

import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";

const types = [
    {value: 'text-point', imageSrc: '/images/letter.png', text: 'Text'}
]

const SelectorType = (type: typeof types[0]) => {
    return(
        <div className={'flex flex-row items-center'}>
            <img className={'w-[16px] h-[16px]'} src={type.imageSrc} alt={type.value}/>
            <p className={'ml-2'}>{type.text}</p>
        </div>
    )
}

export function AddColumn({isShown, setShown}: {isShown: boolean, setShown: React.Dispatch<React.SetStateAction<boolean>>}){

    const [name, setName] = React.useState('')
    const [type, setType] = React.useState('text-point')

    const order_number = useSelector((state: any) => state.project.columns.length)
    const project_id = useSelector((state: any) => state.project.project_info.id)

    const dispatch = useDispatch()

    const CreateColumn = () => {
        if(name === '') return;
        const promise = axios({
            method: 'post',
            url: `${process.env["REACT_APP_SERVER_IP"]}/columns/create`,
            data: {name, type, width: 200, order_number: order_number + 1, project_id}
        })
        promise.then((res: any) => {
            dispatch({type: "add-column", column: res.data.column, points: res.data.points })
        });
        setShown(false);
    }

    return(
        <div className={`fixed w-[500px] bg-white z-[100] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md 
                         flex flex-col ${isShown ? 'transition-opacity opacity-100 duration-200' : 'opacity-0 pointer-events-none'}`}>
            <div className={'box-border p-[25px] pb-0 select-none'}>
                <p className={'font-bold text-[18px]'}>Add column</p>
                <div className={'flex flex-row pt-3'}>
                    <button className={`w-[50px] border-b-[3px] border-b-gray-700`}>
                        <p className={`text-[16px] font-bold`}>Create</p>
                    </button>
                </div>
            </div>
            <hr/>
            <div className={'flex flex-col p-[25px] pt-2 mb-[100px]'}>
                <div className={'flex flex-row'}>
                    <div className={'flex flex-col'}>
                        <label className={'mb-1'}>Column name</label>
                        <div className={'border-2 rounded-md box-border p-[5px] h-[35px] flex flex-col items-center justify-center'}>
                            <input className={'outline-none h-[25px]'} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className={'flex flex-col ml-[40px] w-full'}>
                        <label className={'mb-1'}>Column type</label>
                        <Select options={types} defaultValue={types[0]} formatOptionLabel={SelectorType} onChange={(e) => setType(e!.value)}/>
                    </div>
                </div>
            </div>
            <hr/>
            <div className={'h-[80px] flex flex-row gap-[20px] box-border p-[25px] justify-end'}>
                <button className={'border-2 box-border pl-[10px] pr-[10px] h-[40px] rounded-md'} onClick={() => setShown(false)}>Cancel</button>
                <button className={`box-border pl-[10px] pr-[10px] h-[40px] rounded-md 
                                    ${name === '' ? 'bg-gray-100 cursor-default' : 'bg-blue-500 cursor-pointer text-white'}`}
                                    onClick={CreateColumn}>Add column</button>
            </div>
        </div>
    )
}
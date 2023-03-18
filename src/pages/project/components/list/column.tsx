import * as React from 'react'

import { ColumnModel } from "../../../../models/column";

import axios from "axios";
import { useDispatch } from "react-redux";

const minWidth = 200;
const maxWidth = 500;

export function Column({column, index}: {column: ColumnModel, index: number}){

    const dispatch = useDispatch()

    const [width, setWidth] = React.useState(column.width)

    const rightBorder = React.useRef<any>()
    const mainDiv = React.useRef<any>()

    React.useEffect(() => {
        rightBorder.current.addEventListener('mousedown', (e: any) => {
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })
        function resize(e: any) {
            const newWidth = e.pageX - mainDiv.current.getBoundingClientRect().left
            if(newWidth > minWidth && newWidth < maxWidth){
                setWidth(newWidth)
            }
        }
        function stopResize() {
            window.removeEventListener('mousemove', resize)
            const new_width = rightBorder.current.getBoundingClientRect().left - mainDiv.current.getBoundingClientRect().left
            let promise = axios({
                method: "patch",
                url: `${process.env["REACT_APP_SERVER_IP"]}/columns/update`,
                data: {width: new_width, name: column.name, order_number: column.order_number, id: column.ID},
            })
            promise.then(() => {}).catch((e) => {
                console.log(e)
            })
            dispatch({type: "change-column", index: index, data: {width: new_width}})
        }
    }, [])

    return(
        <>
            <div className={'h-[40px] flex flex-row items-center box-border p-[10px] border-2 border-l-0 border-r-0 bg-white hover:bg-gray-50 flex-shrink-0'}
                 style={{width: `${width}px`}} ref={mainDiv}>
                <p className={'text-[14px] select-none'}>{column.name}</p>
                <div className={'w-[24px] h-[24px] ml-auto mr-0 flex items-center justify-center rounded-md hover:bg-gray-200 cursor-pointer select-none'}>
                    <img className={'w-[16px] h-[16px]'} src={"/images/arrow-down.png"} alt={'arrow'}/>
                </div>
            </div>
            <div className={'w-[5px] bg-[#e5e7eb] hover:cursor-ew-resize flex-shrink-0'} ref={rightBorder}></div>
        </>
    )
}

import * as React from "react";

interface ContinueAuthBtnProps{
    text: string,
    data: any,
    onClickHandler: (isActive: boolean) => void;
}

export const ContinueAuthBtn = (props: ContinueAuthBtnProps) => {

    const [isActive, setIsActive] = React.useState(false);

    // Active, when all inputs aren't empty
    React.useEffect(() => {
        for(let key in props.data){
            if(props.data[key] === ''){
                setIsActive(false);
                return;
            }
        }
        setIsActive(true);
    }, [props.data])

    return(
        <button className={`w-[100px] h-[50px] text-white rounded-md ${isActive ? 'bg-blue-500 cursor-pointer' : 'bg-blue-300 cursor-default'}`}
                onClick={() => props.onClickHandler(isActive)}>
            {props.text}
        </button>
    )
}
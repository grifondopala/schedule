import * as React from "react";

export const ContinueAuthBtn = ({text, data, onClickHandler}: {text: string, data: any, onClickHandler: () => void}) => {

    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        for(let key in data){
            if(data[key] === ''){
                setIsActive(false);
                return;
            }
        }
        setIsActive(true);
    }, [data])

    const continueAuth = () => {
        if(!isActive) return
        onClickHandler();
    }

    return(
        <button className={`w-[100px] h-[50px] text-white rounded-md ${isActive ? 'bg-blue-500 cursor-pointer' : 'bg-blue-300 cursor-default'}`}
                onClick={continueAuth}>
            {text}
        </button>
    )
}
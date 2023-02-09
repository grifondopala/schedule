import * as React from "react";

export const useInput = (initial: string, type: string) => {

    const [value, setValue] = React.useState(initial)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const clearValue = () => {setValue('')};

    return{
        inputProps: {value, onChange, type},
        clearValue
    }

}
import React, {createRef, useCallback, useState} from "react";

export const TextConfirmInput = ({
    defaultValue,
    onConfirm
}) => {
    const [inputShown, setInputShown] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const onConfirmCallback = useCallback(async () => {
        onConfirm(value)
        setInputShown(false)
    }, [value, onConfirm, setInputShown])

    const onChange = useCallback(async (e) => {
        setValue(e.target.value)
    }, [setValue])

    const onDiscardCallback = useCallback(async () => {
        setInputShown(false)
        setValue(defaultValue)
    }, [setInputShown, setValue])

    const onSpanClick = useCallback(async () => {
        setInputShown(true)
    }, [setInputShown])

    return <div >
        {
            inputShown &&
            <div style={{width: "120px", height:"20px"}}>
                <input
                    autoFocus
                    style={{width: "100px", textAlign: "center", height: "30px", fontSize:15, padding: "1px", margin: "1px", border: "0"}}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onBlur={onConfirmCallback}
                />
            </div>
            ||
            <div onClick={onSpanClick} style={{width: "120px", height:"20px"}}><span >{value}</span></div>
        }
    </div>
}
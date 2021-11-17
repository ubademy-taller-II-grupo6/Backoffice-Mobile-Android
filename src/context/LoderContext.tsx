
import React,{ createContext, useContext, useState } from "react";
import { LoderContextProps, LoderState } from "../interface/LouderInterface";


let loderInitialState:LoderState={
    isLoder:false
}

export const LoderContext = createContext({} as LoderContextProps);


export const LoderProvider= ({children}:any)=>{
    const [loderState, setLoderState] = useState(loderInitialState)
    const changeStateLoder = (newValue:boolean)=>{
        let newState:LoderState = {
            isLoder:newValue
        } 
        setLoderState(newState)
    }
    return (
        <LoderContext.Provider value={{
            loderState,
            changeStateLoder
        }}>
            {children}
        </LoderContext.Provider>
    )
}
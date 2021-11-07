import { createContext, useContext } from "react";
import { LouderContextProps, louderState } from "../interface/LouderInterface";


let louderInitialState:louderState={
    isLouder:false
}

export const LouderContext = createContext({} as LouderContextProps);

export const LouderProvider= ({children}:any)=>{
    return (
        <LouderContext.Provider value={{
            louder:louderInitialState,
            changeStateLouder:()=>{}
        }}>
            {children}
        </LouderContext.Provider>
    )
}
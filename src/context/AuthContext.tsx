import React, { useReducer } from 'react';

import { createContext } from "react";
import { AuthContextProps, AuthState } from "../interface/AuthStateInterface";
import { AuthReducer } from '../reducers/authReducer';

export const authInitialState:AuthState={
    isLoggedIn:false,
    username:"", 
    email:"",
    potho:"",
    token:""
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any)=>{

    const [authState, dispatch] = useReducer(AuthReducer, authInitialState)
    const signIn = (payload:AuthState) => {
        console.log(payload)
        dispatch({type:'signIn',payload})
    }
    const lognOut = ()=>{
        dispatch({type:'lognOut'})
    }
    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            lognOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
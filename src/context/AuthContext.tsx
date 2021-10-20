import { createContext } from "react";
import { AuthContextProps, AuthState } from "../interface/AuthStateInterface";

export const authInitialState:AuthState={
    isLoggedIn:false
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any)=>{
    return (
        <AuthContext.Provider value={{
            authState:authInitialState,
            signIn:()=>{}
        }}>
            {children}
        </AuthContext.Provider>
    )
}
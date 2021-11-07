export interface AuthState{
    isLoggedIn:boolean;
    username?:string;
    email:string;
    potho:string;
    token:string
}

export interface AuthContextProps{
    authState: AuthState;
    signIn: (payload: AuthState)=>void;
    lognOut:()=>void;
}
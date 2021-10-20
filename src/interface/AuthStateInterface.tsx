export interface AuthState{
    isLoggedIn:boolean;
    username?:string;
}

export interface AuthContextProps{
    authState: AuthState;
    signIn: ()=>void
}
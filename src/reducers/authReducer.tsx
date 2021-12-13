import { AuthState } from "../interface/AuthStateInterface";

type AuthAction = 
    |   { type:'signIn',payload:AuthState }
    |   { type:'lognOut'}
    |   { type:'setUser',payload:any}

export const AuthReducer= (state:AuthState,action:AuthAction):AuthState => {
    switch (action.type) {
        case 'signIn':
            return {...state,
                isLoggedIn:true,
                username:action.payload.username,
                email:action.payload.email,
                userProfile:action.payload.userProfile,
            };
        case 'lognOut':
            return {
                ...state,
                isLoggedIn:false,
                username:'',
                email:'',
            };
        case 'setUser':
            return {
                ...state,
                typeUser:action.payload
            }
        default:
            return state;
    }
}
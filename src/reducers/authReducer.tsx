import { AuthState } from "../interface/AuthStateInterface";

type AuthAction = 
    |   { type:'signIn',payload:AuthState }
    |   { type:'lognOut'}

export const AuthReducer= (state:AuthState,action:AuthAction):AuthState => {
    switch (action.type) {
        case 'signIn':
            return {...state,
                isLoggedIn:true,
                username:action.payload.username,
                email:action.payload.email,
            };
        case 'lognOut':
            return {
                ...state,
                isLoggedIn:false,
                username:'',
                email:'',
            }
        default:
            return state;
    }
}
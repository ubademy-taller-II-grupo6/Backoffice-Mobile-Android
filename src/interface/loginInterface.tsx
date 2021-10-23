export interface loginInterface {
    email:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
    password:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
        show:boolean
    }
}
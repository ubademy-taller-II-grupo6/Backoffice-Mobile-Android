export interface registerInterface {
    name:String,
    lastname:String,
    email:String,
    passward:{
        show:Boolean,
        content:String
    },
    rePassward:{
        show:Boolean,
        content:String
    },
    profile:any
}

export interface register{
    name: String,
    lastname: String,
    email: String,
    password: String,
    profile: String,
}

export interface validationInterface {
    name:{
         value:string,
         isValid:boolean,
         isFocus?:boolean,
     },
     lastname: {
         value:string,
         isValid:boolean,
         isFocus?:boolean,
     },
     email:{
         value:string,
         isValid:boolean,
         isFocus?:boolean,
     },
     password:passwordValidation[]
}
interface passwordValidation{
    id:string,
    value:string,
    isValid:boolean,
    isFocus?:false,
}
export interface opcionValidation{
    name:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
    lastname:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
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
    },
    rePassword:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
        show:boolean
    }
}


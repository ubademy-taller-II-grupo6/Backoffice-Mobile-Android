import React, {  useState } from 'react'
import { opcionValidation, registerInterface } from '../interface/registroInterface'
import { registerService } from '../service/registerService'
//import { registerInterface } from '../interface/registro'

export const useForm = () => {
    let initialState:opcionValidation={
        name:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
        },
        lastname:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
        },
        email:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
        },
        password:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
            show:false
        },
        rePassword:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
            show:false
        },
    }
    const [register, setRegister] = useState(initialState)
    const [loader, setloader] = useState(false)
    let changeFocus =(campo:string,value:boolean)=>{
        if(campo=='name'){
            let newCampo = {
                value:register.name.value,
                isValid:register.name.isValid,
                hasFocus:true,
                isFocus:value,
            }    
            setRegister({...register,name:newCampo})
        }
        if(campo=='lastname'){
            let newCampo = {
                value:register.lastname.value,
                isValid:register.lastname.isValid,
                hasFocus:true,
                isFocus:value,
            }    
            setRegister({...register,lastname:newCampo})
        }
        if(campo=='email'){
            let newCampo = {
                value:register.email.value,
                isValid:register.email.isValid,
                hasFocus:true,
                isFocus:value,
            }    
            setRegister({...register,email:newCampo})
        }
        if(campo=='password'){
            let newCampo = {
                value:register.password.value,
                isValid:register.password.isValid,
                hasFocus:true,
                isFocus:value,
                show:register.password.show
            }    
            setRegister({...register,password:newCampo})
        }
        if(campo=='rePassword'){
            let newCampo = {
                value:register.rePassword.value,
                isValid:register.rePassword.isValid,
                hasFocus:true,
                isFocus:value,
                show:register.rePassword.show
            }    
            setRegister({...register,rePassword:newCampo})
        }
    }
    let changeValue = (campo:string,value:string) => {
        if(campo=='name'){
            let newCampo = {
                value:value,
                isValid:(value!="")?true:false,
                hasFocus:register.name.hasFocus,
                isFocus:register.name.isFocus,
            }    
            setRegister({...register,name:newCampo})
        }
        if(campo=='lastname'){
            let newCampo = {
                value:value,
                isValid:(value!="")?true:false,
                hasFocus:register.lastname.hasFocus,
                isFocus:register.lastname.isFocus,
            }    
            setRegister({...register,lastname:newCampo})
        }
        if(campo=='email'){
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let newCampo = {
                value:value,
                isValid:(re.test(value))?true:false,
                hasFocus:register.email.hasFocus,
                isFocus:register.email.isFocus,
            }    
            setRegister({...register,email:newCampo})
        }
        if((campo=='rePassword')||(campo=='password')){
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            let newRePassword={...register.rePassword}
            let newPassword={...register.password}
            if(campo=='password'){
                newPassword.value=value
                newPassword.isValid=(re.test(value)&&(value==register.rePassword.value))?true:false
                newRePassword.isValid=((register.rePassword.value==value))?true:false
            }
            if(campo=='rePassword'){
                newRePassword.value=value
                newRePassword.isValid=((register.password.value==value))?true:false
                newPassword.isValid=((register.password.value==value)&&re.test(register.password.value))?true:false
            }
            setRegister({...register,password:newPassword,rePassword:newRePassword})
        }
    }
    let showPassword = (campo:string)=>{
        if(campo=='password'){
            let newCampo = {
                value:register.password.value,
                isValid:register.password.isValid,
                hasFocus:register.password.hasFocus,
                isFocus:register.password.isFocus,
                show:!register.password.show
            }  
            setRegister({...register,password:newCampo})
        }
        if(campo=='rePassword'){
            let newCampo = {
                value:register.rePassword.value,
                isValid:register.rePassword.isValid,
                hasFocus:register.rePassword.hasFocus,
                isFocus:register.rePassword.isFocus,
                show:!register.rePassword.show
            }  
            setRegister({...register,rePassword:newCampo})
        }
    }
    let errorSubmit= ()=>{
        let newRegister = {...register}
        newRegister.email.hasFocus=true
        newRegister.name.hasFocus=true
        newRegister.lastname.hasFocus=true
        newRegister.password.hasFocus=true
        newRegister.rePassword.hasFocus=true
        setRegister(newRegister)
    }
    return {
        register,
        changeValue,
        changeFocus,
        loader,
        setloader,
        showPassword,
        errorSubmit
    }
}

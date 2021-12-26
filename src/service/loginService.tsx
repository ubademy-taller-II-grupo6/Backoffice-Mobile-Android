import React, { useState } from 'react'
import { loginInterface } from '../interface/loginInterface'

export const loginService = () => {

    let initialState:loginInterface = {
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
        }
    }

    const [login, setLogin] = useState(initialState)
    const [loader, setloader] = useState(false)

    let showPassword = () => {
        let newCampo = {
            value:login.password.value,
            isValid:login.password.isValid,
            hasFocus:login.password.hasFocus,
            isFocus:login.password.isFocus,
            show:!login.password.show
        }  
        setLogin({...login,password:newCampo})
    }

    let changeValue = (campo:string,value:string) =>{
        if(campo=='email'){
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let newCampo = {
                value:value,
                isValid:(re.test(value))?true:false,
                hasFocus:login.email.hasFocus,
                isFocus:login.email.isFocus,
            }    
            setLogin({...login,email:newCampo})
        }
        if(campo=='password'){
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            let newPassword={...login.password}
            newPassword.value=value
            newPassword.isValid=(re.test(value)&&(value==login.password.value))?true:false
            setLogin({...login,password:newPassword})
        }
    }

    let changeFocus = (campo:string,value:boolean) =>{
        if(campo=='email'){
            let newCampo = {
                value:login.email.value,
                isValid:login.email.isValid,
                hasFocus:true,
                isFocus:value,
            }    
            setLogin({...login,email:newCampo})
        }
        if(campo=='password'){
            let newCampo = {
                value:login.password.value,
                isValid:login.password.isValid,
                hasFocus:true,
                isFocus:value,
                show:login.password.show
            }    
            setLogin({...login,password:newCampo})
        }
    }
    let errorSubmit= ()=>{
        let newLogin = {...login}
        newLogin.email.hasFocus=true
        newLogin.password.hasFocus=true
        setLogin(newLogin)
    }

    return {
        showPassword,
        login,
        changeValue,
        changeFocus,
        setloader,
        errorSubmit,
        loader
    }
}

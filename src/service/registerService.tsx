import React, { useState } from 'react'
import { registerInterface, validationInterface } from '../interface/registroInterface'

export const registerService = () => {

    let registerInititialState:registerInterface={
        name:"",
        lastname:"",
        email:"",
        passward:{
            show:false,
            content:""
        },
        rePassward:{
            show:false,
            content:""
        },
        profile:null
    }

    let validationInititialState:validationInterface={
        name:{
            value:"Este campo obligatorio",
            isValid:false,
            isFocus:false
        },
        lastname: {
            value:"Este campo obligatorio",
            isValid:false,
            isFocus:false
        },
        email:{
            value:"Este campo obligatorio",
            isValid:false,
            isFocus:false
        },
        password:[
            {
                id:"longitud",
                value:"La contraseña debe tener Mínimo 8 caracteres",
                isValid:false,
                isFocus:false
            },
            {
                id:"mayuscula",
                value:"La contraseña debe tener al menos letra mayúscula",
                isValid:false,
                isFocus:false
            },
            {
                id:"cantNumeros",
                value:"La contraseña debe tener al menos 3 número",
                isValid:false,
                isFocus:false
            },
            {
                id:"samePassward",
                value:"Las contraseñas deben coincidir",
                isValid:false,
                isFocus:false
            },
        ]
    }

    return {
        registerInititialState,
        validationInititialState
    }
}

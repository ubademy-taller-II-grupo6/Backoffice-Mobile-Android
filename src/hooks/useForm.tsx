import React, { useState } from 'react'
//import { registerInterface } from '../interface/registro'

export const useForm = <T extends Object>(initialState: T) => {
    const [register, setRegister] = useState(initialState)

    let updateState=(value:Object,campo:string)=>{
        setRegister({...register,[campo]:value})
    }
    
    return {
        register,
        updateState,
    }
}

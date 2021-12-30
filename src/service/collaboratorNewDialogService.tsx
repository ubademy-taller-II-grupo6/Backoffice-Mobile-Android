import React, { useState } from 'react'

interface collaboratorNewDialogInterface {
    email:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    }
}

export const collaboratorNewDialogService = () => {

    let initialState:collaboratorNewDialogInterface = {
        email:{
            value:"",
            isValid:false,
            hasFocus:false,
            isFocus:false,
        },
    }

    const [collaborator, setCollaborator] = useState(initialState);

    let changeValue = (campo:string,value:string) =>{
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let newCampo = {
            value:value,
            isValid:(re.test(value))?true:false,
            hasFocus:collaborator.email.hasFocus,
            isFocus:collaborator.email.isFocus,
        }    
        setCollaborator({email:newCampo})
    }

    let changeFocus = (campo:string,value:boolean) =>{
        let newCampo = {
            value:collaborator.email.value,
            isValid:collaborator.email.isValid,
            hasFocus:true,
            isFocus:value,
        }    
        setCollaborator({email:newCampo})
    }

    let errorSubmit= ()=>{
        let newCollaborator = {...collaborator};
        newCollaborator.email.hasFocus=true;
        newCollaborator.email.isValid=false;
        setCollaborator(newCollaborator);
    }

    return {
        collaborator,
        changeValue,
        changeFocus,
        errorSubmit
    }
}

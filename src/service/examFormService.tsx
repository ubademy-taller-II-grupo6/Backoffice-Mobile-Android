import React, { useState } from 'react'
import { Exam } from '../interface/ExamInterface'

export interface examFormInterface {
    title:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
    description:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
}

export const examFormService = (initialValue?: Exam) => {

    let initialState:examFormInterface = {
        title:{
            value: initialValue?.title || "",
            isValid: false,
            hasFocus:false,
            isFocus:false,
        },
        description:{
            value: initialValue?.description || "",
            isValid: false,
            hasFocus:false,
            isFocus:false,
        },
    }

    const [examForm, setExamForm] = useState(initialState);

    let changeValue = (campo:string,value:string) =>{    
        let newCampo = {
            value:value,
            isValid: true,
            hasFocus: false,
            isFocus: false,
        }  

        switch (campo) {
            case 'title':   
                newCampo.hasFocus = examForm.title.hasFocus; 
                newCampo.isFocus = examForm.title.isFocus; 
                setExamForm({...examForm,title:newCampo});            
                break;
                
            case 'description':   
                newCampo.hasFocus = examForm.description.hasFocus; 
                newCampo.isFocus = examForm.description.isFocus; 
                setExamForm({...examForm,description:newCampo});                 
                break;
            
        }
    }

    let changeFocus = (campo:string,value:boolean) =>{
        
        let newCampo = {
            value:"",
            isValid: true,
            hasFocus:true,
            isFocus:value,
        }  

        switch (campo) {
            case 'title':   
                newCampo.value = examForm.title.value; 
                newCampo.isValid = examForm.title.isValid; 
                setExamForm({...examForm,title:newCampo});            
                break;
                
            case 'description':   
                newCampo.value = examForm.description.value; 
                newCampo.isValid = examForm.description.isValid; 
                setExamForm({...examForm,description:newCampo});                 
                break;
            
        }
    }
    let errorSubmit= ()=>{
        let newExamForm = {...examForm}
        newExamForm.title.hasFocus=true
        newExamForm.description.hasFocus=true
        setExamForm(newExamForm)
    }

    return {
        examForm,
        changeValue,
        changeFocus,
        errorSubmit
    }
}

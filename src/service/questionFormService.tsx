import React, { useState } from 'react'
import { Question } from '../interface/ExamInterface'

export interface questionFormInterface {
    description:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    answer:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
}

export const questionFormService = (initialValue?: Question) => {

    let initialState : questionFormInterface = {
        description:{
            value: initialValue?.description || "",
            isValid: !!initialValue?.description,
            hasFocus:false,
            isFocus:false,
        },
        answer: {
            value: (!!initialValue ?  (initialValue.answer ? "true" : "false") : ""),
            isValid: !!initialValue,
            hasFocus:false,
            isFocus:false,
        },
    }

    const [questionForm, setQuestionForm] = useState(initialState);

    let changeValue = (campo:string,value:string) =>{    
        let newCampo = {
            value:value,
            isValid: true,
            hasFocus: false,
            isFocus: false,
        }  

        switch (campo) {
            case 'description':   
                newCampo.hasFocus = questionForm.description.hasFocus; 
                newCampo.isFocus = questionForm.description.isFocus; 
                setQuestionForm({...questionForm,description:newCampo});                 
                break;
            
            case 'answer':   
                newCampo.hasFocus = questionForm.answer.hasFocus; 
                newCampo.isFocus = questionForm.answer.isFocus; 
                setQuestionForm({...questionForm,answer:newCampo});                 
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
            case 'description':   
                newCampo.value = questionForm.description.value; 
                newCampo.isValid = questionForm.description.isValid; 
                setQuestionForm({...questionForm,description:newCampo});                 
                break;
            
            case 'title':   
                newCampo.value = questionForm.answer.value; 
                newCampo.isValid = questionForm.answer.isValid; 
                setQuestionForm({...questionForm,answer:newCampo});            
                break;
        }
    }
    let errorSubmit= ()=>{
        let newQuestionForm = {...questionForm}
        newQuestionForm.answer.hasFocus=true
        newQuestionForm.description.hasFocus=true
        setQuestionForm(newQuestionForm)
    }
    let cleanForm= ()=>{
        let newQuestionForm = {...questionForm}
        newQuestionForm.description.value=""
        newQuestionForm.description.isValid=false
        newQuestionForm.description.hasFocus=false
        newQuestionForm.answer.value=""
        newQuestionForm.answer.isValid=false
        newQuestionForm.description.hasFocus=false
        setQuestionForm(newQuestionForm)
    }

    return {
        questionForm,
        changeValue,
        changeFocus,
        errorSubmit,
        cleanForm
    }
}

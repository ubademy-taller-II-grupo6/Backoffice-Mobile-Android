import React, { useState } from 'react'
import { Question } from '../interface/ExamInterface'

export interface answerFormInterface {
    answer:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean,
    },
}

export const answerFormService = (initialValue?: Question) => {

    let initialState : answerFormInterface = {
        answer: {
            value: "",
            isValid: false,
            hasFocus:false,
            isFocus:false,
        },
    }

    const [answerForm, setAnswerForm] = useState(initialState);

    let changeValue = (campo:string,value:string) =>{    
        let newCampo = {
            value:value,
            isValid: true,
            hasFocus: false,
            isFocus: false,
        }  

        switch (campo) {            
            case 'answer':   
                newCampo.hasFocus = answerForm.answer.hasFocus; 
                newCampo.isFocus = answerForm.answer.isFocus; 
                setAnswerForm({...answerForm,answer:newCampo});                 
                break;
        }
    }

    let errorSubmit= ()=>{
        let newAnswerForm = {...answerForm};
        newAnswerForm.answer.hasFocus=true;
        setAnswerForm(newAnswerForm);
    }

    return {
        answerForm,
        changeValue,
        errorSubmit
    }
}

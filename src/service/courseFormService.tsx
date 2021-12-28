import React, { useState } from 'react'
import { Course } from '../interface/CourseInterface'

export interface courseFormInterface {
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
    hashtags:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    unenrollment_conditions:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    enrollment_conditions:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    location:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    category:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    subscription:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
    type:{
        value:string,
        isValid:boolean,
        hasFocus:boolean,
        isFocus:boolean
    },
}

export const courseFormService = (initialValue?: Course) => {

    let initialState:courseFormInterface = {
        title:{
            value: initialValue?.title || "",
            isValid: !!initialValue?.title,
            hasFocus:false,
            isFocus:false,
        },
        description:{
            value: initialValue?.description || "",
            isValid: !!initialValue?.description,
            hasFocus:false,
            isFocus:false,
        },
        hashtags:{
            value: initialValue?.hashtags || "",
            isValid: !!initialValue?.hashtags,
            hasFocus:false,
            isFocus:false,
        },
        unenrollment_conditions:{
            value: initialValue?.unenrollment_conditions || "",
            isValid: !!initialValue?.unenrollment_conditions,
            hasFocus:false,
            isFocus:false,
        },
        enrollment_conditions:{
            value: initialValue?.enrollment_conditions || "",
            isValid: !!initialValue?.enrollment_conditions,
            hasFocus:false,
            isFocus:false,
        },
        location:{
            value: initialValue?.location || "",
            isValid: !!initialValue?.location,
            hasFocus:false,
            isFocus:false,
        },
        category:{
            value: initialValue?.category || "",
            isValid: !!initialValue?.category,
            hasFocus:false,
            isFocus:false,
        },
        subscription:{
            value: initialValue?.subscription || "",
            isValid: !!initialValue?.subscription,
            hasFocus:false,
            isFocus:false,
        },
        type:{
            value: initialValue?.type || "",
            isValid: !!initialValue?.type,
            hasFocus:false,
            isFocus:false,
        },
    }

    const [courseForm, setCourseForm] = useState(initialState);

    let changeValue = (campo:string,value:string) =>{    
        let newCampo = {
            value:value,
            isValid: true,
            hasFocus: false,
            isFocus: false,
        }  

        switch (campo) {
            case 'title':   
                newCampo.hasFocus = courseForm.title.hasFocus; 
                newCampo.isFocus = courseForm.title.isFocus; 
                setCourseForm({...courseForm,title:newCampo});            
                break;
                
            case 'description':   
                newCampo.hasFocus = courseForm.description.hasFocus; 
                newCampo.isFocus = courseForm.description.isFocus; 
                setCourseForm({...courseForm,description:newCampo});                 
                break;
            
            case 'hashtags':   
                newCampo.hasFocus = courseForm.hashtags.hasFocus; 
                newCampo.isFocus = courseForm.hashtags.isFocus; 
                setCourseForm({...courseForm,hashtags:newCampo});                  
                break;
                
            case 'unenrollment_conditions':    
                newCampo.hasFocus = courseForm.unenrollment_conditions.hasFocus; 
                newCampo.isFocus = courseForm.unenrollment_conditions.isFocus; 
                setCourseForm({...courseForm,unenrollment_conditions:newCampo});                 
                break;
            
            case 'enrollment_conditions': 
                newCampo.hasFocus = courseForm.enrollment_conditions.hasFocus; 
                newCampo.isFocus = courseForm.enrollment_conditions.isFocus; 
                setCourseForm({...courseForm,enrollment_conditions:newCampo});                   
                break;
            
            case 'location':
                newCampo.hasFocus = courseForm.location.hasFocus; 
                newCampo.isFocus = courseForm.location.isFocus; 
                setCourseForm({...courseForm,location:newCampo});                      
                break;
            
            case 'category':
                newCampo.hasFocus = courseForm.category.hasFocus; 
                newCampo.isFocus = courseForm.category.isFocus; 
                setCourseForm({...courseForm,category:newCampo});                      
                break;
            
            case 'subscription':
                newCampo.hasFocus = courseForm.subscription.hasFocus; 
                newCampo.isFocus = courseForm.subscription.isFocus; 
                setCourseForm({...courseForm,subscription:newCampo});                      
                break;
            
            case 'type':
                newCampo.hasFocus = courseForm.type.hasFocus; 
                newCampo.isFocus = courseForm.type.isFocus; 
                setCourseForm({...courseForm,type:newCampo});                      
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
                newCampo.value = courseForm.title.value; 
                newCampo.isValid = courseForm.title.isValid; 
                setCourseForm({...courseForm,title:newCampo});            
                break;
                
            case 'description':   
                newCampo.value = courseForm.description.value; 
                newCampo.isValid = courseForm.description.isValid; 
                setCourseForm({...courseForm,description:newCampo});                 
                break;
            
            case 'hashtags':   
                newCampo.value = courseForm.hashtags.value; 
                newCampo.isValid = courseForm.hashtags.isValid; 
                setCourseForm({...courseForm,hashtags:newCampo});                  
                break;
                
            case 'unenrollment_conditions':    
                newCampo.value = courseForm.unenrollment_conditions.value; 
                newCampo.isValid = courseForm.unenrollment_conditions.isValid; 
                setCourseForm({...courseForm,unenrollment_conditions:newCampo});                 
                break;
            
            case 'enrollment_conditions': 
                newCampo.value = courseForm.enrollment_conditions.value; 
                newCampo.isValid = courseForm.enrollment_conditions.isValid; 
                setCourseForm({...courseForm,enrollment_conditions:newCampo});                   
                break;
            
            case 'location':
                newCampo.value = courseForm.location.value; 
                newCampo.isValid = courseForm.location.isValid; 
                setCourseForm({...courseForm,location:newCampo});                      
                break;
        }
    }
    let errorSubmit= ()=>{
        let newCourseForm = {...courseForm}
        newCourseForm.title.hasFocus=true
        newCourseForm.description.hasFocus=true
        newCourseForm.hashtags.hasFocus=true
        newCourseForm.unenrollment_conditions.hasFocus=true
        newCourseForm.enrollment_conditions.hasFocus=true
        newCourseForm.location.hasFocus=true
        setCourseForm(newCourseForm)
    }

    return {
        courseForm,
        changeValue,
        changeFocus,
        errorSubmit
    }
}

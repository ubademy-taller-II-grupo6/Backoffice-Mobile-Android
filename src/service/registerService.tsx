import React, { useState } from 'react'
import { opcionValidation, registerInterface, validationInterface } from '../interface/registroInterface'
import * as GoogleSignIn from 'expo-google-sign-in';
import { registerWithGoogle, registerWithGoogleWeb } from '../../firebase';

export const registerService = () => {
    let state = { user: null };
    const [userGoogle, setUserGoogle] = useState({})
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
    /*let componentDidMount=() =>{
        initAsync();
      }
    
    let initAsync = async () => {
        await GoogleSignIn.initAsync({
        });
        _syncUserWithStateAsync();
      };*/
    
      let _syncUserWithStateAsync = async (user:any) => {
        //const user:any = await GoogleSignIn.signInSilentlyAsync();
       
        // await alert('await GoogleSignIn.signInSilentlyAsync();:' );
        // await alert(user);
        /*await alert('login:' + JSON.stringify(user, null, 2));
        await alert(user.auth.idToken)
        await alert(user.auth.accessToken)*/
        let userProfile = await registerWithGoogle(user.auth.idToken,user.auth.accessToken)
         setUserGoogle({ userProfile });
        return userProfile
      };
    
      let signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        setUserGoogle({ user: null });
      };
    
      let signOutAsync2 = async () => {
        await GoogleSignIn.disconnectAsync()
        setUserGoogle({ user: null });
      };
    
      let  signInAsync = async () => {
        try {
            const data = await GoogleSignIn.signInAsync();
            // await alert('data:' + JSON.stringify(data, null, 2));
          if (data.type === 'success') {
            /*let idToken='1111'
            let accessToken='1111'
              await alert('login:' + JSON.stringify(user, null, 2));
              await alert('_syncUserWithStateAsync:' );*/
            //   await alert('signInAsync Login:' + JSON.stringify(data.user, null, 2));
            let userProfile:any =await _syncUserWithStateAsync(data.user);
            return userProfile
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
          return null
        }
      };
    
      let   onPressWithGoogle =async () => {
        let response:any = null
        if (!state.user) {
        //   signOutAsync();
        // } else {
          response= await signInAsync();
        }
        return response
      };
      let onPress2 = async () => {
          console.log("onPress2")
        //registerWithGoogle("1111111111","11111111111111")
        let cre= await registerWithGoogleWeb()
        console.log("cre")
        return cre
        setUserGoogle({ cre });
        // await alert('login:' + JSON.stringify(cre, null, 2));
      }
    return {
        register,
        changeValue,
        changeFocus,
        loader,
        setloader,
        showPassword,
        errorSubmit,
        onPressWithGoogle,
        state,
        userGoogle,
        signOutAsync,
        signOutAsync2,
        onPress2
    }
}

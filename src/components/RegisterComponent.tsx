import React, { useState } from 'react';
import { View,Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import generalStyle from '../styles/generalStyle';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from '../hooks/useForm';
import { registerInterface } from '../interface/registroInterface';
import { uiService }  from '../service/uiService';
import registroStyle from '../styles/registroStyle';
import {loginApi} from '../api/loginApi'
import { LoaderComponent } from './LoaderComponent';

export const RegisterComponent = () => {
    let initialState:registerInterface={
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

    const [loader, setloader] = useState(false)
    const {register,updateState} = useForm(initialState)

    let submitForm = async() => {
        setloader(true)
        if(register.email==""||register.lastname==""||register.profile==""
        ||register.lastname==""){
            console.log("ddd")
            setloader(false)
            uiService().alertaInformativa("","Todos los campos son Obligatorios")
            return ;
        }
        let x=null
        console.log("getMovies")
        let y = await loginApi()
        setloader(false)
        console.log(y)

        uiService().alertaInformativa("","Usted se registro con éxito")
    }

    let updatePassward=(campo:string)=>{
        let newRegister={
            show:(campo=='rePassward')?!register.rePassward.show:!register.passward.show,
            content:""
        }
        updateState(newRegister,campo)
    }

    let onchangeForm=(value:string='',campo:string)=>{
        let update:any=(campo=='rePassward'||campo=='passward')?{
            show:(campo=='rePassward')?register.rePassward.show:register.passward.show,
            content:value
        }:value
        update=(campo=='user'||campo=='email'||campo=='lastname')?value:update
        updateState(update,campo)
    }
    
    let changeProfile=(value:string)=>{
        let campo='profile'
        updateState(value,campo)
    }
    
    return (
        <View style={generalStyle.content}>
            {loader==true?<LoaderComponent/>:<View></View>}
            <View style={generalStyle.contentImgLogo}>
                <Image 
                    style={generalStyle.imgLogo}
                    source={require('../../assets/ubademyLogo.png')} />    
            </View>
            <View style={generalStyle.contentInputs}>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                            style={generalStyle.inputText}
                            placeholder='Nombre'
                            placeholderTextColor = "white"
                            onChangeText = {(text)=>onchangeForm(text,'name')}
                    /> 
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                </View>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                            style={generalStyle.inputText}
                            placeholder='Apellido'
                            placeholderTextColor = "white"
                            onChangeText = {(text)=>onchangeForm(text,'lastname')}
                    /> 
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                </View>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Correo'
                        placeholderTextColor = "white"
                        onChangeText = {(text)=>onchangeForm(text,'email')}
                        keyboardType='email-address'
                    />  
                    <Ionicons style={generalStyle.contentIcon} name="mail" size={20} />  
                </View>
                <View 
                    style={generalStyle.contentInput}
                >

                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Contraseña'
                        placeholderTextColor = "white"
                        secureTextEntry ={register.passward.show?false:true}
                        onChangeText = {(text)=>onchangeForm(text,'passward')}
                    /> 
                    <Ionicons name={register.passward.show?"eye":"eye-off"} style={generalStyle.contentIcon} size={20} 
                        onPress={()=>updatePassward('passward')}/>   

                </View>
                <Text>La contraseña debe tener una Mayuscula</Text>
                <View 
                    style={generalStyle.contentInput}
                >

                    <TextInput
                        onChangeText = {(text)=>onchangeForm(text,'rePassward')}
                        style={[generalStyle.inputText,]}
                        placeholder='re-Contraseña'
                        placeholderTextColor = "white"
                        underlineColorAndroid="transparent"
                        secureTextEntry ={register.rePassward.show?false:true}
                    />   
                    <Ionicons name={register.rePassward.show?"eye":"eye-off"} style={generalStyle.contentIcon} size={20} 
                        onPress={()=>updatePassward('rePassward')}/> 
                </View> 
                <Text>Las Contraseñas no </Text>
            </View>
            
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{submitForm()}}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE</Text>
                </TouchableOpacity>    
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>

        </View>
    )
}

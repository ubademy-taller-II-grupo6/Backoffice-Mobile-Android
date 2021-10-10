import React, { useState } from 'react'
import { View,Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import generalStyle from '../styles/generalStyle'
import { Ionicons } from '@expo/vector-icons';
import { useForm } from '../hooks/useForm';
import { registerInterface } from '../interface/registro';
export const RegisterComponent = () => {
    let initialState:registerInterface={
        user:"",
        email:"",
        passward:{
            show:false,
            content:""
        },
        rePassward:{
            show:false,
            content:""
        },
    }
    const {register,updateState} = useForm(initialState)

    let submitForm = () => {
        console.log(register)
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
        }:{}
        update=(campo=='user'||campo=='email')?value:update
        updateState(update,campo)
    }

    return (
        <View style={generalStyle.content}>
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
                            placeholder='Usuario'
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
                        placeholder='Correo'
                        placeholderTextColor = "white"
                        onChangeText = {(text)=>onchangeForm(text,'email')}
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
            </View>
            
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{submitForm()}}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE</Text>
                </TouchableOpacity>    
            </View>
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE CON FACEBOOK</Text>
                </TouchableOpacity>    
            </View>
        </View>
    )
}

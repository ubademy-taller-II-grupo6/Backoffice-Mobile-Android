import React from 'react'
import { View,Text, TextInput, TouchableOpacity,Image } from 'react-native'

import loginStyle from "../styles/loginStyle";
import generalStyle from "../styles/generalStyle";

export const Login = () => {
    return (
        <View style={generalStyle.content}>
            <View style={generalStyle.contentImgLogo}>
                <Image 
                    style={generalStyle.imgLogo}
                    source={require('../../assets/ubademyLogo.png')} />    
            </View>
            <View style={generalStyle.contentInputs}>
                <View style={generalStyle.contentInput}>
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='User'
                        placeholderTextColor = "white"
                    />
                </View>
                <View style={generalStyle.contentInput}>
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Password'
                        placeholderTextColor = "white"
                        textContentType='password'
                    /> 
                </View>    
            </View>
            
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin}>
                    <Text style={generalStyle.textBottomColor}>INICIAR SESIÓN</Text>
                </TouchableOpacity>    
            </View>
            <Text>Recuperar Contraseña</Text>
          
        </View>
    )
}

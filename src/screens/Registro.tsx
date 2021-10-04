import React from 'react'
import { View,Text, Image, TextInput, TouchableOpacity } from 'react-native'
import generalStyle from '../styles/generalStyle'

export const Registro = () => {
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
                    />     
                </View>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Correo'
                        placeholderTextColor = "white"
                    />    
                </View>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Contraseña'
                        placeholderTextColor = "white"
                    />    
                </View>
                <View 
                    style={generalStyle.contentInput}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='re-Contraseña'
                        placeholderTextColor = "white"
                    />    
                </View>   
            </View>
            
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin}>
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

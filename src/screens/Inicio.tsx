import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import inicioStyle from '../styles/inicioStyle';

export const Inicio = () => {

    let imageTop = '../assets/header.png';
    let logoApiUbademy = '../../assets/ubademyLogo.png';

    return (
        <View style={inicioStyle.content}>
            <Image
                style={inicioStyle.imgHeader}
                source= {require('../../assets/header.png') } />  
            <View style={inicioStyle.contentImgLogo}>
                <Image 
                    style={inicioStyle.imgLogo}
                    source={require('../../assets/ubademyLogo.png')} />
            </View>
            
            <View 
                style={inicioStyle.contentBottomLogin}
            >
                <TouchableOpacity 
                    style={inicioStyle.bottomLogin}
                    
                >
                        <Text style={inicioStyle.textBottomColor}>INGRESAR</Text>
                </TouchableOpacity>    
            </View>
            <Text style={inicioStyle.recuperarContraseña}>Recuperar contraseña</Text>
            <View 
                style={inicioStyle.registrarContent}
            >
                <Text>¿No tienes cuenta?</Text>
                <Text 
                    style={inicioStyle.registrar}
                > Registrate</Text>    
            </View>   
            {/* <View 
                style={inicioStyle.contentBottomLogin}
            >
                <TouchableOpacity 
                    style={inicioStyle.bottomLogin}
                    
                >
                        <Text style={inicioStyle.textBottomColor}>LOGUIN</Text>
                </TouchableOpacity>    
            </View>
            <View 
                style={inicioStyle.recuperarContent}
            >
                <Text style={inicioStyle.recuperarContraseña}>Recuperar contraseña</Text>    
            </View>
            <View 
                style={inicioStyle.registrarContent}
            >
                <Text>¿No tienes cuenta?</Text>
                <Text 
                    style={inicioStyle.registrar}
                > Registrate</Text>    
            </View>
            <View>
                
            </View> */}
        </View> 
    )
}

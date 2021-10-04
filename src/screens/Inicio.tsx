import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import generalStyle from '../styles/generalStyle';
import inicioStyle from '../styles/inicioStyle';

interface Props extends NativeStackScreenProps<any,any>{};

export const Inicio = ({navigation}:Props) => {

    let imageTop = '../assets/header.png';
    let logoApiUbademy = '../../assets/ubademyLogo.png';

    return (
            <View style={generalStyle.content}>
                <Image
                    style={inicioStyle.imgHeader}
                    source= {require('../../assets/header.png') } />  
                <View style={generalStyle.contentImgLogo}>
                    <Image 
                        style={generalStyle.imgLogo}
                        source={require('../../assets/ubademyLogo.png')} />
                </View>
                
                <View 
                    style={generalStyle.contentBottomLogin}
                >
                    <TouchableOpacity 
                        style={generalStyle.bottomLogin}
                        onPress={()=>navigation.navigate('Login')}
                    >
                            <Text style={generalStyle.textBottomColor}>INGRESAR</Text>
                    </TouchableOpacity>    
                </View>
                <Text style={inicioStyle.recuperarContraseña}>Recuperar contraseña</Text>
                <View 
                    style={inicioStyle.registrarContent}
                    
                >
                    <Text>¿No tienes cuenta?</Text>
                    <Text
                        style={inicioStyle.registrar} 
                        onPress={()=>navigation.navigate('Registro')}
                    > Registrate</Text>    
                </View>
            </View>     
        
    )
}

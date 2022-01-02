import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { notificationsApi } from '../api/notificationsApi';
import { RooteStackParams } from '../interface/navigatorLogin';
import generalStyle from '../styles/generalStyle';
import inicioStyle from '../styles/inicioStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'Inicio'>{};

export const Inicio = ({navigation}:Props) => {
    const notificationsListener = useRef()
    const responseListener = useRef()
    useEffect(() => {
        notificationsApi().startNotifications(notificationsListener,responseListener)
     }, [])
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

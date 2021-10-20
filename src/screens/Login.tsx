import React from 'react'
import { View,Text, TextInput, TouchableOpacity,Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import loginStyle from "../styles/loginStyle";
import generalStyle from "../styles/generalStyle";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { RooteStackParams } from '../interface/navigatorLogin';
interface Props extends NativeStackScreenProps<RooteStackParams,'Login'>{};

export const Login = ({navigation}:Props) => {
    return (
        <View style={generalStyle.content}>
            <View style={generalStyle.contentIconReturn}>
                <Ionicons name={"chevron-back-outline"} style={generalStyle.buttomReturn} size={20} 
                            onPress={()=>navigation.navigate('Inicio')}/>     
            </View>
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

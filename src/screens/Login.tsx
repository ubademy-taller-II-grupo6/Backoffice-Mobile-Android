import React, { useContext } from 'react'
import { View,Text, TextInput, TouchableOpacity,Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import loginStyle from "../styles/loginStyle";
import generalStyle from "../styles/generalStyle";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { RooteStackParams } from '../interface/navigatorLogin';
import { loginService } from '../service/loginService';
import registroStyle from '../styles/registroStyle';
import { uiService } from '../service/uiService';
import { loginApi } from '../api/loginApi';
import { LoaderComponent } from '../components/LoaderComponent';
import { AuthContext } from '../context/AuthContext';
interface Props extends NativeStackScreenProps<RooteStackParams,'Login'>{};


export const Login = ({navigation}:Props) => {
    const authContext = useContext(AuthContext)
    const { showPassword,login,changeValue,changeFocus,setloader,errorSubmit,loader} = loginService()
    let submitForm = async() => {
        setloader(true)
        if(!login.email.isValid||!login.password.isValid){
            uiService().alertaInformativa("","Usted se registro con éxito")
            console.log("error")
            errorSubmit()
            setloader(false)
            return ;
        }
        let data = await loginApi()
        setloader(false)
        authContext.signIn({
            isLoggedIn:true,
            username:"Rogger Paredes",
            email:"rparedes@gmail.com",
            potho:"string",
            token:"string"
        })
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
                <View style={[(login.email.isFocus&&login.email.isValid)?generalStyle.inputFocus:
                        ((login.email.isFocus&&!login.email.isValid)
                        ||(login.email.hasFocus&&!login.email.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='User'
                        placeholderTextColor = "white"
                        onChangeText={(text)=>{
                            changeValue('email',text)
                        }}
                        onFocus={()=>{
                            changeFocus('email',true)
                        }}
                        onBlur={()=>{
                            changeFocus('email',false)
                        }}
                    />
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                </View>
                <View style={[(login.password.isFocus&&login.password.isValid)?generalStyle.inputFocus:
                        ((login.password.isFocus&&!login.password.isValid)
                        ||(login.password.hasFocus&&!login.password.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Password'
                        placeholderTextColor = "white"
                        textContentType='password'
                        secureTextEntry ={login.password.show?false:true}
                        onChangeText={(text)=>{
                            changeValue('password',text)
                        }}
                        onFocus={()=>{
                            changeFocus('password',true)
                        }}
                        onBlur={()=>{
                            changeFocus('password',false)
                        }}
                    /> 
                    <Ionicons name={login.password.show?"eye":"eye-off"} style={generalStyle.contentIcon} size={20} 
                        onPress={()=>showPassword()}/> 
                </View>    
            </View>
            
            <View style={generalStyle.contentBottomLogin}>
                <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{submitForm()}}>
                    <Text style={generalStyle.textBottomColor}>INICIAR SESIÓN</Text>
                </TouchableOpacity>    
            </View>
            <Text>Recuperar cantraseña</Text>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>INGRESAR CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>
        </View>
    )
}

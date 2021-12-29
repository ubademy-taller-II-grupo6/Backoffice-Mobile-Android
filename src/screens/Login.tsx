import React, { useContext } from 'react'
import { View,Text, TextInput, TouchableOpacity,Image, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import generalStyle from "../styles/generalStyle";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RooteStackParams } from '../interface/navigatorLogin';
import { loginService } from '../service/loginService';
import registroStyle from '../styles/registroStyle';
import { uiService } from '../service/uiService';
import { loginApi } from '../api/loginApi';
import { LoaderComponent } from '../components/LoaderComponent';
import { AuthContext } from '../context/AuthContext';
import { registerService } from '../service/registerService';
import { LoderContext } from '../context/LoderContext';
import { useEffect } from 'react';
import { localStorage } from '../localStorage/localStorage';
import { userProfileInterface } from '../interface/userInterface';
import { userApi } from '../api/userApi';
interface Props extends NativeStackScreenProps<RooteStackParams,'Login'>{};

let letra = ""
export const Login = ({navigation}:Props) => {
    const authContext = useContext(AuthContext)
    const loderContext = useContext(LoderContext)
    const { showPassword,login,changeValue,changeFocus,setloader,errorSubmit,loader} = loginService()
    const {onPressWithGoogle} = registerService()
    let submitForm = async() => {
        loderContext.changeStateLoder(true)
        /*if(!login.email.isValid||!login.password.isValid){
            console.log("error")
            errorSubmit()
            loderContext.changeStateLoder(false)
            return ;
        }*/
        let {user_,profile} = await loginApi().loginWithEmailFirebase(login.email.value,login.password.value)
        console.log(profile)
        if(user_.isError){
            loderContext.changeStateLoder(false)
            uiService().alertaInformativa("",user_.message)
            return
        }

        userApi.getUserByMail(user_.user.email)
            .then((value) => {
                localStorage.save(value.id, value.name, value.lastname, value.email, value.blocked)
                .then(() => {
                    authContext.signIn({
                        isLoggedIn:true,
                        provider:"EMAIL",
                        emailVerified:user_.user.emailVerified,
                        username:"",
                        email:user_.user.email,
                        potho:"",
                        stsTokenManager:{
                            accessToken:"",
                            apiKey:"",
                            expirationTime:0,
                            refreshToken:user_.user.refreshToken,
                            uid:user_.user.uid
                        },
                        typeUser:"",
                        userProfile:value
                    });
                    loderContext.changeStateLoder(false)
                }); 
            })
               
    }
    let onPressWithGoogle_ = async() => {
        loderContext.changeStateLoder(true)
        let response = await onPressWithGoogle()
        loderContext.changeStateLoder(false)
        authContext.signIn({
            isLoggedIn:true,
            provider:"GOOGLE",
            username:response.user.displayName,
            email:response.user.email,
            potho:response.user.photoURL,
            emailVerified:response.user.emailVerified,
            stsTokenManager:{
                accessToken:response.user.stsTokenManager.accessToken,
                apiKey:response.user.apiKey,
                expirationTime:0,
                refreshToken:response.user.stsTokenManager.refreshToken,
                uid:response.user.uid
            },
            typeUser:"",
            userProfile:{
                blocked: false,
                email: "",
                id: 0,
                lastname: "",
                name: "",
            }
        })
    }

    useEffect(() => {
        loderContext.changeStateLoder(true);

        localStorage.isLoged()
            .then((value) => {
                if (value) {
                    localStorage.get()
                    .then((userLoged ) => {
                        if (userLoged)
                            authContext.signIn({
                                isLoggedIn:true,
                                provider:"EMAIL",
                                emailVerified:true,
                                username:"",
                                email:userLoged.email,
                                potho:"",
                                stsTokenManager:{
                                    accessToken:"",
                                    apiKey:"",
                                    expirationTime:0,
                                    refreshToken:"",
                                    uid:""
                                },
                                typeUser:"",
                                userProfile: userLoged
                            });

                        loderContext.changeStateLoder(false);                    
                    })
                } else {
                    loderContext.changeStateLoder(false);
                }
            });
    }, []);

    return (
        <ScrollView>
            <View style={generalStyle.content}>
                {loderContext.loderState.isLoder==true?<LoaderComponent/>:<View></View>}
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
                    <TouchableOpacity onPress={()=>onPressWithGoogle_()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                        <Text style={generalStyle.textBottomColor}>INGRESAR CON GOOGLE</Text>
                    </TouchableOpacity>    
                </View>
            </View>    
        </ScrollView>
        
    )
}

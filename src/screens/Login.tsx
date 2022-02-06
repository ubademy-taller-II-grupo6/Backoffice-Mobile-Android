import React, { useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
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
import { notificationsApi } from '../api/notificationsApi';
interface Props extends NativeStackScreenProps<RooteStackParams, 'Login'> { };

let letra = ""
export const Login = ({ navigation }: Props) => {
    const authContext = useContext(AuthContext)
    const loderContext = useContext(LoderContext)
    const { showPassword, login, changeValue, changeFocus, setloader, errorSubmit, loader } = loginService()
    const { onPressWithGoogle } = registerService()
    let submitForm = async () => {
        loderContext.changeStateLoder(true)
        /*if(!login.email.isValid||!login.password.isValid){
            console.log("error")
            errorSubmit()
            loderContext.changeStateLoder(false)
            return ;
        }*/
        let { user_, profile } = await loginApi().loginWithEmailFirebase(login.email.value, login.password.value)
        if (user_.isError) {
            loderContext.changeStateLoder(false)
            uiService().alertaInformativa("", user_.message)
            return
        }
        //notificationsApi().setTokenInFirebaseWithId('notificationsUsers',)
        //console.log(user_.user.email)
        userApi.getUserByMail(user_.user.email)
            .then((value) => {
                //console.log("value")
                //console.log(value)
                let newStatus = {
                    id: value.id,
                    name: value.name,
                    lastname: value.lastname,
                    email: value.email,
                    latitude: user_.user.uid,
                    longitude: value.longitude,
                    blocked: value.blocked,
                    subscription: value.subscription
                }
                console.log(newStatus)
                userApi.updateUser(newStatus)
                localStorage.save(value.id, value.name, value.lastname, value.email, value.blocked, value.subscription)
                    .then(() => {
                        authContext.signIn({
                            isLoggedIn: true,
                            provider: "EMAIL",
                            emailVerified: user_.user.emailVerified,
                            username: "",
                            email: user_.user.email,
                            potho: "",
                            stsTokenManager: {
                                accessToken: "",
                                apiKey: "",
                                expirationTime: 0,
                                refreshToken: user_.user.refreshToken,
                                uid: user_.user.uid
                            },
                            typeUser: "",
                            userProfile: value
                        });
                        loderContext.changeStateLoder(false)
                    });
            })
        let data: any = {
            token: await notificationsApi().getToken()
        }
        notificationsApi().setTokenInFirebaseWithId('notificationsUsers', data, user_.user.uid)
    }
    let onPressWithGoogle_ = async () => {
        loderContext.changeStateLoder(true)
        let response = await onPressWithGoogle()
        let users = await userApi.getAllUser()
        let newId = await userApi.getNewId(users)
        let displayName = response.user.displayName
        if (!response) return
        let newUser = {
            "id": newId,
            "name": displayName,
            "lastname": "",
            "email": response.user.email,
            "latitude": "",
            "longitude": "",
            "blocked": false,
            "subscription": "FREE"
        }
        let body = {
            "id": newId,
            "name": displayName,
            "lastname": "None",
            "email": response.user.email,
            "latitude": response.user.uid,
            "longitude": ""
        }
        await alert('body:' + JSON.stringify(body));
        let register = await userApi.registerUser(body)
        // await alert('register:' + JSON.stringify(register));
        let response2 = await userApi.getUserByMail(response.user.email)

        newUser = {
            "id": newId,
            "name": response2.name,
            "lastname": response2.lastname,
            "email": response2.email,
            "latitude": response.user.uid,
            "longitude": response2.longitude,
            "blocked": response2.blocked,
            "subscription": response2.subscription
        }
        // alert('onPressWithGoogle_ response:' + JSON.stringify(response2, null, 2));
        authContext.signIn({
            isLoggedIn: true,
            provider: "GOOGLE",
            emailVerified: response.user.emailVerified,
            username: response.user.username,
            email: response.user.email,
            potho: "",
            stsTokenManager: {
                accessToken: response.user.toJSON().stsTokenManager.accessToken,
                apiKey: response.user.apiKey,
                expirationTime: 0,
                refreshToken: response.user.toJSON().stsTokenManager.refreshToken,
                uid: response.user.uid
            },
            typeUser: "none",
            userProfile: newUser
        });
        let data: any = {
            token: notificationsApi().getToken()
        }
        notificationsApi().setTokenInFirebaseWithId('notificationsUsers', data, response.user.uid)
        loderContext.changeStateLoder(false)
    }

    useEffect(() => {
        loderContext.changeStateLoder(true);

        localStorage.isLoged()
            .then((value) => {
                if (value) {
                    localStorage.get()
                        .then((userLoged) => {
                            if (userLoged)
                                authContext.signIn({
                                    isLoggedIn: true,
                                    provider: "EMAIL",
                                    emailVerified: true,
                                    username: "",
                                    email: userLoged.email,
                                    potho: "",
                                    stsTokenManager: {
                                        accessToken: "",
                                        apiKey: "",
                                        expirationTime: 0,
                                        refreshToken: "",
                                        uid: ""
                                    },
                                    typeUser: "none",
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
                {loderContext.loderState.isLoder == true ? <LoaderComponent /> : <View></View>}
                <View style={generalStyle.contentImgLogo}>
                    <Image
                        style={generalStyle.imgLogo}
                        source={require('../../assets/ubademyLogo.png')} />
                </View>
                <View style={generalStyle.contentInputs}>
                    <View style={[(login.email.isFocus && login.email.isValid) ? generalStyle.inputFocus :
                        ((login.email.isFocus && !login.email.isValid)
                            || (login.email.hasFocus && !login.email.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='User'
                            placeholderTextColor="white"
                            onChangeText={(text) => {
                                changeValue('email', text)
                            }}
                            onFocus={() => {
                                changeFocus('email', true)
                            }}
                            onBlur={() => {
                                changeFocus('email', false)
                            }}
                        />
                        <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />
                    </View>
                    <View style={[(login.password.isFocus && login.password.isValid) ? generalStyle.inputFocus :
                        ((login.password.isFocus && !login.password.isValid)
                            || (login.password.hasFocus && !login.password.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Password'
                            placeholderTextColor="white"
                            textContentType='password'
                            secureTextEntry={login.password.show ? false : true}
                            onChangeText={(text) => {
                                changeValue('password', text)
                            }}
                            onFocus={() => {
                                changeFocus('password', true)
                            }}
                            onBlur={() => {
                                changeFocus('password', false)
                            }}
                        />
                        <Ionicons name={login.password.show ? "eye" : "eye-off"} style={generalStyle.contentIcon} size={20}
                            onPress={() => showPassword()} />
                    </View>
                </View>

                <View style={generalStyle.contentBottomLogin}>
                    <TouchableOpacity style={generalStyle.bottomLogin} onPress={() => { submitForm() }}>
                        <Text style={generalStyle.textBottomColor}>INICIAR SESIÓN</Text>
                    </TouchableOpacity>
                </View>
                <Text>Recuperar cantraseña</Text>

                <View style={generalStyle.contentBottomLogin} >
                    <TouchableOpacity onPress={() => onPressWithGoogle_()} style={[generalStyle.bottomLogin, registroStyle.google]}>
                        <Text style={generalStyle.textBottomColor}>INGRESAR CON GOOGLE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}

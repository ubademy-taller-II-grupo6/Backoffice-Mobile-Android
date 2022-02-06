import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import generalStyle from '../styles/generalStyle';
import { Ionicons } from '@expo/vector-icons';
import { registerService } from '../service/registerService';
import { uiService } from '../service/uiService';
import registroStyle from '../styles/registroStyle';
import { loginApi } from '../api/loginApi'
import { LoaderComponent } from './LoaderComponent';
import Checkbox from 'expo-checkbox';
import { signInAsync2 } from '../../firebase';
import { LoderContext } from '../context/LoderContext';
import { AuthContext } from '../context/AuthContext';
import { notificationsApi } from '../api/notificationsApi';
import { userApi } from '../api/userApi';

export const RegisterComponent = () => {
    //const [x, setx] = useState({})
    const loderContext = useContext(LoderContext)
    const authContext = useContext(AuthContext)
    const { register, changeValue, changeFocus, showPassword, errorSubmit,
        onPressWithGoogle, state, signOutAsync, signOutAsync2, userGoogle } = registerService()
    let onPressWithGoogle_ = async () => {
        loderContext.changeStateLoder(true)
        let response = await onPressWithGoogle()
        let users = await userApi.getAllUser()
        let newId = await userApi.getNewId(users)
        let displayName = response.user.displayName
        if(!response) return 
        let newUser = {
            "id": newId,
            "name":displayName,
            "lastname": "",
            "email":response.user.email,
            "latitude": "",
            "longitude": "",
            "blocked": false,
            "subscription": "FREE"
        }
        let body = {
            "id": newId,
            "name": displayName,
            "lastname": "None",
            "email":response.user.email,
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
            "latitude": response2.latitude,
            "longitude": response2.longitude,
            "blocked": response2.blocked,
            "subscription": response2.subscription
        }
        // alert('onPressWithGoogle_ response:' + JSON.stringify(response2, null, 2));
        authContext.signIn({
            isLoggedIn:true,
            provider:"GOOGLE",
            emailVerified:response.user.emailVerified,
            username:response.user.username,
            email:response.user.email,
            potho:"",
            stsTokenManager:{
                accessToken: response.user.toJSON().stsTokenManager.accessToken,
                apiKey: response.user.apiKey,
                expirationTime: 0,
                refreshToken: response.user.toJSON().stsTokenManager.refreshToken,
                uid: response.user.uid
            },
            typeUser:"none",
            userProfile:newUser
        });
        let data: any = {
            token: notificationsApi().getToken()
        }
        notificationsApi().setTokenInFirebaseWithId('notificationsUsers', data, response.user.uid)
        loderContext.changeStateLoder(false)
    }
    let submitForm = async () => {
        loderContext.changeStateLoder(true)
        if (!register.email.isValid || !register.name.isValid || !register.lastname.isValid
            || !register.password.isValid || !register.rePassword.isValid) {
            errorSubmit()
            loderContext.changeStateLoder(false)
            return;
        }
        let users = await userApi.getAllUser()
        let newId = await userApi.getNewId(users)
        let response = await loginApi().registerWithEmailFirebase(register.email.value, register.rePassword.value)
        if(!response) return 
        let newUser = {
            "id": newId,
            "name": register.name.value,
            "lastname": register.lastname.value,
            "email": register.email.value,
            "latitude": "",
            "longitude": "",
            "blocked": false,
            "subscription": "FREE"
        }
        let body = {
            "id": newId,
            "name": register.name.value,
            "lastname": register.lastname.value,
            "email": register.email.value,
            "latitude": response.user.uid,
            "longitude": ""
        }
        let response2 = await userApi.registerUser(body)
        console.log(response2)
        if (response2.message != "El usuario se creó con éxito") {
            alert('Hubo problemas en registro');
            return
        }
        authContext.signIn({
            isLoggedIn:true,
            provider:"EMAIL",
            emailVerified:response.user.emailVerified,
            username:"",
            email:response.user.email,
            potho:"",
            stsTokenManager:{
                accessToken:"",
                apiKey:"",
                expirationTime:0,
                refreshToken:response.user.refreshToken,
                uid:response.user.uid
            },
            typeUser:"none",
            userProfile:newUser
        });
        let data: any = {
            token: notificationsApi().getToken()
        }
        notificationsApi().setTokenInFirebaseWithId('notificationsUsers', data, response.user.uid)
        loderContext.changeStateLoder(false)
    }

    return (
        <View style={generalStyle.content}>
            {loderContext.loderState.isLoder == true ? <LoaderComponent /> : <View></View>}
            <View style={generalStyle.contentImgLogo}>
                <Image
                    style={generalStyle.imgLogo}
                    source={require('../../assets/ubademyLogo.png')} />
            </View>
            <View style={generalStyle.contentInputs}>
                <View style={[(register.name.isFocus && register.name.isValid) ? generalStyle.inputFocus :
                    ((register.name.isFocus && !register.name.isValid)
                        || (register.name.hasFocus && !register.name.isValid))
                        ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}>
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Nombre'
                        placeholderTextColor="white"
                        onFocus={() => {
                            changeFocus('name', true)
                        }}
                        onChangeText={(text) => {
                            changeValue('name', text)
                        }}
                        onBlur={() => {
                            changeFocus('name', false)
                        }}
                    />
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />
                </View>
                <View
                    style={[(register.lastname.isFocus && register.lastname.isValid) ? generalStyle.inputFocus :
                        ((register.lastname.isFocus && !register.lastname.isValid)
                            || (register.lastname.hasFocus && !register.lastname.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Apellido'
                        placeholderTextColor="white"
                        onFocus={() => {
                            changeFocus('lastname', true)
                        }}
                        onChangeText={(text) => {
                            changeValue('lastname', text)
                        }}
                        onBlur={() => {
                            changeFocus('lastname', false)
                        }}
                    />
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />
                </View>
                <View
                    style={[(register.email.isFocus && register.email.isValid) ? generalStyle.inputFocus :
                        ((register.email.isFocus && !register.email.isValid)
                            || (register.email.hasFocus && !register.email.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Correo'
                        placeholderTextColor="white"
                        onFocus={() => {
                            changeFocus('email', true)
                        }}
                        onChangeText={(text) => {
                            changeValue('email', text)
                        }}
                        onBlur={() => {
                            changeFocus('email', false)
                        }}
                        keyboardType='email-address'
                    />
                    <Ionicons style={generalStyle.contentIcon} name="mail" size={20} />
                </View>
                <View
                    style={[(register.password.isFocus && register.password.isValid) ? generalStyle.inputFocus :
                        ((register.password.isFocus && !register.password.isValid)
                            || (register.password.hasFocus && !register.password.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Contraseña'
                        placeholderTextColor="white"
                        secureTextEntry={register.password.show ? false : true}
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
                    <Ionicons name={register.password.show ? "eye" : "eye-off"} style={generalStyle.contentIcon} size={20}
                        onPress={() => showPassword('password')} />

                </View>
                <View
                    style={[(register.rePassword.isFocus && register.rePassword.isValid) ? generalStyle.inputFocus :
                        ((register.rePassword.isFocus && !register.rePassword.isValid)
                            || (register.rePassword.hasFocus && !register.rePassword.isValid))
                            ? generalStyle.inputFocusError : generalStyle.contentInput, generalStyle.contentInput]}
                >
                    <TextInput
                        style={[generalStyle.inputText,]}
                        placeholder='re-Contraseña'
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent"
                        secureTextEntry={register.rePassword.show ? false : true}
                        onChangeText={(text) => {
                            changeValue('rePassword', text)
                        }}
                        onFocus={() => {
                            changeFocus('rePassword', true)
                        }}
                        onBlur={() => {
                            changeFocus('rePassword', false)
                        }}
                    />
                    <Ionicons name={register.rePassword.show ? "eye" : "eye-off"} style={generalStyle.contentIcon} size={20}
                        onPress={() => showPassword('rePassword')} />
                </View>
                <View style={[registroStyle.contentChexboxes]}>
                    <View>
                        <Checkbox
                            value={register.password.isValid}
                            disabled={true}
                            color={(register.password.hasFocus && register.password.isValid) ? 'green' :
                                (register.password.hasFocus && !register.password.isValid) ? 'red' : 'black'}
                        />
                    </View>
                    <View style={registroStyle.ss}>
                        <Text style={registroStyle.conditionPassword}>La contraseña debe tener Mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial</Text>
                    </View>


                </View>
            </View>
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin} onPress={() => { submitForm() }}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE</Text>
                </TouchableOpacity>
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={() => onPressWithGoogle_()} style={[generalStyle.bottomLogin, registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>CONTINUAR CON GOOGLE</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={() => signOutAsync()} style={[generalStyle.bottomLogin, registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>desploguearse 1 CON GOOGLE</Text>
                </TouchableOpacity>
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={() => signOutAsync2()} style={[generalStyle.bottomLogin, registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>desploguearse 2 CON GOOGLE</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}
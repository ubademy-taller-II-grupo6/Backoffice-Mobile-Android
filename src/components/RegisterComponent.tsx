import React from 'react';
import { View,Text, Image,TextInput, TouchableOpacity} from 'react-native';
import generalStyle from '../styles/generalStyle';
import { Ionicons } from '@expo/vector-icons';
import { registerService } from '../service/registerService';
import { uiService }  from '../service/uiService';
import registroStyle from '../styles/registroStyle';
import {loginApi} from '../api/loginApi'
import { LoaderComponent } from './LoaderComponent';
import Checkbox from 'expo-checkbox';
import { signInAsync2 } from '../../firebase';

export const RegisterComponent = () => {

    const {register,changeValue,changeFocus,loader,setloader,showPassword,errorSubmit,onPress,state,signOutAsync,signOutAsync2,userGoogle,onPress2} = registerService()
    let submitForm = async() => {
        console.log("dss")
        setloader(true)
        /*if(!register.email.isValid||!register.name.isValid||!register.lastname.isValid||!register.password.isValid||!register.rePassword.isValid){
            errorSubmit()
            setloader(false)
            return ;
        }
        let x=null
        let y = await loginApi()*/
        let y = await loginApi()
        setloader(false)
        uiService().alertaInformativa("","Usted se registro con éxito")
    }
    return (
        <View style={generalStyle.content}>
            {loader==true?<LoaderComponent/>:<View></View>}
            <View style={generalStyle.contentImgLogo}>
                <Image 
                    style={generalStyle.imgLogo}
                    source={require('../../assets/ubademyLogo.png')} />    
            </View> 
            <View  style={generalStyle.contentInputs}>
                <View style={[(register.name.isFocus&&register.name.isValid)?generalStyle.inputFocus:
                            ((register.name.isFocus&&!register.name.isValid)
                            ||(register.name.hasFocus&&!register.name.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                    <TextInput
                       style={generalStyle.inputText}
                        placeholder='Nombre'
                        placeholderTextColor = "white"
                        onFocus={()=>{
                            changeFocus('name',true)
                        }}
                        onChangeText={(text)=>{
                            changeValue('name',text)
                        }}
                        onBlur={()=>{
                            changeFocus('name',false)
                        }}
                    /> 
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                </View>
                <View 
                    style={[(register.lastname.isFocus&&register.lastname.isValid)?generalStyle.inputFocus:
                        ((register.lastname.isFocus&&!register.lastname.isValid)
                        ||(register.lastname.hasFocus&&!register.lastname.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}
                >
                    <TextInput
                            style={generalStyle.inputText}
                            placeholder='Apellido'
                            placeholderTextColor = "white"
                            onFocus={()=>{
                                changeFocus('lastname',true)
                            }}
                            onChangeText={(text)=>{
                                changeValue('lastname',text)
                            }}
                            onBlur={()=>{
                                changeFocus('lastname',false)
                            }}
                    /> 
                    <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                </View>
                <View 
                    style={[(register.email.isFocus&&register.email.isValid)?generalStyle.inputFocus:
                        ((register.email.isFocus&&!register.email.isValid)
                        ||(register.email.hasFocus&&!register.email.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Correo'
                        placeholderTextColor = "white"
                        onFocus={()=>{
                            changeFocus('email',true)
                        }}
                        onChangeText={(text)=>{
                            changeValue('email',text)
                        }}
                        onBlur={()=>{
                            changeFocus('email',false)
                        }}
                        keyboardType='email-address'
                    />  
                    <Ionicons style={generalStyle.contentIcon} name="mail" size={20} />  
                </View>
                <View 
                    style={[(register.password.isFocus&&register.password.isValid)?generalStyle.inputFocus:
                        ((register.password.isFocus&&!register.password.isValid)
                        ||(register.password.hasFocus&&!register.password.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}
                >
                    <TextInput
                        style={generalStyle.inputText}
                        placeholder='Contraseña'
                        placeholderTextColor = "white"
                        secureTextEntry ={register.password.show?false:true}
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
                    <Ionicons name={register.password.show?"eye":"eye-off"} style={generalStyle.contentIcon} size={20} 
                        onPress={()=>showPassword('password')}/>   

                </View>
                <View 
                    style={[(register.rePassword.isFocus&&register.rePassword.isValid)?generalStyle.inputFocus:
                        ((register.rePassword.isFocus&&!register.rePassword.isValid)
                        ||(register.rePassword.hasFocus&&!register.rePassword.isValid))
                        ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}
                >
                    <TextInput
                        style={[generalStyle.inputText,]}
                        placeholder='re-Contraseña'
                        placeholderTextColor = "white"
                        underlineColorAndroid="transparent"
                        secureTextEntry ={register.rePassword.show?false:true}
                        onChangeText={(text)=>{
                            changeValue('rePassword',text)
                        }}
                        onFocus={()=>{
                            changeFocus('rePassword',true)
                        }}
                        onBlur={()=>{
                            changeFocus('rePassword',false)
                        }}
                    />   
                    <Ionicons name={register.rePassword.show?"eye":"eye-off"} style={generalStyle.contentIcon} size={20} 
                        onPress={()=>showPassword('rePassword')}/> 
                </View>
                <View style={[registroStyle.contentChexboxes]}>
                    <View>
                    <Checkbox
                        value={register.password.isValid}
                        disabled={true}
                        color={(register.password.hasFocus&&register.password.isValid)?'green':
                        (register.password.hasFocus&&!register.password.isValid)?'red':'black'}
                    />    
                    </View>
                    <View style={registroStyle.ss}>
                    <Text style={registroStyle.conditionPassword}>La contraseña debe tener Mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial</Text>
                    </View>
                    
                    
                </View> 
            </View>
            {/* <Text>**************</Text>
            <Text>{JSON.stringify(register.password)}</Text>
            <Text>**************</Text>
            <Text>{JSON.stringify(register.rePassword)}</Text> */}
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{submitForm()}}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE</Text>
                </TouchableOpacity>    
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={()=>onPress()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={()=>onPress2()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>REGISTRARSE CON GOOGLE Web</Text>
                </TouchableOpacity>    
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={()=>signOutAsync()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>desploguearse 1 CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>

            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={()=>signOutAsync2()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>desploguearse 2 CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>
            <View style={generalStyle.contentBottomLogin} >
                <TouchableOpacity onPress={()=>signInAsync2()} style={[generalStyle.bottomLogin,registroStyle.google]}>
                    <Text style={generalStyle.textBottomColor}>sig 2 CON GOOGLE</Text>
                </TouchableOpacity>    
            </View>
            <Text>{JSON.stringify(state)}</Text>
            <Text>{JSON.stringify(userGoogle, null, 2)}</Text>
            <Text>sads</Text>
        </View>
    )
}
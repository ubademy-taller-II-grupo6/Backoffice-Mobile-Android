import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { AuthState } from '../../interface/AuthStateInterface'
import generalStyle from '../../styles/generalStyle'
import pefilStyle from '../../styles/perfilStyle'
import { Ionicons } from '@expo/vector-icons';

export const Perfil = () => {
    //let edit = false
    let initialState:any = {
        name:"",
        lastname:"",
        typeUser:"",
        userProfile:""
    }
    const authContext = useContext(AuthContext)
    const [edit, setedit] = useState(false)
    const [perfil, setstate] = useState(initialState)
    let getFirstCharacter = () => {
        return "E"//authContext.authState.userProfile.name.charAt(0).toUpperCase()
    }
    let logOut= () => {
        authContext.lognOut()
    }
    let guardarCambios = () => {
        
    }
    let editInputs = ( ) =>{
        let currentEdit = edit
        setedit(!currentEdit)
        console.log(edit)
    }
    useEffect(() => {
        let newData:any = {
            name:"Jorge",
            lastname:"Esteves",
            email:"jesteves@gmail.com",
        }
        setstate(newData)
    }, [])
    return (
        <View style={pefilStyle.contentPrincipal}>
            {!edit&&<Ionicons onPress={()=>{editInputs()}} name="create"style={pefilStyle.edit}></Ionicons>}
            {edit&&<Ionicons onPress={()=>{editInputs()}} name="close-circle"style={pefilStyle.edit}></Ionicons>}
            <View style={pefilStyle.photoUser}><Text style={pefilStyle.textCharacter}>{getFirstCharacter()}</Text></View>
            {/* <View style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Nombre: {authContext.authState.userProfile.name}</Text>
            </View> */}
            <View style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Nombre:</Text>
                <TextInput  style={pefilStyle.textInputPerfil}
                    value={perfil.name}
                    editable={edit}
                />
            </View>
            {/* <View style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Apellido: {authContext.authState.userProfile.lastname}</Text>
            </View> */}
            <View style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Apellido: </Text>
                <TextInput   style={pefilStyle.textInputPerfil}
                    value={perfil.lastname}
                    editable={edit}
                />
            </View>    
            {/* <View  style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Email: {authContext.authState.userProfile.email}</Text>
            </View> */}
            <View style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>email: </Text>
                <TextInput   style={pefilStyle.textInputPerfil}
                    value={perfil.email}
                    editable={edit}
                />
            </View> 
            {/* <View  style={pefilStyle.contentText}>
                <Text style={pefilStyle.textPerfil}>Tipo de Usuario elegido: {authContext.authState.typeUser}</Text>
            </View> */}
            {edit&&<View style={[generalStyle.contentBottomLogin,pefilStyle.space]}>
                    <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{guardarCambios()}}>
                        <Text style={generalStyle.textBottomColor}>Guardar Cambios</Text>
                    </TouchableOpacity>    
            </View>}
            <View style={[generalStyle.contentBottomLogin,pefilStyle.space]}>
                    <TouchableOpacity style={generalStyle.bottomLogin} onPress={()=>{logOut()}}>
                        <Text style={generalStyle.textBottomColor}>CERRAR SESIÓN</Text>
                    </TouchableOpacity>    
            </View>
        </View>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { AuthState } from '../../interface/AuthStateInterface'
import generalStyle from '../../styles/generalStyle'
import pefilStyle from '../../styles/perfilStyle'
import { Ionicons } from '@expo/vector-icons';
import { userProfileInterface } from '../../interface/userInterface'
import { userApi } from '../../api/userApi'
import { LoderContext } from '../../context/LoderContext'
import { LoaderComponent } from '../../components/LoaderComponent'
import { localStorage } from '../../localStorage/localStorage';

export const Perfil = () => {
    
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext)
    const [edit, setedit] = useState(false)
    const [perfil, setPerfil] = useState<userProfileInterface>()
    let getFirstCharacter = () => {
        return authContext.authState.userProfile.name.charAt(0).toUpperCase() ?? "-";
    }
    let logOut= () => {
        localStorage.remove().then(() => authContext.lognOut());        
    }
    let guardarCambios = () => {

        if (perfil) {
            loaderContext.changeStateLoder(true);
            userApi.updateUser(perfil)
                .then(() => {
                    setedit(false);
                    loaderContext.changeStateLoder(false);
                });
        }
    }
    let editInputs = ( ) =>{
        let currentEdit = edit
        setedit(!currentEdit)
        console.log(edit)
    }
    useEffect(() => {
        loaderContext.changeStateLoder(true);
        userApi.getUserById(authContext.authState.userProfile.id)
            .then((user) => {
                if (user) setPerfil(user);
                loaderContext.changeStateLoder(false);
            })
    }, [])
    return (
        <View style={pefilStyle.contentPrincipal}>
        {loaderContext.loderState.isLoder && <LoaderComponent/>}
            {
                perfil && <>
                    {!edit&&<Ionicons onPress={()=>{editInputs()}} name="create"style={pefilStyle.edit}></Ionicons>}
                    {edit&&<Ionicons onPress={()=>{editInputs()}} name="close-circle"style={pefilStyle.edit}></Ionicons>}
                    <View style={pefilStyle.photoUser}><Text style={pefilStyle.textCharacter}>{getFirstCharacter()}</Text></View>
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Nombre:</Text>
                        <TextInput  style={pefilStyle.textInputPerfil}
                            value={perfil.name}
                            editable={edit}
                            onChangeText={(text)=>{
                                setPerfil({
                                    ...perfil,
                                    name: text
                                })
                            }}
                        />
                    </View>
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Apellido: </Text>
                        <TextInput   style={pefilStyle.textInputPerfil}
                            value={perfil.lastname}
                            editable={edit}
                            onChangeText={(text)=>{
                                setPerfil({
                                    ...perfil,
                                    lastname: text
                                })
                            }}
                        />
                    </View>    
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Email: </Text>
                        <TextInput   style={pefilStyle.textInputPerfil}
                            value={perfil.email}
                            editable={false}
                        />
                    </View>  
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Subscripción: </Text>
                        <TextInput style={pefilStyle.textInputPerfil}
                            value={perfil.subscription}
                            editable={false}
                        />
                    </View> 
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
                </>
            }

        </View>
    )
}

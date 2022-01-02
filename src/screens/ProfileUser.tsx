import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { AuthState } from '../interface/AuthStateInterface'
import generalStyle from '../styles/generalStyle'
import pefilStyle from '../styles/perfilStyle'
import { Ionicons } from '@expo/vector-icons';
import { userProfileInterface } from '../interface/userInterface'
import { userApi } from '../api/userApi'
import { LoderContext } from '../context/LoderContext'
import { LoaderComponent } from '../components/LoaderComponent'
import { localStorage } from '../localStorage/localStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RooteStackParams } from '../interface/navigatorLogin'
import { useRoute } from '@react-navigation/native'

interface ProfileUserProps extends NativeStackScreenProps<RooteStackParams,'ProfileUser'>{
    idUser: number
};

export const ProfileUser = () => {
    const route = useRoute();
    const props = route.params as ProfileUserProps;
    
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext)
    
    const [profileUser, setProfileUser] = useState<userProfileInterface>();

    let getFirstCharacter = () => {
        return profileUser?.name.charAt(0).toUpperCase() ?? "-";
    }

    let getUserInfo = ( ) =>{
        loaderContext.changeStateLoder(true);
        userApi.getUserById(props.idUser)
            .then((user) => {
                if (user) setProfileUser(user);
                loaderContext.changeStateLoder(false);
            })
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View style={pefilStyle.contentPrincipal}>
            { loaderContext.loderState.isLoder && <LoaderComponent/> }
            
            {
                profileUser && <>
                
                    <View style={pefilStyle.photoUser}><Text style={pefilStyle.textCharacter}>{getFirstCharacter()}</Text></View>
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Nombre:</Text>
                        <TextInput  style={pefilStyle.textInputPerfil}
                            value={profileUser.name}
                        />
                    </View>
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Apellido: </Text>
                        <TextInput   style={pefilStyle.textInputPerfil}
                            value={profileUser.lastname}
                        />
                    </View>    
                    <View style={pefilStyle.contentText}>
                        <Text style={pefilStyle.textPerfil}>Email: </Text>
                        <TextInput   style={pefilStyle.textInputPerfil}
                            value={profileUser.email}
                        />
                    </View>  
                </>
            }

        </View>
    )
}

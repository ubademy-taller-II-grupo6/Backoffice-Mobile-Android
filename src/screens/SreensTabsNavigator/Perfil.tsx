import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import pefilStyle from '../../styles/perfilStyle'

export const Perfil = () => {
    const authContext = useContext(AuthContext)
    let getFirstCharacter = () => {
        return authContext.authState.userProfile.name.charAt(0)
    }
    return (
        <View style={pefilStyle.contentPrincipal}>
            <View style={pefilStyle.photoUser}><Text>{getFirstCharacter()}</Text></View>
            <Text>{authContext.authState.userProfile.name}</Text>
            <Text>{authContext.authState.userProfile.lastname}</Text>
            <Text>{authContext.authState.userProfile.email}</Text>
            <Text>{authContext.authState.typeUser}</Text>
        </View>
    )
}

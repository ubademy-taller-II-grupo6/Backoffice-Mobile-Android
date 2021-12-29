import React, { useContext } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import typeUserStyle from '../../styles/typeUserStyle'
import { Ionicons } from '@expo/vector-icons';
import { TypesUser } from '../../interface/userInterface';

export const Home = () => {
    const authContext = useContext(AuthContext)

    return (
        <ScrollView>
        <View style={typeUserStyle.contentCards}>
            <TouchableOpacity onPress={() => { authContext.changeAuthState(TypesUser.Estudiante) }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Estudiante</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../../assets/typeUser/estudiante.png')} />
                    {authContext.authState.typeUser == TypesUser.Estudiante &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }

                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { authContext.changeAuthState(TypesUser.Colaborador) }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Colaborador</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../../assets/typeUser/colaborador.png')} />
                    {authContext.authState.typeUser == TypesUser.Colaborador &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { authContext.changeAuthState(TypesUser.Profesor) }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Profesor</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../../assets/typeUser/profesor.png')} />
                    {authContext.authState.typeUser == TypesUser.Profesor &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }
                </View>
            </TouchableOpacity>
            
        </View>
        </ScrollView>
    )
}

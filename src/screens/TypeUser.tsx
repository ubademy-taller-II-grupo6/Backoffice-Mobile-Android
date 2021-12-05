import React, { useContext, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import generalStyle from '../styles/generalStyle'
import typeUserStyle from '../styles/typeUserStyle'
import { Ionicons } from '@expo/vector-icons';
import { RooteStackParams } from '../interface/navigatorLogin'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


interface Props extends NativeStackScreenProps<RooteStackParams, "Ubication"> { };
export const TypeUser = ({ navigation }: Props) => {
    const context = useContext(AuthContext)
    let initialState = {
        id: 'null'
    }
    const [typeUser, setTypeUser] = useState(initialState)
    let onPressButton = (typeUser: string) => {
        setTypeUser({ ...initialState, id: typeUser })
    }
    return (
        <View style={typeUserStyle.contentCards}>
            <TouchableOpacity onPress={() => { onPressButton('estudiante') }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Estudiante</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../assets/typeUser/estudiante.png')} />
                    {typeUser.id == 'estudiante' &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }

                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { onPressButton('colaborador') }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Colaborador</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../assets/typeUser/colaborador.png')} />
                    {typeUser.id == 'colaborador' &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { onPressButton('profesor') }}>
                <View style={typeUserStyle.cardOption}>
                    <Text style={typeUserStyle.cardText}>Profesor</Text>
                    <Image
                        style={typeUserStyle.imageCard}
                        source={require('../../assets/typeUser/profesor.png')} />
                    {typeUser.id == 'profesor' &&
                        <View style={typeUserStyle.selectButton}>
                            <Ionicons style={typeUserStyle.contentIcon} name="checkmark-sharp" size={20} />
                        </View>
                    }
                </View>
            </TouchableOpacity>
            {
                typeUser.id!='null'
                &&
                <View style={generalStyle.contentBottomLogin} >
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={[generalStyle.bottomLogin, typeUserStyle.submitButton]}>
                        <Text style={generalStyle.textBottomColor}>INGRESAR A LA HOME</Text>
                    </TouchableOpacity>
                </View>    
            }
            
        </View>
    )
}

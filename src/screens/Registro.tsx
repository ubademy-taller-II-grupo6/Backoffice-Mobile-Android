import React from 'react'
import { ScrollView, View } from 'react-native'
import { RegisterComponent } from '../components/RegisterComponent'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import generalStyle from '../styles/generalStyle';
import { RooteStackParams } from '../interface/navigatorLogin';

interface Props extends NativeStackScreenProps<RooteStackParams,'Registro'>{};

export const Registro = ({navigation}:Props) => {
    return (
        <ScrollView>
            <View style={generalStyle.contentIconReturn}>
                {/* <Ionicons name={"chevron-back-outline"} style={generalStyle.buttomReturn} size={20} 
                            onPress={()=>navigation.navigate('Inicio')}/> */}
            </View>
            <RegisterComponent/>
        </ScrollView>
    )
}

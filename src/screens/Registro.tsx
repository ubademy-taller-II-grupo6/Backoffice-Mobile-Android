import React from 'react'
import {  ActivityIndicator, Modal, ScrollView, View } from 'react-native'
import { RegisterComponent } from '../components/RegisterComponent'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import generalStyle from '../styles/generalStyle';
import { RooteStackParams } from '../interface/navigatorLogin';
import { LoaderComponent } from '../components/LoaderComponent';

interface Props extends NativeStackScreenProps<RooteStackParams,'Registro'>{};

export const Registro = ({navigation}:Props) => {
    return (
        <ScrollView>
            {/* <Modal
            animationType="slide"
            transparent={true}
            visible={true}>   
            <ActivityIndicator style={generalStyle.loader} size="small" color="#0000ff" />

            </Modal> */}
            {/* <LoaderComponent/> */}
            <View style={generalStyle.contentIconReturn}>
                <Ionicons name={"chevron-back-outline"} style={generalStyle.buttomReturn} size={20} 
                            onPress={()=>navigation.navigate('Inicio')}/>
            </View>
            <RegisterComponent/>
        </ScrollView>
    )
}

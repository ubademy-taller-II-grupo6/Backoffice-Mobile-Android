import { Picker } from '@react-native-picker/picker';
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'
import { LoderContext } from '../../context/LoderContext';
import { RooteStackParams } from '../../interface/navigatorLogin';

interface ExamNewProps extends NativeStackScreenProps<RooteStackParams,'ExamNew'>{
    idCourse: number
};

export const ExamNew = () => {
    const route = useRoute();
    const props = route.params as ExamNewProps;

    const loaderContext = useContext(LoderContext);

    useEffect(() => {
        // Lo que queres que se haga apenas muestra la pantalla
    }, []);

    return (
        <SafeAreaView>
            <View style={{marginTop: 15, width: '100%', height: '100%',}}>
                <Text>Creacion de examen</Text>
            </View>    
        </SafeAreaView>
    )
}
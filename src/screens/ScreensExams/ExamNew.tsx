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

    const [idExam, setIdExam] = useState<number>(0);
    const [idCreator, setIdCreator] = useState<number>(1);
    const [idCourse, setIdCourse] = useState<number>(props.idCourse);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        // Lo que queres que se haga apenas muestra la pantalla
    }, []);

    return (
        
        <View style={{ flex: 1, flexDirection: 'column'}}>
            <SafeAreaView>
                <Text style={{fontSize: 15,fontWeight: 'bold', color:'azure', padding:10, backgroundColor: 'paleturquoise', borderRadius: 10}} > Creación de Examen </Text>
                <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} > Ingrese el título del examen: </Text>    
                <TextInput  style={{fontSize: 10,fontWeight: 'bold', padding:10, borderWidth: 1, borderRadius: 10}} 
                            placeholder="Ingrese aqui el título" 
                            multiline={false}
                            onChangeText={(title) => setTitle(title)}/>
                <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} > Ingrese la descripción del examen: </Text>    
                <TextInput  style={{fontSize: 10,fontWeight: 'bold', padding:10, borderWidth: 1, borderRadius: 10}} 
                            placeholder="Ingrese aqui la descripción" 
                            multiline={false}
                            onChangeText={(description) => setDescription(description)}/>
                <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}></Text>            
                <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}} >
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}
                          onPress={()=> {

                            if ( title === '' || description === '' ){
            
                                alert('Los campos título y descripción son obligatorios')
                            
                            } else {
    
                                fetch('https://ubademy-exams.herokuapp.com/exams/', {
                                    method: 'POST',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'},
                                    body: JSON.stringify({
                                        idcreator: idCreator,
                                        idcourse: idCourse,
                                        title: title,
                                        description: description
                                    })

                                }).then(response => response.json()).
                                    then( responseJSON => {
                                        setIdExam(responseJSON.idexam)
                                        props.navigation.navigate('QuestionNew', { idExam: responseJSON.idexam, numQuestion: 1, navigation: props.navigation })
                                    })
                                .catch(
                                        err => {
                                            console.log(err)
                                        }
                                );
                            } 

                          }}
                          > Siguiente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}} >
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}
                        onPress={() => {
                            props.navigation.pop();
                        }}>Cancelar</Text>
                </TouchableOpacity>                        
            </SafeAreaView>
        </View>    
        );    
}
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'
import { LoderContext } from '../../context/LoderContext';
import { RooteStackParams } from '../../interface/navigatorLogin';

interface QuestionNewProps extends NativeStackScreenProps<RooteStackParams,'QuestionNew'>{
    idExam: number,
    idCourse: number,
    numQuestion: number
};

// Usa este mientras este lo otro
const idCreator : number = 3;

export const QuestionNew = () => {

    const route = useRoute();
    const props = route.params as QuestionNewProps;

    const loaderContext = useContext(LoderContext);

    const [idExam, setIdExam] = useState<number>(props.idExam);
    const [numQuestion, setNumQuestion] = useState<number>(props.numQuestion);
    const [description, setDescription] = useState<string>('');
    const [answer, setAnswer] = useState<boolean>(true);

    useEffect(() => {
        
        setDescription('')
        setAnswer(true)
    }, []);

    return (
        
        <View style={{ flex: 1, flexDirection: 'column'}}>
                <SafeAreaView>
                    <Text style={{fontSize: 15,fontWeight: 'bold', color:'azure', padding:10, backgroundColor: 'paleturquoise', borderRadius: 10}} > Creación de Examen </Text>
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} > Ingrese el enunciado: </Text>    
                    <TextInput  style={{fontSize: 10,fontWeight: 'bold', padding:10, borderWidth: 1, borderRadius: 10}} 
                                placeholder="Ingrese la descripción del enunciado" 
                                multiline={false}
                                defaultValue={description}
                                onChangeText={(description) => setDescription(description)}/>
        
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} />
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} > Seleccione la respuesta del enunciado: </Text>
                    <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}}>
                        <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}
                              onPress={ ()=> {
                                  setAnswer(true)
                              }}  >Verdadero</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}}
                                      onPress={() => {
                                          setAnswer(false)
                                      }}>
                        <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}>Falso</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 10,fontWeight: 'bold', padding:10}} />
                    <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}}
                                      onPress={() => {

                                        if (description === '' ){
            
                                            alert('El campo descripción es obligatorio')

                                        } else {

                                            fetch('https://ubademy-exams.herokuapp.com/exams/questions/', {
                                            method: 'POST',
                                            headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Origin': '*'},
                                            body: JSON.stringify({
                                                idexam: idExam,
                                                num_question: numQuestion,
                                                description: description,
                                                answer: answer
                                            })

                                        }).then(response => response.json()).
                                            then( responseJSON => {
                                                setNumQuestion(responseJSON.num_question + 1)
                                                setDescription('')
                                                setAnswer(true)
                                                props.navigation.navigate('QuestionNew', { idCourse: props.idCourse, idExam: responseJSON.idexam, numQuestion: props.numQuestion, navigation: props.navigation})
                                            }).
                                        catch(
                                                err => {
                                                    console.log(err)
                                                }
                                            );
                                        }
                                      }}>

                        <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}>Siguiente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:10, borderWidth: 1, borderRadius: 10}}
                                      onPress={()=> props.navigation.navigate('CourseDetail', {idCourse: props.idCourse, navigation: props.navigation})}>
                        <Text style={{fontSize: 10,fontWeight: 'bold', padding:10,}}>Finalizar</Text>
                    </TouchableOpacity>
                </SafeAreaView>  
            </View>    
        );    
}
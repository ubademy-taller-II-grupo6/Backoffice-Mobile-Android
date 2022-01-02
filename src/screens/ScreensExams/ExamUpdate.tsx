import React, { useContext, useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'


import { examApi } from '../../api/examApi';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { examFormService } from '../../service/examFormService';

import { LoaderComponent } from '../../components/LoaderComponent';

import { Exam, Question } from '../../interface/ExamInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';

import generalStyle from '../../styles/generalStyle';
import { QuestionNew } from './QuestionNew';

interface ExamUpdateProps extends NativeStackScreenProps<RooteStackParams,'ExamUpdate'>{
    exam: Exam,
    onSubmit: () => void
};

export const ExamUpdate = () => {
    const route = useRoute();
    const props = route.params as ExamUpdateProps;

    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState<string>();
    const { examForm, changeValue, changeFocus, errorSubmit } = examFormService(props.exam);
    
    const [exam, setExam] = useState<Exam>();

    const updateExam = () => {
        loaderContext.changeStateLoder(true);

        if (!examForm.title.isValid || !examForm.description.isValid) {
            errorSubmit();
            setError("Operación inválida: se encontraron campos faltantes");
            loaderContext.changeStateLoder(false);
            return;
        }

        let newExam : Exam = {
            title: examForm.title.value,
            description: examForm.description.value,
            id_creator: authContext.authState.userProfile.id,
            id_exam: props.exam.id_exam,
            id_course: props.exam.id_course,
            published: false
        } as Exam;
        
        examApi.updateExam(newExam)
            .then((value) => {
                loaderContext.changeStateLoder(false);
                props.onSubmit();
            });

    }

    return (
        <SafeAreaView>
            <View style={{marginTop: 15, width: '100%', height: '100%',}}>
                {loaderContext.loderState.isLoder && <LoaderComponent/> }

                {
                    !exam &&  
                        <View style={generalStyle.contentInputs}>
                            <View style={[(examForm.title.isFocus&&examForm.title.isValid)?generalStyle.inputFocus:
                                    ((examForm.title.isFocus&&!examForm.title.isValid)
                                    ||(examForm.title.hasFocus&&!examForm.title.isValid))
                                    ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                                <TextInput
                                    style={generalStyle.inputText}
                                    placeholder='Título'
                                    defaultValue={props.exam.title}
                                    placeholderTextColor = "white"
                                    onChangeText={(text)=>{
                                        setError(undefined);
                                        changeValue('title',text)
                                    }}
                                    onFocus={()=>{
                                        changeFocus('title',true)
                                    }}
                                    onBlur={()=>{
                                        changeFocus('title',false)
                                    }}
                                />  
                            </View>
                            <View style={[(examForm.description.isFocus&&examForm.description.isValid)?generalStyle.inputFocus:
                                    ((examForm.description.isFocus&&!examForm.description.isValid)
                                    ||(examForm.description.hasFocus&&!examForm.description.isValid))
                                    ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                                <TextInput
                                    style={generalStyle.inputText}
                                    placeholder='Descripción'
                                    defaultValue={props.exam.description}
                                    placeholderTextColor = "white"
                                    onChangeText={(text)=>{
                                        setError(undefined);
                                        changeValue('description',text)
                                    }}
                                    onFocus={()=>{
                                        changeFocus('description',true)
                                    }}
                                    onBlur={()=>{
                                        changeFocus('description',false)
                                    }}
                                /> 
                            </View>
                            {
                                error &&
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{color: 'red'}}>{error}</Text>
                                    </View>
                            }

                            <View style={generalStyle.contentBottomLogin}>
                                <TouchableOpacity style={generalStyle.bottomLogin} onPress={updateExam}>
                                    <Text style={generalStyle.textBottomColor}>Confirmar</Text>
                                </TouchableOpacity>    
                            </View>

                            <View style={generalStyle.contentBottomLogin}>
                                <TouchableOpacity style={[generalStyle.bottomLogin, {backgroundColor:'rgb(218,76,53)'}]} onPress={() => props.navigation.pop()}>
                                    <Text style={generalStyle.textBottomColor}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                }
            </View>    

        </SafeAreaView>
    )
}
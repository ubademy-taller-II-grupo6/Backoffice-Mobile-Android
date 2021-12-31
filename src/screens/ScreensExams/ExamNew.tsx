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

interface ExamNewProps extends NativeStackScreenProps<RooteStackParams,'ExamNew'>{
    idCourse: number,
    onSubmit: () => void
};

export const ExamNew = () => {
    const route = useRoute();
    const props = route.params as ExamNewProps;

    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState<string>();
    const { examForm, changeValue, changeFocus, errorSubmit } = examFormService();
    
    const [exam, setExam] = useState<Exam>();

    const goFormQuestions = () => {
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
            idcreator: authContext.authState.userProfile.id,
            idexam: 0,
            idcourse: props.idCourse,
            ispublished: false
        } as unknown as Exam;
        
        setExam(newExam);

        loaderContext.changeStateLoder(false);
    }

    const onCancel = () => {
        props.navigation.pop();
    }

    const createExam = async (lstQuestions: Question[]) => {
        setError(undefined);
        loaderContext.changeStateLoder(true);

        if (exam)
            examApi.createExam(exam)
                .then(async (response) => {

                    if (response.data)
                        for(let i = 0; i < lstQuestions.length; i++){
                            await examApi.createQuestion(lstQuestions[i], response.data);
                        }


                    loaderContext.changeStateLoder(false);
                    props.onSubmit();
                });
        else 
            loaderContext.changeStateLoder(false);
        

/*         props.navigation.navigate('QuestionNew', {
            idExam: 2,
            navigation: props.navigation
        }); */

/*       examApi.createExam(newExam)
        .then((value) => {
            if (value.message === "El curso se creó correctamente")
                console.log("SUMBIT");
            else {
                errorSubmit();
                setError(value.message || "Ha ocurrido un error");
            }
            loaderContext.changeStateLoder(false);
        }); */
    };

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
                                <TouchableOpacity style={generalStyle.bottomLogin} onPress={goFormQuestions}>
                                    <Text style={generalStyle.textBottomColor}>Siguiente</Text>
                                </TouchableOpacity>    
                            </View>

                            <View style={generalStyle.contentBottomLogin}>
                                <TouchableOpacity style={[generalStyle.bottomLogin, {backgroundColor:'rgb(218,76,53)'}]} onPress={() => props.navigation.pop()}>
                                    <Text style={generalStyle.textBottomColor}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                }

                {
                    exam && <QuestionNew onSubmit={createExam} onCancel={onCancel} />
                }

            </View>    

        </SafeAreaView>
    )
}
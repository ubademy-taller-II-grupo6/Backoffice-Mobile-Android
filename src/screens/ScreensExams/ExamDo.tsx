import { Picker } from '@react-native-picker/picker';
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native'
import { examApi } from '../../api/examApi';
import { AnswerComponent } from '../../components/AnswerComponent';
import { ExamComponent } from '../../components/ExamComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { QuestionComponent } from '../../components/QuestionComponent';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { Exam, Question, StatusExamStudent, StatusExamStudentWithExam } from '../../interface/ExamInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { TypesUser } from '../../interface/userInterface';
import examComponentStyle from '../../styles/examComponentStyle';
import examStyle from '../../styles/examStyle';
import generalStyle from '../../styles/generalStyle';

interface ExamDoProps extends NativeStackScreenProps<RooteStackParams,'ExamDo'>{
    exam: Exam,
    onSubmit: () => void
};

export const ExamDo = () => {
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [lstQuestions, setLstQuestions] = useState<Question[]>();
    
    const route = useRoute();
    const props = route.params as ExamDoProps;

    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;

    const getQuestions = () => {
        loaderContext.changeStateLoder(true);
        
        examApi.getQuestionsByExam(15/* props.exam.id_exam */)
        .then((values) => {
            setLstQuestions(values.data ?? []);
            loaderContext.changeStateLoder(false);
        });        
    }

    const onBackAndReload = () => {
        props.navigation.pop();
        getQuestions();
    }

    const onBack = () => {
        props.navigation.pop();
    }

    const publishedExam = () => {
        loaderContext.changeStateLoder(true);
        
        examApi.publishExam(props.exam)
        .then((values) => {
            loaderContext.changeStateLoder(false);
            props.onSubmit();
        });
    }

    const onEditQuestion = (question: Question) => {
        if (props.exam.published)
            Alert.alert(
                `Atención!`,
                `No puede editar la pregunta porque el examen ya se encuentra publicado`,
                [
                    {
                        text: "Cancelar",
                        onPress: () => {},
                        style: "cancel"
                    }
                ]
            );
        else
            props.navigation.navigate('QuestionUpdate', { question: question, onSubmit: onBackAndReload, onCancel: onBack });
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={loaderContext.loderState.isLoder}
                    onRefresh={getQuestions}
                />
                }
            >    

                { loaderContext.loderState.isLoder && <LoaderComponent/>}    

                <View style={{marginTop: 15}}>
                    <View style={{marginLeft: 15}}>
                        <Text style={examComponentStyle.titleExam}>
                            {props.exam.title}
                        </Text>
                        <Text style={examComponentStyle.colorDescription}>
                            {props.exam.description}
                        </Text>
                    </View>
                    {
                        lstQuestions?.length == 0 && 
                            <View style={{marginTop: 15}}>
                                <View style={{marginLeft: 15}}>
                                    <Text>No se encontraron exámenes</Text>
                                </View>
                            </View>
                    }       

                    <View style={[generalStyle.contentBottomLogin, { marginTop: 10 }]}>
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={publishedExam}>
                            <Text style={generalStyle.textBottomColor}>Enviar examen</Text>
                        </TouchableOpacity>    
                    </View>
                    
                </View>
                

                <View style={[examStyle.contentCards, { marginBottom: 30 }]} >
                    <FlatList
                        data={lstQuestions}
                        renderItem={(item) => <AnswerComponent question={item.item} />}
                        keyExtractor={(item) => `${item.description}-${item.num_question}`}
                    />
                </View>  
        </ScrollView>  
        </SafeAreaView>
    )
}
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';

import { Alert, View, SafeAreaView, Text, TouchableOpacity, ScrollView, RefreshControl, FlatList } from 'react-native'
import { examApi } from '../../api/examApi';

import { LoaderComponent } from '../../components/LoaderComponent';
import { QuestionComponent } from '../../components/QuestionComponent';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { Exam, Question  } from '../../interface/ExamInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { TypesUser } from '../../interface/userInterface';
import examComponentStyle from '../../styles/examComponentStyle';
import examStyle from '../../styles/examStyle';
import generalStyle from '../../styles/generalStyle';

interface ExamViewProps extends NativeStackScreenProps<RooteStackParams,'ExamView'>{
    exam: Exam,
    onSubmit: () => void
};

export const ExamView = () => {
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [lstQuestions, setLstQuestions] = useState<Question[]>();
    
    const route = useRoute();
    const props = route.params as ExamViewProps;

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
                    {
                        (isTeacher && !props.exam.published) &&
                            <View style={[generalStyle.contentBottomLogin, { marginTop: 10 }]}>
                                <TouchableOpacity style={generalStyle.bottomLogin} onPress={publishedExam}>
                                    <Text style={generalStyle.textBottomColor}>Publicar examen</Text>
                                </TouchableOpacity>    
                            </View>
                    }    
                    {
                        (isTeacher && props.exam.published) &&
                            <View style={[generalStyle.contentBottomLogin, { marginTop: 10 }]}>
                                <Text style={examComponentStyle.colorPublished}>
                                    EXAMEN PUBLICADO
                                </Text>
                            </View>
                    }
                </View>
                

                <View style={examStyle.contentCards} >
                    <FlatList
                        data={lstQuestions}
                        renderItem={(item) => <QuestionComponent 
                                                        question={item.item} 
                                                        onClick={() => onEditQuestion(item.item)}
                                                        edit={!props.exam.published}
                                                        onReload={getQuestions}/>}
                        keyExtractor={(item) => `${item.description}-${item.num_question}`}
                    />
                </View>  
        </ScrollView>  
        </SafeAreaView>
    )
}
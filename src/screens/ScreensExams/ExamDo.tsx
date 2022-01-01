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
import { AnswerStudent, Exam, Question, StatusExamStudent, StatusExamStudentWithExam } from '../../interface/ExamInterface';
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
    const [error, setError] = useState<string>();
    
    const route = useRoute();
    const props = route.params as ExamDoProps;

    const [lstAnswer, setLstAnswer] = useState<AnswerStudent[]>([]);

    const getQuestions = () => {
        loaderContext.changeStateLoder(true);
        
        examApi.getQuestionsByExam(props.exam.id_exam)
        .then((values) => {

            let auxAnswerStudent : AnswerStudent[] = []

            if (values.data)
                for(let i = 0; i < values.data.length; i++){
                    auxAnswerStudent.push({                        
                        id_exam: props.exam.id_exam,
                        num_question: values.data[i].num_question,
                        answer: null,
                        id_student: authContext.authState.userProfile.id
                    })
                }

            setLstQuestions(values.data ?? []);
            setLstAnswer(auxAnswerStudent);
            loaderContext.changeStateLoder(false);
        });        
    }

    const sendExam = async () => {

        if (lstAnswer.some(x => x.answer == null)) {
            setError("Operación inválida: faltan preguntas por responder");
            return;
        }

        loaderContext.changeStateLoder(true);
        
        for(let i = 0; i < lstAnswer.length; i++){
            let oneAnswer : AnswerStudent = lstAnswer[i];
            await examApi.sendAnswer(
                oneAnswer.id_exam, oneAnswer.num_question, oneAnswer.id_student, oneAnswer.answer ?? false
            );
        }
        
        await examApi.correctExam(props.exam.id_exam, authContext.authState.userProfile.id);

        loaderContext.changeStateLoder(false);

        props.onSubmit();
    }

    const onChangeAnswer = (num_question: number, answer: boolean | null) => {
        let auxAnswerStudent : AnswerStudent[] = lstAnswer.filter(x => x.num_question !== num_question);
        auxAnswerStudent.push({                        
            id_exam: props.exam.id_exam,
            num_question: num_question,
            answer: answer,
            id_student: authContext.authState.userProfile.id
        });
        
        setError(undefined);
        setLstAnswer(auxAnswerStudent);
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
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={sendExam}>
                            <Text style={generalStyle.textBottomColor}>Enviar examen</Text>
                        </TouchableOpacity>    
                    </View>
            
                    {
                        error &&
                            <View style={{marginBottom: 10, marginLeft: 15}}>
                                <Text style={{color: 'red'}}>{error}</Text>
                            </View>
                    }                    
                </View>
                

                <View style={[examStyle.contentCards, { marginBottom: 30 }]} >
                    <FlatList
                        data={lstQuestions}
                        renderItem={(item) => <AnswerComponent question={item.item} onChangeAnswer={onChangeAnswer} />}
                        keyExtractor={(item) => `${item.description}-${item.num_question}`}
                    />
                </View>  
        </ScrollView>  
        </SafeAreaView>
    )
}
import { Picker } from '@react-native-picker/picker';
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native'
import { examApi } from '../../api/examApi';
import { ExamComponent } from '../../components/ExamComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { Exam } from '../../interface/ExamInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { TypesUser } from '../../interface/userInterface';
import examStyle from '../../styles/examStyle';
import generalStyle from '../../styles/generalStyle';

interface ExamListProps extends NativeStackScreenProps<RooteStackParams,'ExamList'>{
    idCourse: number
};

export const ExamList = () => {
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [lstExams, setLstExams] = useState<Exam[]>();
    
    const route = useRoute();
    const props = route.params as ExamListProps;

    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;

    const getExamStudent = () => {
        loaderContext.changeStateLoder(true);
        
        examApi.getExamsPublishedByCourse(props.idCourse)
        .then((values) => {
            setLstExams(values.data ?? []);
            loaderContext.changeStateLoder(false);
        });    
    }

    const getExamTeacher = () => {
        loaderContext.changeStateLoder(true);
        
        examApi.getExamsByCourse(props.idCourse)
        .then((values) => {
            setLstExams(values.data ?? []);
            loaderContext.changeStateLoder(false);
        });        
    }

    const getExams = () => {
        if (isStudent) getExamStudent();
        else if (isTeacher) getExamTeacher();
    }

    const onSubmitNewExam = () => {
        props.navigation.pop();
        getExams();
    }

    useEffect(() => {
        getExams();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={loaderContext.loderState.isLoder}
                    onRefresh={getExams}
                />
                }
            >        

                {loaderContext.loderState.isLoder && <LoaderComponent/>}
                
                {
                    isTeacher && 
                    <View style={[generalStyle.contentBottomLogin, {marginTop: 10}]}>
                        <TouchableOpacity style={generalStyle.bottomLogin} 
                                onPress={() => props.navigation.navigate('ExamNew', { navigation: props.navigation, idCourse: props.idCourse, onSubmit: onSubmitNewExam })}>
                            <Text style={generalStyle.textBottomColor}>Nuevo Examen</Text>
                        </TouchableOpacity>    
                    </View>
                }

                {
                    lstExams?.length == 0 && <Text>No se encontraron exámenes</Text>
                }

                <View style={examStyle.contentCards} >
                    <FlatList
                        data={lstExams}
                        renderItem={(item) => <ExamComponent 
                                                        exam={item.item} 
                                                        onClick={() => console.log("EXAM")}
                                                        onReload={getExams}/>}
                        keyExtractor={(item) => `${item.title}-${item.idexam}`}
                    />
                </View>         
        </ScrollView>  
        </SafeAreaView>
    )
}
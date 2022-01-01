import React, { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Text, TouchableOpacity, View } from "react-native";
import { Question, StatusExamStudent } from "../interface/ExamInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import examComponentStyle from "../styles/examComponentStyle";
import { useEffect } from "react";
import { examApi } from "../api/examApi";
import { AuthContext } from "../context/AuthContext";
import { TypesUser } from "../interface/userInterface";
import courseFilterStyle from "../styles/courseFilterStyle";
import { answerFormService } from "../service/answerFormService";

interface AnswerComponentProps {
    question: Question
}

export const AnswerComponent = (props: AnswerComponentProps) => {
    const [finalFavorite, setFavorite] = useState<boolean>();
    const authContext = useContext(AuthContext);
    const { answerForm, changeValue, errorSubmit } = answerFormService(); 
    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;

    const changeFavorite = () => {
 
    }

/*     useEffect(() => setFavorite(props.isFavorite)); */

    return (
        <View style={[examComponentStyle.container, {flex: 1}]}>
            <View>
                <Text style={examComponentStyle.titleExam}>
                    {`Pregunta N°: ${props.question.num_question}`}
                </Text>
                <Text style={examComponentStyle.colorDescription}>
                    {props.question.description}
                </Text>
            </View>
                <View style={[courseFilterStyle.marginPickers, {marginBottom: 20, width: '100%'}]}>
                    <Text style={courseFilterStyle.titlePickers}>Respuesta</Text>
                    <Picker
                        selectedValue={answerForm.answer.value}
                        onValueChange={(itemValue, itemIndex) => changeValue('answer', itemValue)
                        }>
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="Verdadero" value="true" />
                        <Picker.Item label="Falso" value="false" />
                    </Picker>
                </View>
        </View>
    );
}
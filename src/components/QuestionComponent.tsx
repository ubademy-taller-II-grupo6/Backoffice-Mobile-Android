import React, { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';
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

interface QuestionComponentProps {
    question: Question,
    edit?: boolean,
    onClick: () => void,
    onReload?: () => void
}

export const QuestionComponent = (props: QuestionComponentProps) => {
    const [finalFavorite, setFavorite] = useState<boolean>();
    const authContext = useContext(AuthContext);
    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;

    const changeFavorite = () => {
 
    }

/*     useEffect(() => setFavorite(props.isFavorite)); */

    return (
        <View style={examComponentStyle.container}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => props.onClick()}>
                <View>
                    <Text style={examComponentStyle.titleExam}>
                        {`Pregunta N°: ${props.question.num_question}`}
                    </Text>
                    <Text style={examComponentStyle.colorDescription}>
                        {props.question.description}
                    </Text>
                    {
                        isTeacher && 
                            <Text style={examComponentStyle.colorDescription}>
                                {`Respuesta: ${props.question.answer ? "Verdadero" : "Falso"}`}
                            </Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
}
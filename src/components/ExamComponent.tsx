import React, { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";
import { Exam, StatusExamStudent } from "../interface/ExamInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import examComponentStyle from "../styles/examComponentStyle";
import { useEffect } from "react";
import { examApi } from "../api/examApi";
import { AuthContext } from "../context/AuthContext";
import { TypesUser } from "../interface/userInterface";

interface ExamComponentProps {
    exam: Exam,
    status?: StatusExamStudent,
    onClick: () => void,
    onReload?: () => void
}

export const ExamComponent = (props: ExamComponentProps) => {
    const [finalFavorite, setFavorite] = useState<boolean>();
    const authContext = useContext(AuthContext);
    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;
    const qualified : boolean = (props.status?.status === "CALIFICADO");
    const approved : boolean = qualified && (parseInt(props.status?.score ?? "0") >= 4);

    const changeFavorite = () => {
 
    }

/*     useEffect(() => setFavorite(props.isFavorite)); */

    return (
        <View style={examComponentStyle.container}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => props.onClick()}>
                <View>
                    <Text style={examComponentStyle.titleExam}>
                        {props.exam.title}
                    </Text>
                    <Text style={examComponentStyle.colorDescription}>
                        {props.exam.description}
                    </Text>
                    {
                        isTeacher && 
                            <Text style={examComponentStyle.colorDescription}>
                                {props.exam.published ? "PUBLICADO" : "SIN PUBLICAR"}
                            </Text>
                    }
                    {
                        isStudent &&
                            <Text style={examComponentStyle.colorDescription}>
                                { props.status?.status ?? "Sin responder" }
                            </Text>
                    }
                    {
                        (isStudent && qualified) &&
                            <Text style={examComponentStyle.colorDescription}>
                                {`Nota: ${props.status?.score}`}
                            </Text>
                    }
                </View>
            </TouchableOpacity>

            {
                isTeacher ?
                    props.exam.published ?
                        <Ionicons style={{position: 'absolute', top: 5, right: 15, fontSize:30, color:'rgba(45,171,255,1)'}} name="checkmark-sharp" size={20} />
                    :
                        <Ionicons style={{position: 'absolute', top: 5, right: 15, fontSize:30, color:'rgba(45,171,255,1)'}} name="eye-off" size={20} />
                :
                    null
            }
            
            {
                (isStudent && qualified) && 
                    <Ionicons style={{position: 'absolute', top: 5, right: 15, fontSize:30, color:`${approved ? "green" : "red"}`}}
                              name={`${approved ? "checkmark-sharp" : "close"}`} size={20} />
            }
        </View>
    );
}
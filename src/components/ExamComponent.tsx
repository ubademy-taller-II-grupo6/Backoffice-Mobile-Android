import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from "../context/AuthContext";

import { TypesUser } from "../interface/userInterface";
import { Exam, StatusExamStudent } from "../interface/ExamInterface";

import examComponentStyle from "../styles/examComponentStyle";

interface ExamComponentProps {
    exam: Exam,
    status?: StatusExamStudent,
    onClick: () => void,
    onReload?: () => void
}

export const ExamComponent = (props: ExamComponentProps) => {
    const authContext = useContext(AuthContext);
    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;
    const qualified : boolean = (props.status?.status === "CALIFICADO");
    const approved : boolean = qualified && (parseInt(props.status?.score ?? "0") >= 4);

    const onClick = () => {
        if (!(isStudent && qualified)) props.onClick();
    }

    return (
        <View style={examComponentStyle.container}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={onClick}>
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
                            <Text style={[examComponentStyle.colorDescription, { fontWeight: 'bold' }]}>
                                { props.status?.status ?? "Sin responder" }
                            </Text>
                    }
                    {
                        (isStudent && qualified) &&
                            <Text style={[examComponentStyle.colorDescription, { fontWeight: 'bold', color:`${approved ? "green" : "red"}` }]}>
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
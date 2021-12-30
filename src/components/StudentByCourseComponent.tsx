import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, Image, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Course, CourseStudentResume } from "../interface/CourseInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import { useEffect } from "react";
import { courseApi } from "../api/courseApi";
import courseDetailStyle from "../styles/courseDetailStyle";

interface StudentByCourseComponentProps {
    idCourse: number
}

export const StudentByCourseComponent = (props: StudentByCourseComponentProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [lstStudents, setLstStudents] = useState<CourseStudentResume[]>([]);

    const changeVisualization = () => setShow(!show);

    useEffect(() => {
        setLoading(true);

        courseApi.getStudentsByCourse(props.idCourse)
        .then((values) => {
            setLstStudents(values.data ?? []);
            setLoading(false);
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
                
                <View style={courseDetailStyle.titleCourse} >
                    <Text style={courseDetailStyle.titleTextCourse}>Estudiantes inscriptos</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={changeVisualization}>
                        <Ionicons name={show ? "eye-off" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                </View>
                {
                    isLoading && show && 
                    <View style={{flex: 1, paddingTop: 15, justifyContent: 'center',}}>
                        <ActivityIndicator size="small" color="#0000ff"/>
                    </View>
                }
                {
                    !isLoading && show &&
                        <View style={{paddingLeft: 10, paddingTop: 10}}>
                        {
                            lstStudents.length === 0 ?
                                <Text>No se encontraron estudiantes inscriptos en el curso.</Text>
                            :
                                <FlatList
                                    data={lstStudents}
                                    renderItem={(item) => <Text>{item.item.name}</Text>}
                                    keyExtractor={(item) => `${item.id}`}
                                />
                        }
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}
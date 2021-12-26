import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, Image, FlatList, SafeAreaView } from "react-native";
import { Course, CourseCollaboratorResume } from "../interface/CourseInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import { useEffect } from "react";
import { courseApi } from "../api/courseApi";
import courseDetailStyle from "../styles/courseDetailStyle";

interface CollaboratorByCourseComponentProps {
    idCourse: number
}

export const CollaboratorByCourseComponent = (props: CollaboratorByCourseComponentProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [lstCollaborators, setLstCollaborators] = useState<CourseCollaboratorResume[]>([]);

    const changeVisualization = () => setShow(!show);

    useEffect(() => {
        setLoading(true);

        courseApi.getCollaboratorsByCourse(props.idCourse)
        .then((values) => {
            setLstCollaborators(values.data ?? []);
            setLoading(false);
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
                
                <View style={courseDetailStyle.titleCourse} >
                    <Text style={courseDetailStyle.titleTextCourse}>Colaboradores</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={changeVisualization}>
                        <Ionicons name={show ? "eye-off" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                </View>
                {
                    show &&
                        <View style={{paddingLeft: 10, paddingTop: 10}}>
                            <FlatList
                                data={lstCollaborators}
                                renderItem={(item) => <Text>{item.item.name}</Text>}
                                keyExtractor={(item) => `${item.id}`}
                            />
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}

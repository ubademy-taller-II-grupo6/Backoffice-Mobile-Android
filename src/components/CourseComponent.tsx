import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";
import { Course } from "../interface/CoursesInterface"

import { StyleSheet } from "react-native";
const misCursosStyle = StyleSheet.create({
    container: {
        width: 350,
        marginTop: 5,
        backgroundColor: "#E6E6E6",
        borderRadius: 14,
    },
    titleCourse: {
        color: "#121212",
        fontWeight: "bold",
        height: 20,
        width: 157
    },
    titleCourseRow: {
        height: 20,
        flexDirection: "row",
        marginTop: 12,
        marginLeft: 11,
        marginRight: 49,
        alignContent: 'space-around'
    },
    otherText: {
        color: "#121212",
        height: 20,
        width: 157,
        marginTop: 2,
        marginLeft: 11
    },
});

interface CourseComponentProps {
    course: Course,
    isFavorite: boolean
}

export const CourseComponent = (props: CourseComponentProps) => {
    return (
            <TouchableOpacity>
                <View style={misCursosStyle.container}>
                    <View style={misCursosStyle.titleCourseRow}>
                        <Text style={misCursosStyle.titleCourse}>{props.course.title}</Text>
                        {
                            props.isFavorite ?
                                <Ionicons name="heart" size={20} color="rgba(128,128,128,1)" /> 
                            :
                                <Ionicons name="heart-outline" size={20} color="rgba(128,128,128,1)" /> 
                        }
                    </View>
                    <Text style={misCursosStyle.otherText}>{props.course.description}</Text>
                    <Text style={misCursosStyle.otherText}>{`$ ${props.course.price}`}</Text>
                </View>
            </TouchableOpacity>
    );
}
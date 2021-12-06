import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Course } from "../interface/CoursesInterface"
import misCursosStyle from "../styles/misCursosStyle";

interface CourseComponentProps {
    course: Course
}

export const CourseComponent = (props: CourseComponentProps) => {
    return (
            <TouchableOpacity>
                <View style={misCursosStyle.cardOption}>
                    <Text style={misCursosStyle.titleText}>{props.course.title}</Text>
                    <Text>{props.course.description}</Text>
                </View>
            </TouchableOpacity>
    );
}
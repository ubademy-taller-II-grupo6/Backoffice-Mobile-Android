import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Course } from "../interface/CoursesInterface"

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import courseComponentStyle from "../styles/courseComponentStyle";
import { useEffect } from "react";
import { courseApi } from "../api/courseApi";

const {height, width} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F96D41',
  secondary: '#25282F',

  // colors
  black: '#1E1B26',
  white: '#FFFFFF',
  lightGray: '#64676D',
  lightGray2: '#EFEFF0',
  lightGray3: '#D4D5D6',
  lightGray4: '#7D7E84',
  gray: '#2D3038',
  gray1: '#282C35',
  darkRed: '#31262F',
  lightRed: '#C5505E',
  darkBlue: '#22273B',
  lightBlue: '#424BAF',
  darkGreen: '#213432',
  lightGreen: '#31Ad66',
} as const;

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
} as const;

const misCursosStyle = StyleSheet.create({
    container: {
        width: 350,
        marginTop: 5,
        backgroundColor: "#E6E6E6",
        borderRadius: 14,
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 15,
        paddingLeft: 15
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
    isFavorite: boolean,
    onClick: () => void
}

export const CourseComponent = (props: CourseComponentProps) => {
    const [finalFavorite, setFavorite] = useState<boolean>();

    const changeFavorite = () => {
        setFavorite(!finalFavorite);
    }

    useEffect(() => setFavorite(props.isFavorite));

    return (
        <View style={courseComponentStyle.container}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => props.onClick()}>
                <View>
                    <Text style={courseComponentStyle.titleCourse}>
                        {props.course.title}
                    </Text>
                    <Text style={courseComponentStyle.colorDescription}>
                        {props.course.description}
                    </Text>
                    <Text style={courseComponentStyle.colorDescription}>
                        {`$ ${props.course.price}`}
                    </Text>
                </View>
            </TouchableOpacity>
          <TouchableOpacity
            style={{position: 'absolute', top: 5, right: 15}}
            onPress={changeFavorite}>
            {
                finalFavorite ?
                    <Ionicons name="heart" size={20} color="red" /> 
                :
                    <Ionicons name="heart-outline" size={20} color="red" /> 
            }
          </TouchableOpacity>
        </View>
    );
}
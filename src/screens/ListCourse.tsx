import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { courseApi } from '../api/courseApi';
import { CourseComponent } from '../components/CourseComponent';
import { Course, CourseByUser } from '../interface/CoursesInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import listCoursesStyle from '../styles/listCoursesStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'ListCourse'>{};

export const ListCourse = ({navigation}:Props) => {
    const [lstCourses, setLstCourses] = useState<Course[]>();
    const [lstCoursesUser, setLstCoursesUser] = useState<CourseByUser[]>();

    useEffect(() => {
        Promise.all([
            courseApi.getListCourses(),
            courseApi.getListCoursesByUser(1)
        ])
        .then((values) => {
            setLstCourses(values[0]);
            setLstCoursesUser(values[1]);
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={listCoursesStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item} 
                                                           isFavorite={lstCoursesUser?.some((x => x.idcourse === item.item.id)) || false} />}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </SafeAreaView>
    )
}
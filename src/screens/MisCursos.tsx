import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { courseApi } from '../api/courseApi';
import { CourseComponent } from '../components/CourseComponent';
import { Course, CourseByUser } from '../interface/CoursesInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import misCursosStyle from '../styles/misCursosStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'MisCursos'>{};

export const MisCursos = ({navigation}:Props) => {
    const [lstCourses, setLstCourses] = useState<Course[]>();

    useEffect(() => {
        Promise.all([
            courseApi.getListCourses(),
            courseApi.getListCoursesByUser(1)            
        ]).then((values) => {
            let lstAuxCourse : Course[] = [];
            values[1].forEach((x: CourseByUser) => {
                lstAuxCourse.push(values[0].filter(y => y.id === x.idcourse)[0]);
            });
            setLstCourses(lstAuxCourse);
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={misCursosStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item} />}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </SafeAreaView>
    )
}
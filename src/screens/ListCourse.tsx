import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, View } from 'react-native'
import { courseApi } from '../api/courseApi';
import { CourseComponent } from '../components/CourseComponent';
import { LoaderComponent } from '../components/LoaderComponent';
import { LoderContext } from '../context/LoderContext';
import { Course, CourseByUser } from '../interface/CoursesInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import listCoursesStyle from '../styles/listCoursesStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'ListCourse'>{};

export const ListCourse = ({navigation}:Props) => {
    const loderContext = useContext(LoderContext)
    const [lstCourses, setLstCourses] = useState<Course[]>();
    const [lstCoursesUser, setLstCoursesUser] = useState<CourseByUser[]>();

    useEffect(() => {
        loderContext.changeStateLoder(true);

        Promise.all([
            courseApi.getListCourses(),
            courseApi.getListCoursesByUser(1)
        ])
        .then((values) => {
            setLstCoursesUser(values[1]);
            setLstCourses(values[0]);
            loderContext.changeStateLoder(false);
        });
    }, []);

    return (
        <SafeAreaView>
            {loderContext.loderState.isLoder && <LoaderComponent/>}
            <View style={listCoursesStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item} 
                                                           isFavorite={lstCoursesUser?.some((x => x.idcourse === item.item.id)) || false}
                                                           onClick={() => navigation.navigate('CourseDetail', {idCourse: item.item.id})}/>}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </SafeAreaView>
    )
}
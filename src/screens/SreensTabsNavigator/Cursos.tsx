import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, View } from 'react-native'
import { courseApi } from '../../api/courseApi';
import { CourseComponent } from '../../components/CourseComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { LoderContext } from '../../context/LoderContext';
import { Course, CourseByUser } from '../../interface/CourseInterface';
import courseStyle from '../../styles/courseStyle';

export const Cursos = () => {
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
            <View style={courseStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item} 
                                                           isFavorite={lstCoursesUser?.some((x => x.idcourse === item.item.id)) || false}
                                                           onClick={() => {console.log("Detalle")}}/>}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </SafeAreaView>
    )
}
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native'
import { courseApi } from '../api/courseApi';
import { CourseComponent } from '../components/CourseComponent';
import { LoaderComponent } from '../components/LoaderComponent';
import { LoderContext } from '../context/LoderContext';
import { Course } from '../interface/CourseInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import courseComponentStyle from '../styles/courseComponentStyle';

interface PropsCourseDetail extends NativeStackScreenProps<RooteStackParams,'CourseDetail'>{
    idCourse: number
};

export const CourseDetail = () => {
    const route = useRoute();
    const props = route.params as PropsCourseDetail;
  
    const loderContext = useContext(LoderContext)
    const [course, setCourse] = useState<Course>();
    
    useEffect(() => {
        loderContext.changeStateLoder(true);

        courseApi.getCourseById(props.idCourse)
        .then((values) => {
            if (values.data != null)
                setCourse(values.data);
            loderContext.changeStateLoder(false);
        });
    }, []);

    return (
        <SafeAreaView>
            {loderContext.loderState.isLoder && <LoaderComponent/>}

            {
                course &&
                    <View style={{paddingLeft: 20, paddingTop: 20}}>
                        <Text style={courseComponentStyle.titleCourse}>
                            {course?.title}
                        </Text>
                        <Text style={courseComponentStyle.colorDescription}>
                            {course?.description}
                        </Text>
                        <Text style={courseComponentStyle.colorDescription}>
                            {`${course?.subscription}`}
                        </Text>
                    </View>
            }
        </SafeAreaView>
    )
}
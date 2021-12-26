import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { courseApi } from '../../api/courseApi';
import { CourseComponent } from '../../components/CourseComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { Course } from '../../interface/CourseInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { TypesUser } from '../../interface/userInterface';
import courseStyle from '../../styles/courseStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'MyCourses'>{};

export const MisCursosCreados = ({navigation} : Props) => {
    const loderContext = useContext(LoderContext);
    const [lstCourses, setLstCourses] = useState<Course[]>();

    const getCourses = () => {
        loderContext.changeStateLoder(true);

        courseApi.getListCoursesByCreator(3)
        .then((values) => {
            setLstCourses(values.data ?? []);
            loderContext.changeStateLoder(false);
        });
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={loderContext.loderState.isLoder}
                    onRefresh={getCourses}
                />
                }
            >
            
            {loderContext.loderState.isLoder && <LoaderComponent/>}
             
            {
                lstCourses?.length == 0 && <Text>No se encontraron cursos con los parámetros solicitados</Text>
            }

            <View style={courseStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item}
                                                           isFavorite={false}
                                                           onClick={() => navigation.navigate('CourseDetail', {idCourse: item.item.id})}
                                                           onReload={getCourses}/>}
                    keyExtractor={(item) => `${item.title}-${item.id}`}
                />
            </View>         
      </ScrollView>


        </SafeAreaView>
    )
}

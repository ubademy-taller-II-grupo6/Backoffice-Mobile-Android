import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList,  RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { courseApi } from '../../api/courseApi';
import { CourseComponent } from '../../components/CourseComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { Course } from '../../interface/CourseInterface';
import courseStyle from '../../styles/courseStyle';

export const Favoritos = () => {
    const loderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [lstFavorites, setLstFavorites] = useState<Course[]>();

    const getCourses = () => {
        loderContext.changeStateLoder(true);

        Promise.all([
            courseApi.getListCoursesByUser(authContext.authState.userProfile.id)
        ])
        .then((values) => {
            console.log(values)
            setLstFavorites(values[0].data ?? []);
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
            <View style={courseStyle.contentCards}>

                {
                    lstFavorites?.length == 0 && <Text>No se encontraron cursos con los parámetros solicitados</Text>
                }
            
                <FlatList
                    data={lstFavorites}
                    renderItem={(item) => <CourseComponent course={item.item} 
                                                           isFavorite={true}
                                                           onClick={() => {console.log("Detalle")}}
                                                           onReload={getCourses}/>}
                    keyExtractor={(item) => `${item.title}-${item.id}`}
                />
            </View>         
      </ScrollView>


        </SafeAreaView>
    )
}
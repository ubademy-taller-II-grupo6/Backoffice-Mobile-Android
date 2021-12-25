import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { courseApi } from '../../api/courseApi';
import { CourseComponent } from '../../components/CourseComponent';
import { LoaderComponent } from '../../components/LoaderComponent';
import { LoderContext } from '../../context/LoderContext';
import { Course, CourseByUser } from '../../interface/CourseInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import courseStyle from '../../styles/courseStyle';
import {Picker} from '@react-native-picker/picker';
import generalStyle from '../../styles/generalStyle';
import courseFilterStyle from '../../styles/courseFilterStyle';

interface Props extends NativeStackScreenProps<RooteStackParams,'Courses'>{};

const allSelect : string = "all";

export const Cursos = ({navigation} : Props) => {
    const loderContext = useContext(LoderContext)
    const [lstCourses, setLstCourses] = useState<Course[]>();
    const [lstCoursesUser, setLstCoursesUser] = useState<Course[]>();

    const [lstCategories, setLstCategories] = useState<Course[]>();
    const [selectCategory, setSelectCategory] = useState<string>(allSelect);

    const [lstSubscriptions, setLstSubscriptions] = useState<Course[]>();
    const [selectSubscription, setSelectSubscription] = useState<string>(allSelect);

    const getCourses = () => {
        loderContext.changeStateLoder(true);
        let category = (selectCategory === allSelect) ? undefined : selectCategory;
        let subscription = (selectSubscription === allSelect) ? undefined : selectSubscription;

        Promise.all([
            courseApi.getListCourses(category, subscription),
            courseApi.getListCoursesByUser(3)
        ])
        .then((values) => {
            setLstCoursesUser(values[1].data ?? []);
            setLstCourses(values[0].data ?? []);
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
            
            <View style={courseFilterStyle.marginPickers}> 
                <Text style={courseFilterStyle.titlePickers}>Categoría</Text>
                <Picker
                    selectedValue={selectCategory}
                    onValueChange={(itemValue, itemIndex) => setSelectCategory(itemValue)
                    }>
                    <Picker.Item label="Todas" value={allSelect} />
                    <Picker.Item label="MATHEMATICS" value='MATHEMATICS' />
                    <Picker.Item label="PHYSICAL" value='PHYSICAL' />
                </Picker>
            </View>
            
            <View style={courseFilterStyle.marginPickers}>
                <Text style={courseFilterStyle.titlePickers}>Subscripción</Text>
                <Picker
                    selectedValue={selectSubscription}
                    onValueChange={(itemValue, itemIndex) => setSelectSubscription(itemValue)
                    }>
                    <Picker.Item label="Todas" value={allSelect} />
                    <Picker.Item label="GOLD" value='GOLD' />
                    <Picker.Item label="BRONZE" value='BRONZE' />
                </Picker>
            </View>
            
                <View style={generalStyle.contentBottomLogin}>
                    <TouchableOpacity style={generalStyle.bottomLogin} onPress={getCourses}>
                        <Text style={generalStyle.textBottomColor}>Buscar</Text>
                    </TouchableOpacity>    
                </View>

             {loderContext.loderState.isLoder && <LoaderComponent/>}
             
            {
                lstCourses?.length == 0 && <Text>No se encontraron cursos con los parámetros solicitados</Text>
            }

            <View style={courseStyle.contentCards}>
                <FlatList
                    data={lstCourses}
                    renderItem={(item) => <CourseComponent course={item.item} 
                                                           isFavorite={lstCoursesUser?.some((x => x.id === item.item.id)) || false}
                                                           onClick={() => navigation.navigate('CourseDetail', {idCourse: item.item.id})}
                                                           onReload={getCourses}/>}
                    keyExtractor={(item) => `${item.title}-${item.id}`}
                />
            </View>         
      </ScrollView>


        </SafeAreaView>
    )
}

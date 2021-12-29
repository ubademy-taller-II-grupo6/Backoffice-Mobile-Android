import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { courseApi } from '../api/courseApi';
import { CollaboratorByCourseComponent } from '../components/CollaboratorByCourseComponent';
import { CourseComponent } from '../components/CourseComponent';
import { LoaderComponent } from '../components/LoaderComponent';
import { StudentByCourseComponent } from '../components/StudentByCourseComponent';
import { AuthContext } from '../context/AuthContext';
import { LoderContext } from '../context/LoderContext';
import { Course } from '../interface/CourseInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import { TypesUser } from '../interface/userInterface';
import courseComponentStyle from '../styles/courseComponentStyle';
import generalStyle from '../styles/generalStyle';

interface PropsCourseDetail extends NativeStackScreenProps<RooteStackParams,'CourseDetail'>{
    idCourse: number
};

const withoutConditions : string = "Sin condiciones";

export const CourseDetail = () => {
    const route = useRoute();
    const props = route.params as PropsCourseDetail;
  
    const loderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const isStudent : boolean = authContext.authState.typeUser === TypesUser.Estudiante;
    const isTeacher : boolean = authContext.authState.typeUser === TypesUser.Profesor;
    const [course, setCourse] = useState<Course>();
    const [isInscription, setIsInscription] = useState<boolean>(false);
    const [enrollText, setEnrollText] = useState<string>();
    const [unenrollText, setUnenrollText] = useState<string>();

    const loadCourse = () => {
        loderContext.changeStateLoder(true);

        Promise.all([
            courseApi.getCourseById(props.idCourse),
            courseApi.getInscriptionsByStudent(3),
            courseApi.getEnrollConditionsByCourse(props.idCourse),
            courseApi.getUnenrollConditionsByCourse(props.idCourse)
        ])
        .then((values) => {
            if (values[0].data != null) {
                setCourse(values[0].data);
                setIsInscription(values[1].data?.includes(values[0].data.id) ?? false);
                setEnrollText(values[2].data?.Condiciones ?? withoutConditions);
                setUnenrollText(values[3].data?.Condiciones ?? withoutConditions);
            }
            loderContext.changeStateLoder(false);
        });
    }

    const enrollStudent = () => {
        Alert.alert(
            `Desea inscribirse del curso ${course?.title}?`,
            `${enrollText}`,
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Aceptar", onPress: () => {
                  loderContext.changeStateLoder(true); 
                  courseApi.enrollStudent(3, props.idCourse).then((values) => { loadCourse(); });
                } 
            }
            ]
          );
    }

    const unenrollStudent = () => {
        Alert.alert(
            `Desea desinscribirse del curso ${course?.title}?`,
            `${unenrollText}`,
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Aceptar", onPress: () => {
                  loderContext.changeStateLoder(true); 
                  courseApi.unenrollStudent(3, props.idCourse).then((values) => { loadCourse(); });
                } 
            }
            ]
          );
    }

    const onUpdateCourse = () => {
        props.navigation.pop();
        loadCourse();
    };
    
    useEffect(() => {
        loadCourse();
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
                        <Text style={courseComponentStyle.colorDescription}>
                            {`${course?.category}`}
                        </Text>
                        <Text style={courseComponentStyle.colorDescription}>
                            {`${course?.type}`}
                        </Text>
                        <Text style={courseComponentStyle.colorDescription}>
                            {`${course?.hashtags}`}
                        </Text>
                        <Text style={courseComponentStyle.colorDescription}>
                            {`Ubicación: ${course?.location}`}
                        </Text>
                    </View>
            }
            
            {
                (isStudent && course) ?
                    isInscription ? 
                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={[generalStyle.bottomLogin, {backgroundColor:'rgb(218,76,53)'}]} onPress={unenrollStudent}>
                            <Text style={generalStyle.textBottomColor}>Desinscribirse</Text>
                        </TouchableOpacity>
                    </View>
                    :                
                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={enrollStudent}>
                            <Text style={generalStyle.textBottomColor}>Inscribirse</Text>
                        </TouchableOpacity>
                    </View>
                : 
                    null
            }

            {
                isTeacher &&         
                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={() => props.navigation.navigate('CourseUpdate', {course: course, onSubmit: onUpdateCourse})}>
                            <Text style={generalStyle.textBottomColor}>Editar curso</Text>
                        </TouchableOpacity>
                    </View>
            }

            {
                isTeacher && <>
                    <View>
                        <CollaboratorByCourseComponent idCourse={props.idCourse}/>
                    </View>
                    <View style={{marginTop: 15}}>
                        <StudentByCourseComponent idCourse={props.idCourse}/>
                    </View>

                </>
            }
        </SafeAreaView>
    )
}
import { Picker } from '@react-native-picker/picker';
import { useLinkProps, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'
import { courseApi } from '../api/courseApi';
import { userApi } from '../api/userApi';
import { CollaboratorByCourseComponent } from '../components/CollaboratorByCourseComponent';
import { CourseComponent } from '../components/CourseComponent';
import { LoaderComponent } from '../components/LoaderComponent';
import { StudentByCourseComponent } from '../components/StudentByCourseComponent';
import { AuthContext } from '../context/AuthContext';
import { LoderContext } from '../context/LoderContext';
import { Course } from '../interface/CourseInterface';
import { RooteStackParams } from '../interface/navigatorLogin';
import { Subscription } from '../interface/SubscriptionInterface';
import { TypesUser } from '../interface/userInterface';
import { courseFormService } from '../service/courseFormService';
import courseComponentStyle from '../styles/courseComponentStyle';
import courseFilterStyle from '../styles/courseFilterStyle';
import generalStyle from '../styles/generalStyle';

interface CourseNewProps extends NativeStackScreenProps<RooteStackParams,'CourseNew'>{
    onSubmit: () => void
};

export const CourseNew = () => {
    const route = useRoute();
    const props = route.params as CourseNewProps;

    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState<string>();
    const { courseForm, changeValue, changeFocus, errorSubmit } = courseFormService();  
    const [lstCategories, setLstCategories] = useState<string[]>();
    const [lstSubscriptions, setLstSubscriptions] = useState<Subscription[]>();

    const createCourse = () => {
        setError(undefined);

        loaderContext.changeStateLoder(true);

        let newCourse : Course = {
            title: courseForm.title.value,
            description: courseForm.description.value,
            hashtags: courseForm.hashtags.value,
            type: courseForm.type.value,
            category: courseForm.category.value,
            exams: 0,
            subscription: courseForm.subscription.value,
            location: courseForm.location.value,
            creator: authContext.authState.userProfile.id,
            enrollment_conditions: courseForm.enrollment_conditions.value,
            unenrollment_conditions: courseForm.unenrollment_conditions.value
        } as Course;

        courseApi.createCourse(newCourse)
        .then((value) => {
            if (value.message === "El curso se creó correctamente")
                props.onSubmit()
            else {
                errorSubmit();
                setError(value.message || "Ha ocurrido un error");
            }
            loaderContext.changeStateLoder(false);
        });
    };

    useEffect(() => {
        loaderContext.changeStateLoder(true);
        Promise.all([
            userApi.getCacheSubscriptions(),
            courseApi.getCacheCategories()
        ])
        .then((values) => {
            setLstSubscriptions(values[0].data ?? []);
            setLstCategories(values[1].data ?? []);
            loaderContext.changeStateLoder(false);
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={{marginTop: 15, width: '100%', height: '100%',}}>
                {loaderContext.loderState.isLoder && <LoaderComponent/> }

                <View style={generalStyle.contentInputs}>
                    <View style={[(courseForm.title.isFocus&&courseForm.title.isValid)?generalStyle.inputFocus:
                            ((courseForm.title.isFocus&&!courseForm.title.isValid)
                            ||(courseForm.title.hasFocus&&!courseForm.title.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Título'
                            placeholderTextColor = "white"
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('title',text)
                            }}
                            onFocus={()=>{
                                changeFocus('title',true)
                            }}
                            onBlur={()=>{
                                changeFocus('title',false)
                            }}
                        />  
                    </View>
                    <View style={[(courseForm.description.isFocus&&courseForm.description.isValid)?generalStyle.inputFocus:
                            ((courseForm.description.isFocus&&!courseForm.description.isValid)
                            ||(courseForm.description.hasFocus&&!courseForm.description.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Descripción'
                            placeholderTextColor = "white"
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('description',text)
                            }}
                            onFocus={()=>{
                                changeFocus('description',true)
                            }}
                            onBlur={()=>{
                                changeFocus('description',false)
                            }}
                        /> 
                    </View>
                    <View style={[(courseForm.hashtags.isFocus&&courseForm.hashtags.isValid)?generalStyle.inputFocus:
                            ((courseForm.hashtags.isFocus&&!courseForm.hashtags.isValid)
                            ||(courseForm.hashtags.hasFocus&&!courseForm.hashtags.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Hashtags'
                            placeholderTextColor = "white"
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('hashtags',text)
                            }}
                            onFocus={()=>{
                                changeFocus('hashtags',true)
                            }}
                            onBlur={()=>{
                                changeFocus('hashtags',false)
                            }}
                        /> 
                    </View>
                    <View style={[(courseForm.location.isFocus&&courseForm.location.isValid)?generalStyle.inputFocus:
                            ((courseForm.location.isFocus&&!courseForm.location.isValid)
                            ||(courseForm.location.hasFocus&&!courseForm.location.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Ubicación'
                            placeholderTextColor = "white"
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('location',text)
                            }}
                            onFocus={()=>{
                                changeFocus('location',true)
                            }}
                            onBlur={()=>{
                                changeFocus('location',false)
                            }}
                        /> 
                    </View>
                    <View style={[(courseForm.enrollment_conditions.isFocus&&courseForm.enrollment_conditions.isValid)?generalStyle.inputFocus:
                            ((courseForm.enrollment_conditions.isFocus&&!courseForm.enrollment_conditions.isValid)
                            ||(courseForm.enrollment_conditions.hasFocus&&!courseForm.enrollment_conditions.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Condiciones de Inscripción'
                            placeholderTextColor = "white"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('enrollment_conditions',text)
                            }}
                            onFocus={()=>{
                                changeFocus('enrollment_conditions',true)
                            }}
                            onBlur={()=>{
                                changeFocus('enrollment_conditions',false)
                            }}
                        /> 
                    </View>
                    <View style={[(courseForm.unenrollment_conditions.isFocus&&courseForm.unenrollment_conditions.isValid)?generalStyle.inputFocus:
                            ((courseForm.unenrollment_conditions.isFocus&&!courseForm.unenrollment_conditions.isValid)
                            ||(courseForm.unenrollment_conditions.hasFocus&&!courseForm.unenrollment_conditions.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Condiciones de Desinscripción'
                            placeholderTextColor = "white"
                            multiline
                            numberOfLines={4}
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('unenrollment_conditions',text)
                            }}
                            onFocus={()=>{
                                changeFocus('unenrollment_conditions',true)
                            }}
                            onBlur={()=>{
                                changeFocus('unenrollment_conditions',false)
                            }}
                        /> 
                    </View>
                </View>
                <View style={courseFilterStyle.marginPickers}> 
                    <Text style={courseFilterStyle.titlePickers}>Categoría</Text>
                    <Picker
                        selectedValue={courseForm.category.value}
                        onValueChange={(itemValue, itemIndex) => changeValue('category', itemValue)
                        }>
                        <Picker.Item label="-" value="" />
                        {
                            lstCategories?.map((cat: string, idx: number) => 
                                <Picker.Item key={`${cat}_${idx}`} 
                                            label={cat} 
                                            value={cat} />
                            )
                        }
                    </Picker>
                </View>
                <View style={courseFilterStyle.marginPickers}>
                    <Text style={courseFilterStyle.titlePickers}>Subscripción</Text>
                    <Picker
                        selectedValue={courseForm.subscription.value}
                        onValueChange={(itemValue, itemIndex) => changeValue('subscription', itemValue)
                        }>
                        <Picker.Item label="-" value="" />
                        {
                            lstSubscriptions?.map((subs: Subscription, idx: number) => 
                                <Picker.Item key={subs.subscription_id} 
                                            label={subs.subscription_id} 
                                            value={subs.subscription_id} />
                            )
                        }
                    </Picker>
                </View>
                <View style={courseFilterStyle.marginPickers}>
                    <Text style={courseFilterStyle.titlePickers}>Tipo</Text>
                    <Picker
                        selectedValue={courseForm.type.value}
                        onValueChange={(itemValue, itemIndex) => changeValue('type', itemValue)
                        }>
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="PRESENTIAL" value="PRESENTIAL" />
                        <Picker.Item label="SEMI PRESENTIAL" value="SEMI PRESENTIAL" />
                        <Picker.Item label="VIRTUAL" value="VIRTUAL" />
                    </Picker>
                </View>
            
                {
                    error &&
                        <View style={{marginBottom: 10}}>
                            <Text style={{color: 'red'}}>{error}</Text>
                        </View>
                }

                
                <View style={generalStyle.contentBottomLogin}>
                    <TouchableOpacity style={generalStyle.bottomLogin} onPress={createCourse}>
                        <Text style={generalStyle.textBottomColor}>Guardar curso</Text>
                    </TouchableOpacity>    
                </View>
            </View>    
        </SafeAreaView>
    )
}
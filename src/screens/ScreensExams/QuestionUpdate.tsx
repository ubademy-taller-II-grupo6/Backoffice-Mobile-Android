import React, { useContext, useEffect, useState } from 'react'

import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'

import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';

import { LoaderComponent } from '../../components/LoaderComponent';

import { Question } from '../../interface/ExamInterface';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { questionFormService } from '../../service/questionFormService';

import courseFilterStyle from '../../styles/courseFilterStyle';
import generalStyle from '../../styles/generalStyle';
import { examApi } from '../../api/examApi';

interface QuestionUpdateProps extends NativeStackScreenProps<RooteStackParams,'QuestionUpdate'> {
    question: Question,
    onSubmit: () => void,
    onCancel: () => void
};

export const QuestionUpdate = () => {
    const route = useRoute();
    const props = route.params as QuestionUpdateProps;

    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState<string>();
    const { questionForm, changeValue, changeFocus, errorSubmit } = questionFormService(props.question); 
    
    const updateQuestion = () => {
        setError(undefined);

        loaderContext.changeStateLoder(true);

        let newQuestion : Question = {
            num_question: props.question.num_question,
            description: questionForm.description.value,
            answer: (questionForm.answer.value == "true") ? true : false,
            id_exam: 0,
            id_creator: authContext.authState.userProfile.id
        } as Question;
        
        examApi.updateQuestion(newQuestion, props.question.id_exam)
            .then(() => {
                loaderContext.changeStateLoder(false);
                props.onSubmit();
            })

    };
    
    const onUpdateQuestion = () => {
        setError(undefined);
        
        if ((!questionForm.description.isValid) || (!questionForm.answer.isValid || questionForm.answer.value == "" )) {
            errorSubmit();
            setError("Operación inválida: se encontraron campos faltantes");
            loaderContext.changeStateLoder(false);
            return;
        }
        
        updateQuestion();
    };

    useEffect(() => {
        loaderContext.changeStateLoder(true);
        loaderContext.changeStateLoder(false);

    }, []);

    return (
        <SafeAreaView>
            <View style={{marginTop: 15 , width: '100%', height: '100%',}}>
                {loaderContext.loderState.isLoder && <LoaderComponent/> }

                <View style={generalStyle.contentInputs}>
                    <View style={[(questionForm.description.isFocus&&questionForm.description.isValid)?generalStyle.inputFocus:
                            ((questionForm.description.isFocus&&!questionForm.description.isValid)
                            ||(questionForm.description.hasFocus&&!questionForm.description.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Descripción'
                            defaultValue={props.question.description}
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
                </View>    

                <View style={[courseFilterStyle.marginPickers, {marginBottom: 20}]}>
                    <Text style={courseFilterStyle.titlePickers}>Respuesta</Text>
                    <Picker
                        selectedValue={questionForm.answer.value}
                        onValueChange={(itemValue, itemIndex) => changeValue('answer', itemValue)
                        }>
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="Verdadero" value="true" />
                        <Picker.Item label="Falso" value="false" />
                    </Picker>
                </View>

                    {
                        error &&
                            <View style={{marginBottom: 10}}>
                                <Text style={{color: 'red'}}>{error}</Text>
                            </View>
                    }

                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={onUpdateQuestion}>
                            <Text style={generalStyle.textBottomColor}>Confirmar</Text>
                        </TouchableOpacity>    
                    </View>

                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={[generalStyle.bottomLogin, {backgroundColor:'rgb(218,76,53)'}]} onPress={props.onCancel}>
                            <Text style={generalStyle.textBottomColor}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
        </SafeAreaView>
    )
}
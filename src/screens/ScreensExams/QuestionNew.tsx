import React, { useContext, useState } from 'react'

import { Picker } from '@react-native-picker/picker';
import { Alert, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native'

import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';

import { LoaderComponent } from '../../components/LoaderComponent';

import { Question } from '../../interface/ExamInterface';
import { questionFormService } from '../../service/questionFormService';

import courseFilterStyle from '../../styles/courseFilterStyle';
import generalStyle from '../../styles/generalStyle';

interface QuestionNewProps {
    onSubmit: (lstQuestions : Question[]) => void,
    onCancel: () => void
};

export const QuestionNew = (props: QuestionNewProps) => {
    const loaderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const { questionForm, changeValue, changeFocus, errorSubmit, cleanForm } = questionFormService();  

    const [lstQuestion, setLstQuestion] = useState<Question[]>([]);
    const [textInputDescription, settextInputDescription] = useState<TextInput | null>();
    const [error, setError] = useState<string>();

    const onNewQuestion = () => {
        setError(undefined);

        loaderContext.changeStateLoder(true);

        if ((!questionForm.description.isValid) || (!questionForm.answer.isValid || questionForm.answer.value == "" )) {
            errorSubmit();
            setError("Operación inválida: se encontraron campos faltantes");
            loaderContext.changeStateLoder(false);
            return;
        }

        let newQuestion : Question = {
            num_question: lstQuestion.length + 1,
            description: questionForm.description.value,
            answer: (questionForm.answer.value == "true") ? true : false,
            id_exam: 0,
            id_creator: authContext.authState.userProfile.id
        } as Question;

        let newList : Question[] = [...lstQuestion, newQuestion];
        setLstQuestion(newList);

        textInputDescription?.clear();
        cleanForm();

        loaderContext.changeStateLoder(false);
    };
    
    const onConfirmQuestion = () => {
        setError(undefined);

        loaderContext.changeStateLoder(true);

        if ((!questionForm.description.isValid) || (!questionForm.answer.isValid || questionForm.answer.value == "" )) {
            errorSubmit();
            setError("Operación inválida: se encontraron campos faltantes");
            loaderContext.changeStateLoder(false);
            return;
        }

        let newQuestion : Question = {
            num_question: lstQuestion.length + 1,
            description: questionForm.description.value,
            answer: (questionForm.answer.value == "true") ? true : false,
            id_exam: 0,
            id_creator: authContext.authState.userProfile.id
        } as Question;

        let newList : Question[] = [...lstQuestion, newQuestion];
        
        loaderContext.changeStateLoder(false);

        props.onSubmit(newList);
    };

    const onCancel = () => {
        Alert.alert(
            `Atención!`,
            `Desea cancelar la creación de las preguntas?`,
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              {
                text: "Aceptar",
                onPress: () => { props.onCancel(); } 
              }
            ]
          );        
    }

    return (
        <SafeAreaView>
            <View style={{width: '100%', height: '100%',}}>
                {loaderContext.loderState.isLoder && <LoaderComponent/> }

                <View style={generalStyle.contentInputs}>
                    <View style={[(questionForm.description.isFocus&&questionForm.description.isValid)?generalStyle.inputFocus:
                            ((questionForm.description.isFocus&&!questionForm.description.isValid)
                            ||(questionForm.description.hasFocus&&!questionForm.description.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            ref={input => { settextInputDescription(input) }}
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
                        <TouchableOpacity style={generalStyle.bottomLogin} onPress={onNewQuestion}>
                            <Text style={generalStyle.textBottomColor}>Siguiente</Text>
                        </TouchableOpacity>    
                    </View>

                    {
                        lstQuestion.length > 0 &&
                            <View style={generalStyle.contentBottomLogin}>
                                <TouchableOpacity style={generalStyle.bottomLogin} onPress={onConfirmQuestion}>
                                    <Text style={generalStyle.textBottomColor}>Confirmar</Text>
                                </TouchableOpacity>    
                            </View>
                    }

                    <View style={generalStyle.contentBottomLogin}>
                        <TouchableOpacity style={[generalStyle.bottomLogin, {backgroundColor:'rgb(218,76,53)'}]} onPress={onCancel}>
                            <Text style={generalStyle.textBottomColor}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
        </SafeAreaView>
    )
}
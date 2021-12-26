import React, { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, Image, FlatList, SafeAreaView, ActivityIndicator, Modal, TextInput } from "react-native";
import { Course, CourseCollaboratorResume } from "../interface/CourseInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import { useEffect } from "react";
import { courseApi } from "../api/courseApi";
import courseDetailStyle from "../styles/courseDetailStyle";
import generalStyle from "../styles/generalStyle";
import dialogComponentStyle from "../styles/dialogComponentStyle";
import { collaboratorNewDialogService } from "../service/collaboratorNewDialogService";
import { LoaderComponent } from "./LoaderComponent";
import { LoderContext } from "../context/LoderContext";

interface CollaboratorNewDialogComponentProps {
    idCourse: number,
    onCancelDialog: () => void,
    onConfirmDialog: () => void
}

export const CollaboratorNewDialogComponent = (props: CollaboratorNewDialogComponentProps) => {
    const loderContext = useContext(LoderContext);
    const [error, setError] = useState<string>();
    const { collaborator, changeValue, changeFocus, errorSubmit} = collaboratorNewDialogService()

    const addNewCollaborator = () => {
        loderContext.changeStateLoder(true);
        setError(undefined);

        courseApi.addCollaborator(props.idCourse, collaborator.email.value)
        .then((value) => {
            if (value.message === "El colaborador se agregó correctamente")
                props.onConfirmDialog()
            else {
                errorSubmit();
                setError(value.message || "Ha ocurrido un error");
            }

            loderContext.changeStateLoder(false);
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onDismiss={props.onCancelDialog}
            onRequestClose={props.onCancelDialog}>   
            
            {loderContext.loderState.isLoder && <LoaderComponent/> }

            <View style={dialogComponentStyle.centeredView}>
                <View style={dialogComponentStyle.modalView}>
                <View style={[(collaborator.email.isFocus&&collaborator.email.isValid)?generalStyle.inputFocus:
                            ((collaborator.email.isFocus&&!collaborator.email.isValid)
                            ||(collaborator.email.hasFocus&&!collaborator.email.isValid))
                            ?generalStyle.inputFocusError:generalStyle.contentInput,generalStyle.contentInput]}>
                        <TextInput
                            style={generalStyle.inputText}
                            placeholder='Mail Colaborador'
                            placeholderTextColor = "white"
                            onChangeText={(text)=>{
                                setError(undefined);
                                changeValue('email',text)
                            }}
                            onFocus={()=>{
                                changeFocus('email',true)
                            }}
                            onBlur={()=>{
                                changeFocus('email',false)
                            }}
                        />
                        <Ionicons style={generalStyle.contentIcon} name="person-circle" size={20} />    
                    </View>
                    <View>
                        <Text>{error}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={props.onCancelDialog}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addNewCollaborator}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </Modal>
    );
}
 
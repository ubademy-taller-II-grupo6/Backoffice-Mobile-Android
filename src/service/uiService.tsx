import React, { useState } from 'react'
import { ActivityIndicator, Alert, Modal } from 'react-native';

export const uiService = () => {

    let alertaInformativa=(title:string,message:any,buttons:any=null)=>{
        if(!buttons){
            buttons=[
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
        }
        return Alert.alert(
            title,
            message,
            buttons
        );
    }

    return {
        alertaInformativa,
    }

    
}

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { PermissionContextProps, permissionsInitState, PermissionsState } from '../interface/PermissionsInterface';
import * as Location from 'expo-location';
import { AppState } from 'react-native';
import { AuthContext } from './AuthContext';
import { uiService } from '../service/uiService';
export const PermissionsContext = createContext({} as PermissionContextProps);

export const PermissionsProvider = ({children}:any) => {

    const [permission, setPermission] = useState(permissionsInitState)
    const askLocationPermission = async () =>{
        //let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("askLocationPermission")
        Location.requestForegroundPermissionsAsync().then((status:any)=>{
             setPermission({...permission,locationStatus:status.status})
         })
        /*let {status} = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        uiService().alertaInformativa("",status)*/
        //uiService().alertaInformativa("",requestPermission)
        
        //await setPermissionObject("granted")
        /*console.log("permission")
        console.log(newSatatus)
        if (status == 'granted') {
           let message:any='Permission to access location was denied'
           setErrorMsg(message);
           return;
        }*/
    }
    const setPermissionObject= async (status:any) =>{
        let newSatatus:PermissionsState={
            locationStatus:status
        }
        setPermission({...permission,locationStatus:status})
    }
    const checkLocationPermission = async () => {
        console.log("checkLocationPermission")
        let {status}:any = await Location.getCurrentPositionAsync({});
        console.log(status)
        if(status=="denied"){
            //let response = await Location.requestBackgroundPermissionsAsync()
            return
        }
        askLocationPermission()
    }

    let listenerPermissionLocations = () => {
        /*console.log("dds")
        AppState.addEventListener('change',state=>{
            //sconsole.log(state)
            console.log(state)
            if(state=='active'){
                checkLocationPermission() 
                return
            }
            
        })*/
    }
    // useEffect(() => {
    //       Location.getForegroundPermissionsAsync().then((status:any)=>{
    //             setPermissionObject(status.status);
    //       })
    //   }, []);
    
    return (
        <PermissionsContext.Provider value = {{permission,askLocationPermission,checkLocationPermission,listenerPermissionLocations,setPermissionObject}}>
            {children}
        </PermissionsContext.Provider>
    )
}

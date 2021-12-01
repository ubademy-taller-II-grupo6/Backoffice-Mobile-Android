import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { PermissionContextProps, permissionsInitState, PermissionsState } from '../interface/PermissionsInterface';
import * as Location from 'expo-location';
import { AppState } from 'react-native';
import { AuthContext } from './AuthContext';

export const PermissionsContext = createContext({} as PermissionContextProps);

export const PermissionsProvider = ({children}:any) => {

    const [permission, setPermission] = useState(permissionsInitState)
    const askLocationPermission = async () =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionObject(status)
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
        setPermission(newSatatus)
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
    /*useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          console.log("useEffect")
          let location = await Location.getCurrentPositionAsync({});
          setPermissionObject(status);
        })();
      }, []);*/
    
    return (
        <PermissionsContext.Provider value = {{permission,askLocationPermission,checkLocationPermission,listenerPermissionLocations}}>
            {children}
        </PermissionsContext.Provider>
    )
}

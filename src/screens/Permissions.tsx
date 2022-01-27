import React, { useContext, useEffect, useState } from 'react'
import { AppState, Text, TouchableOpacity, View } from 'react-native'
import * as Location from 'expo-location';
import { PermissionsContext, PermissionsProvider } from '../context/PermissionsContext';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import * as IntentLauncher from 'expo-intent-launcher';
import permissionStyle from '../styles/permissionStyle';
import { Ionicons } from '@expo/vector-icons';

export const Permissions = () => {
    /*const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);*/
    const permissionContext = useContext(PermissionsContext)

   /*useEffect(() => {
        (async () => {
          let { status } = await Location.getForegroundPermissionsAsync();
          console.log("status")
          console.log(status)
          if (permissionContext.permission.locationStatus !== 'granted') {
            permissionContext.setPermissionObject({...permissionContext.permission,locationStatus:status})
            return;
          }
          let location:any = await Location.getCurrentPositionAsync({});
        })();
      }, []); */
      // useEffect(() => {
      //   permissionContext.askLocationPermission()
      // });

      let onPressButton = async () => {
        console.log("startActivityAsync")
        //IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS);
        await permissionContext.askLocationPermission()
      }
    return (
        <View style={permissionStyle.contentCardPermissions}>
             <Text >{JSON.stringify(permissionContext.permission)}</Text>
            {/* <button onPress={()=>{permissionContext.askLocationPermission}}></button> */}
            <View style={permissionStyle.cardPermissions}>
              <Text  style={permissionStyle.descriptionCard}>Para poder Navegar en la App es necesario dar Permisos de Localización.</Text>
              <Ionicons  name="alert-circle" size={60} color="rgba(241, 196, 112, 1)"/>    
              <TouchableOpacity onPress={()=>{onPressButton()}}>
                <Text style={permissionStyle.showAlert}>Dar Permisos de Localización</Text>
              </TouchableOpacity>      
            </View>
            
        </View>
    )
}

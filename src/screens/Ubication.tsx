import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { RooteStackParams } from '../interface/navigatorLogin';
import ubicationStyle from '../styles/ubication';
import * as Location from 'expo-location';

interface Props extends NativeStackScreenProps<RooteStackParams,"Ubication">{};
export const Ubication = ({navigation}:Props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

   /* useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);*/

    return (
        <View style={ubicationStyle.container}>
            <MapView style={ubicationStyle.map} />
        </View>
      );
}
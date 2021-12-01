import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RooteStackParams } from '../interface/navigatorLogin';
import ubicationStyle from '../styles/ubication';
import * as Location from 'expo-location';
import { LocationInterface } from '../interface/PermissionsInterface';
import generalStyle from '../styles/generalStyle';

interface Props extends NativeStackScreenProps<RooteStackParams, "Ubication"> { };
export const Ubication = ({ navigation }: Props) => {

  let initialState: LocationInterface = {
    latitude: 0,
    longitude: 0
  }

  const [location, setLocation] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(initialState);
  useEffect(() => {
    (async () => {
      let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })();
  }, []);
  let onPressButton = () => {

  }
  return (
    <View style={ubicationStyle.container}>
      <MapView style={ubicationStyle.map}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }} >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={"scasc"}
          draggable={true}
          description={"csdcdsds"}
        />

      </MapView><TouchableOpacity onPress={() => { onPressButton() }}>
      <View style={generalStyle.buttonSiguiente}>
        
          <Text onPress={()=>navigation.navigate('TypeUser')} style={generalStyle.textButtonSiguiente}>SIGUIENTE</Text>
        
      </View>
      </TouchableOpacity>  
    </View>
  );
}
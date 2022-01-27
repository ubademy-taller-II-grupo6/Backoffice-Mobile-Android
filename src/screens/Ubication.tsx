import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RooteStackParams } from '../interface/navigatorLogin';
import ubicationStyle from '../styles/ubication';
import * as Location from 'expo-location';
import { LocationInterface } from '../interface/PermissionsInterface';
import generalStyle from '../styles/generalStyle';
import { AuthContext } from '../context/AuthContext';

interface Props extends NativeStackScreenProps<RooteStackParams, "Ubication"> { };
export const Ubication = ({ navigation }: Props) => {
    const authContext = useContext(AuthContext);

  let initialState: LocationInterface = {
    latitude: 30,
    longitude: 30
  }

  const [location, setLocation] = useState(initialState);
  
  useEffect(() => {
    
     /*(async () => {
     let location_: Location.LocationObject = await Location.getCurrentPositionAsync({});
      console.log(location)
      console.log(location_)
      setLocation({
        ...location,
        latitude: location_.coords.latitude,
        longitude: location_.coords.longitude
      })
      console.log(location.latitude)
    })();*/
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
        {/* <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={"scasc"}
          draggable={true}
          description={"csdcdsds"}
        /> */}

      </MapView>
      <TouchableOpacity onPress={() => { onPressButton() }}>
      <View style={generalStyle.buttonSiguiente}>
        
          <Text onPress={()=>authContext.changeAuthState('estudiante')} style={generalStyle.textButtonSiguiente}>SIGUIENTE</Text> 
        
      </View>
      </TouchableOpacity>  
    </View>
  );
}
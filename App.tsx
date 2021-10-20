import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { InicioNavigator } from './src/navigators/InicioNavigator';

export default function App() {
  return (
        <NavigationContainer>
          <StatusBar backgroundColor="rgba(28, 166, 206, 1)"></StatusBar>
          <InicioNavigator/>
        </NavigationContainer>
      
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

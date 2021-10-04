import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InicioNavigator } from './src/navigators/InicioNavigator';
import { Inicio } from './src/screens/Inicio';

export default function App() {
  return (
        <NavigationContainer>
          <InicioNavigator/>
        </NavigationContainer>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

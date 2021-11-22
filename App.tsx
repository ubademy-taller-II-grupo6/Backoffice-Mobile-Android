import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { LoderProvider } from './src/context/LoderContext';
import { InicioNavigator } from './src/navigators/InicioNavigator';
export default function App() {

  return (

        <NavigationContainer>
          <AppState>
            <StatusBar backgroundColor="rgba(28, 166, 206, 1)"></StatusBar>
            <InicioNavigator/>  
          </AppState>
        </NavigationContainer>
      
  );
}

const AppState = ({children}:any)=>{
  return (
    <AuthProvider>
      <LoderProvider>
        {children}  
      </LoderProvider>
    </AuthProvider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

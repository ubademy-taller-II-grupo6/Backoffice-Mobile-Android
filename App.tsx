import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { LoderProvider } from './src/context/LoderContext';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { InicioNavigator } from './src/navigators/InicioNavigator';
import { Tabs } from './src/navigators/TabsNavigator';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
export default function App() {

  return (

        <NavigationContainer>
          <AppState>
            <StatusBar backgroundColor="rgba(28, 166, 206, 1)"></StatusBar>
            <InicioNavigator/>  
            
          </AppState>
           {/* <Tabs></Tabs> */}
        </NavigationContainer>
      
  );
}

const AppState = ({children}:any)=>{
  return (
    <PermissionsProvider>
      <AuthProvider>
        <LoderProvider>
          {children}  
        </LoderProvider>
      </AuthProvider>  
    </PermissionsProvider>
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

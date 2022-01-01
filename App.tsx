import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { notificationsApi } from './src/api/notificationsApi';
import { AuthProvider } from './src/context/AuthContext';
import { LoderProvider } from './src/context/LoderContext';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { InicioNavigator } from './src/navigators/InicioNavigator';
import { Tabs } from './src/navigators/TabsNavigator';
export default function App() {
  const notificationsListener = useRef()
  const responseListener = useRef()
  useEffect(() => {
     //notificationsApi().startNotifications(notificationsListener,responseListener)
  }, [])
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

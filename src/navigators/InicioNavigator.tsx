import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../screens/Inicio';
import { Login } from '../screens/Login';
import { Registro } from '../screens/Registro';

const Stack = createNativeStackNavigator();

export const InicioNavigator = () => {
    

    return (
            <Stack.Navigator>
                <Stack.Screen name="Inicio" options={{ headerShown: false }} component={Inicio} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
            </Stack.Navigator>
    )
}

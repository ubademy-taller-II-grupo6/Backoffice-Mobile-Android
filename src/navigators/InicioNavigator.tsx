import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../screens/Inicio';
import { Login } from '../screens/Login';
import { Registro } from '../screens/Registro';
import { Home } from '../screens/Home';
import { RooteStackParams } from '../interface/navigatorLogin';

const Stack = createNativeStackNavigator<RooteStackParams>();

export const InicioNavigator = () => {

    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inicio" options={{ headerShown: false }} component={Inicio} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
            <Stack.Screen name="Registro" options={{ headerShown: false }} component={Registro} />
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
    )
}

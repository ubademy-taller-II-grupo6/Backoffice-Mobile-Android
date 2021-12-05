import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../screens/Inicio';
import { Login } from '../screens/Login';
import { Registro } from '../screens/Registro';
import { Home } from '../screens/Home';
import { RooteStackParams } from '../interface/navigatorLogin';
import { AuthContext } from '../context/AuthContext';
import { Ubication } from '../screens/Ubication';
import { Permissions } from '../screens/Permissions';
import { PermissionsContext } from '../context/PermissionsContext';
//import { TypeUser } from '../screens/TypeUser';

const Stack = createNativeStackNavigator<RooteStackParams>();

export const InicioNavigator = () => {

    const userContext = useContext(AuthContext)
    const permissionContext = useContext(PermissionsContext)
    
    /*if(!userContext.authState.isLoggedIn){
        return (
            <Stack.Navigator>
                <Stack.Screen name="Inicio" options={{ headerShown: false }} component={Inicio} />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="Registro" options={{ headerShown: false }} component={Registro} />
            </Stack.Navigator>
        )    
    }else{
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            </Stack.Navigator>
        )
    }*/
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(28, 166, 206, 1)',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }}
        >
            {
                !userContext.authState.isLoggedIn&&(
                    <>
                        
                        <Stack.Screen name="Inicio"component={Inicio} options={{ headerShown: false }} />
                        <Stack.Screen name="Login"  component={Login} options={{title:"Login"}}/>
                        <Stack.Screen name="Registro"  component={Registro}  options={{title:"Registro"}}/>
                    </>
                )
            }
            {
                userContext.authState.isLoggedIn&&(
                    <>
                        {(permissionContext.permission.locationStatus!='granted')&&(<Stack.Screen name="Permissions" component={Permissions} />)}
                        <Stack.Screen name="Ubication"  component={Ubication} />
                        {/* <Stack.Screen name="TypeUser"  component={TypeUser} /> */}
                        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
                    </>
                )
            }
        </Stack.Navigator>
    )   
}

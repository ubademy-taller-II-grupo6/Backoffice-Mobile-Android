import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../screens/Inicio';
import { Login } from '../screens/Login';
import { Registro } from '../screens/Registro';
import { Home } from '../screens/SreensTabsNavigator/Home';
import { RooteStackParams } from '../interface/navigatorLogin';
import { AuthContext } from '../context/AuthContext';
import { Ubication } from '../screens/Ubication';
import { Permissions } from '../screens/Permissions';
import { PermissionsContext } from '../context/PermissionsContext';
import { TypeUser } from '../screens/TypeUser';
import { Tabs } from './TabsNavigator';
import { Ionicons } from '@expo/vector-icons';
import { CourseDetail } from '../screens/CourseDetail';
import { TypesUser } from '../interface/userInterface';
import { CourseNew } from '../screens/CourseNew';
import { CourseUpdate } from '../screens/CourseUpdate';
import { ExamNew } from '../screens/ScreensExams/ExamNew';
import { QuestionNew } from '../screens/ScreensExams/QuestionNew';

const Stack = createNativeStackNavigator<RooteStackParams>();

export const InicioNavigator = () => {

    const userContext = useContext(AuthContext)
    const permissionContext = useContext(PermissionsContext)
    
    return (
        <Stack.Navigator>
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
                userContext.authState.isLoggedIn&&(//cambiar !
                    <>
                        {(permissionContext.permission.locationStatus!='granted')&&(<Stack.Screen name="Permissions" component={Permissions} />)}
                        {(userContext.authState.typeUser=='none')&&(<Stack.Screen name="Ubication"  component={Ubication} />)}
                        {(userContext.authState.typeUser=='none')&&(<Stack.Screen name="TypeUser"  component={TypeUser} />)}
                        {(userContext.authState.typeUser!='none')&&<Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />}
                        {(userContext.authState.typeUser!='none')&&<Stack.Screen name="CourseDetail" component={CourseDetail} />}
                        {(userContext.authState.typeUser==TypesUser.Profesor)&&<Stack.Screen name="CourseNew" component={CourseNew} />}
                        {(userContext.authState.typeUser==TypesUser.Profesor)&&<Stack.Screen name="CourseUpdate" component={CourseUpdate} />}
                        {(userContext.authState.typeUser==TypesUser.Profesor)&&<Stack.Screen name="ExamNew" component={ExamNew} />}
                        {(userContext.authState.typeUser==TypesUser.Profesor)&&<Stack.Screen name="QuestionNew" component={QuestionNew} />}
                        {/* <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} /> */}
                    </>
                )
            }
        </Stack.Navigator>
    )   
}

import React, { useContext } from 'react'

import { Home } from '../screens/SreensTabsNavigator/Home';
import { MisCursos } from '../screens/SreensTabsNavigator/MisCursos';
import { Cursos } from '../screens/SreensTabsNavigator/Cursos';
import { Favoritos } from '../screens/SreensTabsNavigator/Favoritos';
import { Perfil } from '../screens/SreensTabsNavigator/Perfil';
import { Ionicons } from '@expo/vector-icons';
import typeUserStyle from '../styles/typeUserStyle';
import { CourseDetail } from '../screens/CourseDetail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chat } from '../screens/SreensTabsNavigator/Chat';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="home" size={20} />   
          ),headerRight: () => (
            <Ionicons style={typeUserStyle.menuIcon} onPress={() => alert('This is a button!')} name="menu" size={20} /> )
        }}/>
      <Tab.Screen name="MisCursos" component={MisCursos} options={{
          tabBarLabel: 'Mis Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="clipboard" size={20} />   
          ),headerRight: () => (
            <Ionicons style={typeUserStyle.menuIcon} onPress={() => alert('This is a button!')} name="menu" size={20} /> )
        }}/>
      <Tab.Screen name="Cursos" component={Cursos} options={{
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="bookmarks" size={20} />   
          ),headerRight: () => (
            <Ionicons style={typeUserStyle.menuIcon} onPress={() => alert('This is a button!')} name="menu" size={20} /> )
        }}/>
      <Tab.Screen name="Favoritos" component={Favoritos} options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="star-half" size={20} />   
          ),headerRight: () => (
            <Ionicons style={typeUserStyle.menuIcon} onPress={() => alert('This is a button!')} name="menu" size={20} /> )
        }}/>
      <Tab.Screen name="MiPerfil" component={Perfil}  options={{
          tabBarLabel: 'Mi Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="person-circle" size={20} />   
          ),
        }}/>
      <Tab.Screen name="Chat" component={Chat}  options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="chatbubble-ellipses" size={20} />   
          ),
        }}/>  
    </Tab.Navigator>
  );
}
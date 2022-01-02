import React, { useState, useEffect, useCallback, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, LogBox, Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { RooteStackParams } from '../interface/navigatorLogin'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import { userProfileInterface } from '../interface/userInterface'
import { AuthContext } from '../context/AuthContext'
import { notificationsApi } from '../api/notificationsApi'
import * as Notifications from 'expo-notifications';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
interface Props extends NativeStackScreenProps<RooteStackParams,"RoomChat">{
    user: userProfileInterface
};

const db = firebase.default.firestore()
const chatsRef = db.collection('chats')
export const RoomChat = ({navigation}:Props) => {
    const route = useRoute();
    const props = route.params as Props;
    const authContext = useContext(AuthContext);

    let initialUserState:any = authContext.authState.userProfile//null
    const [user, setUser] = useState(initialUserState)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        //readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            let messagesFilter = messages.filter((x: any) => (x?.user?.name === props.user.name) || ((x?.user?.name === authContext.authState.userProfile.name)));
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messagesFilter))

        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handleSend(messages:any) {
        const writes = messages.map(async (m:any) => {
            chatsRef.add(m)
            let email = navigation.getState().routes[1].params?.user.email
            let name = navigation.getState().routes[1].params?.user.name
            await notificationsApi().sendPushNotification("ExponentPushToken[KM6WJvCypXoMMSWpifBmeF]",name,m,email)//notificationsApi().schedulePushNotification("Rogger","Primer Mensaje",2)      
        })
        await Promise.all(writes)
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
//import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, LogBox, Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { RooteStackParams } from '../interface/navigatorLogin'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
interface Props extends NativeStackScreenProps<RooteStackParams,"Tabs">{};

const db = firebase.default.firestore()
const chatsRef = db.collection('chats')
export const RoomChat = ({navigation}:Props) => {
    let initialUserState:any = null
    const [user, setUser] = useState(initialUserState)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    /*async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }*/
    async function handleSend(messages:any) {
        const writes = messages.map((m:any) => chatsRef.add(m))
        await Promise.all(writes)
    }

    /*/if (!user) {
        return (
            <View style={roomChatStyle.container}>
                <TextInput style={roomChatStyle.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
                <Text>{JSON.stringify(navigation)}</Text>
            </View>
        )
    }*/
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    // return (
    //     <Text>{JSON.stringify(navigation.getState().routes[1].params?.user)}</Text>
    // )
}
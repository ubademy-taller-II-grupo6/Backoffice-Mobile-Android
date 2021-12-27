/*import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

export const Chat = () => {
    let userInitialState:any = {

    }
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(userInitialState)

    let handleSend = () => {

    }
    useEffect(() => {
    }, [])
    return (
        
        <GiftedChat messages={messages} user={user} onSend={handleSend} />
    )
}*/

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
//import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, LogBox } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
/*
const firebaseConfig = {
    apiKey: "AIzaSyB5cvfwNdX_HP4pJODxxlNv4JRuIIWJp_s",
    authDomain: "ubademy-apigateway.firebaseapp.com",
    projectId: "ubademy-apigateway",
    storageBucket: "ubademy-apigateway.appspot.com",
    messagingSenderId: "934202487625",
    appId: "1:934202487625:web:ad459ee18794d8af20e098",
    measurementId: "G-7085K4CLZJ"
}

if (firebase.default.apps.length === 0) {
    firebase.default.initializeApp(firebaseConfig)
}*/

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.default.firestore()
const chatsRef = db.collection('chats')

export const Chat = () => {
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
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages:any) {
        const writes = messages.map((m:any) => chatsRef.add(m))
        await Promise.all(writes)
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})

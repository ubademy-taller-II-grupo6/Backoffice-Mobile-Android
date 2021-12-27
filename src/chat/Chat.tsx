// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, TextInput, View, YellowBox, Button, LogBox } from 'react-native'
//import * as firebase from 'firebase'
import 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from 'firebase';

//LogBox.ignoreWarnings(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(["Setting a timer for a long period of time"])

//const db = firebase.
//const chatsRef = db.collection('chats')

export default function App() {             ///ACA NO DEBERIA SER DESDE LA APP
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        readUser()
        /*const unsubscribe = chatsRef.onSnapshot((querySnapshot:any) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }:any) => type === 'added')
                .map(({ doc }:any) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a:any, b:any) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })*/
        /*return () => unsubscribe()/*/
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
    }
    async function handleSend(messages:any) {
        const writes = messages.map((m:any) => chatsRef.add(m))
        await Promise.all(writes)
    }*/

    /*if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />*/
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

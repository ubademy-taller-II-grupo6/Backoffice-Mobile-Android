import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as firebase from 'firebase'
import { getFirestore } from '../../firebase';
const db = getFirestore()//firebase.default.firestore()

let testUbademy:any = {
  "cuenca@gmail.com":"ExponentPushToken[KM6WJvCypXoMMSWpifBmeF]",
  "testubademy@gmail.com":"ExponentPushToken[ktx0jvL63vANCly0BPOFG-]",
  "mromerov@fi.uba.ar":"ExponentPushToken[43nDWGFTW5lv-nnzYeKKSH]"
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const notificationsApi = () => {
  let schedulePushNotification = async (title:string="" , body:string="", seconds:number = 2) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: { seconds: seconds },
    });
  }

  let getToken = async () => {
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    return token
  }

  let setTokenInFirebaseWithId = async (nameCollection:any, data:any,doc:any) => {
    
    console.log("setTokenInFirebaseWithId")
    console.log(nameCollection)
    console.log(data)
    console.log(doc)
    const result = {statusResponse:true,error:null}
    try{
      await db.collection(nameCollection).doc(doc).set(data)
    } catch (error:any) {
      result.statusResponse=false
      result.error = error
    }
    console.log(result)
    return result
  }

  

  let getDataDoc = async (nameCollection:any,nameDoc:any) => {
    var docRef = db.collection(nameCollection).doc(nameDoc)
    return docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data()
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  }

  let sendPushNotification = async (expoPushToken:any,title:any,body:any,email:string) => {
    let token:any = await getDataDoc('notificationsUsers',expoPushToken)//testUbademy[email]
    console.log('elToken se obtuvo ')
    console.log(token)
    //console.log(token)
    const message = {
      to: token.token,
      sound: 'default',
      title: title,
      body: body.text,
    };
    //sendPushNotification
    console.log("sendPushNotification")
    console.log(message)
    
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  
  let startNotifications = ( notificationsListener:any,responseListener:any) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    
    notificationsListener.current = Notifications.addNotificationReceivedListener(notification => {
      //console.log(notification)
    })
    responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
      //console.log(notification)
    })
    return () => {
      Notifications.removeNotificationSubscription(notificationsListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }

  return {schedulePushNotification,getToken,startNotifications,setTokenInFirebaseWithId,sendPushNotification}
}

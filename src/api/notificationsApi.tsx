import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as firebase from 'firebase'
const db = firebase.default.firestore()

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
    console.log()
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
  
  let startNotifications = ( notificationsListener:any,responseListener:any) => {
    notificationsListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })
    responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log(notification)
    })
    return () => {
      Notifications.removeNotificationSubscription(notificationsListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }

  return {schedulePushNotification,getToken,startNotifications,setTokenInFirebaseWithId}
}

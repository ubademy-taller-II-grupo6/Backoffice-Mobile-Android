import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { ChatUserInterface } from '../../interface/ChatInterface'
import { Ionicons } from '@expo/vector-icons';
import chatStyle from '../../styles/ChatStyle';
import { chatApi, chatApi2 } from '../../api/chatApi';
import { RooteStackParams } from '../../interface/navigatorLogin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext';
import { LoderContext } from '../../context/LoderContext';
import { LoaderComponent } from '../../components/LoaderComponent';
interface Props extends NativeStackScreenProps<RooteStackParams>{};
const db = firebase.default.firestore()

export const Chat = ({navigation}:Props) => {
    const loaderContext = useContext(LoderContext);
    const userContext = useContext(AuthContext);
    const [threads, setThreads] = useState([]);
    let initialUserState: ChatUserInterface = {
        id: "",
        name: "",
        lastname: "",
        email: "",
        latitude: "",
        longitude: "",
        blocked: false,
        subscription: "",
    }
    const [users, setUsers] = useState<ChatUserInterface[]>()
    let getAllUsers = async () => {
        loaderContext.changeStateLoder(true);
        let allUsers: [ChatUserInterface] = await chatApi().getAllUsers()
        setUsers(allUsers)
        loaderContext.changeStateLoder(false);
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    /*useEffect(() => {
        const unsubscribe = db
          .collection('chats')
          .orderBy('latestMessage.createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const threads:any = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                // give defaults
                name: '',
    
                latestMessage: {
                  text: ''
                },
                ...documentSnapshot.data()
              };
            });
            setThreads(threads);
          });
    
        return () => unsubscribe();
      }, []);*/

    const renderItem = (user: any) => (
        
            
            <View >
            {userContext.authState.email!=user.email && (
                <View style={chatStyle.contentAvatar}>
                    <View>             
                        {/* <Text>{JSON.stringify(user.email)}</Text> */}

                        <Ionicons onPress={()=>navigation.navigate({name:'RoomChat',params: { user },})} name="person-circle" size={40} color="rgba(28, 166, 206, 1)" />
                    </View>
                    <Text style={chatStyle.textAvatar} onPress={()=>navigation.navigate({name:'RoomChat',params: { user },})}>
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </Text>
                    <View style={{position: 'absolute', top: 5, right: 15}}>
                        <Ionicons onPress={()=>navigation.navigate('ProfileUser', { idUser: user.id })} name="information-circle-outline" size={30} color="rgba(28, 166, 206, 1)" />
                    </View>     
                </View>
            )}
            </View>
        
    );
    return (
        <View >
            
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={loaderContext.loderState.isLoder}
                    onRefresh={getAllUsers}
                />
                }
            >                
            
                { loaderContext.loderState.isLoder && <LoaderComponent/> }

                {users && (
                    <FlatList
                        keyExtractor={(item,index) => index.toString() }
                        data={users}
                        renderItem={({item,index }) => renderItem(item)}
                    />
                )}
            </ScrollView>
            
             {/* <Text>{JSON.stringify(userContext.authState.email)}</Text>  */}
        </View>
    )
}


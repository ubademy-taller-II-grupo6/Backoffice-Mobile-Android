import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, View } from 'react-native'
import { LoaderComponent } from '../components/LoaderComponent';
import { LoderContext } from '../context/LoderContext';
import { RooteStackParams } from '../interface/navigatorLogin';
import courseStyle from '../styles/courseStyle';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { Subscription } from '../interface/SubscriptionInterface';
import { SelectSubscriptionComponent } from '../components/SelectSubscriptionComponent';
import { paymentApi } from '../api/paymentApi';
import { localStorage } from '../localStorage/localStorage';
import { useRoute } from '@react-navigation/native';

interface Props extends NativeStackScreenProps<RooteStackParams,'SubscriptionAdd'>{
    onSubmit: () => void
};

export const SubscriptionAdd = ({navigation} : Props) => {
    const route = useRoute();
    const props = route.params as Props;
    const loderContext = useContext(LoderContext);
    const authContext = useContext(AuthContext);
    const userSubscription : string = authContext.authState.userProfile.subscription;

    const [lstSubscriptions, setLstSubscriptions] = useState<Subscription[]>();

    const getSubscription = () => {
        loderContext.changeStateLoder(true);

        Promise.all([
            userApi.getCacheSubscriptions()
        ])
        .then((values) => {
            setLstSubscriptions(values[0].data?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) ?? []);
            loderContext.changeStateLoder(false);
        });
    };

    const paySubscription = (subscription: Subscription) => {
        Alert.alert(
            `Desea suscribirse a ${subscription.subscription_id}?`,
            `${subscription.conditions}`,
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Aceptar", onPress: () => { setSubscription(subscription) } 
              }
            ]
          );
    }

    const showInsufficient = () => {
        Alert.alert(
            `Saldo Insuficiente!`,
            `No posee saldo en la billetera para poder realizar esta operación`,
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
            ]
          );
    }

    const setSubscription = (subscription: Subscription) => {
        loderContext.changeStateLoder(true);
        
        if (parseFloat(subscription.price) === 0) {
            userApi.getUserById(authContext.authState.userProfile.id)
            .then((user) => {
                user.subscription = subscription.subscription_id;
                userApi.updateUser(user).then(() => {
                    localStorage.save(user.id, user.name, user.lastname, user.email, user.blocked, subscription.subscription_id)
                        .then(() => {
                            authContext.signIn({
                                isLoggedIn:true,
                                provider:"EMAIL",
                                emailVerified:authContext.authState.emailVerified,
                                username:"",
                                email:authContext.authState.email,
                                potho:"",
                                stsTokenManager:{
                                    accessToken:"",
                                    apiKey:"",
                                    expirationTime:0,
                                    refreshToken:authContext.authState.stsTokenManager.refreshToken,
                                    uid:authContext.authState.stsTokenManager.uid
                                },
                                typeUser:"",
                                userProfile: {
                                    blocked: user.blocked,
                                    email: user.email,
                                    id: user.id,
                                    lastname: user.lastname,
                                    name: user.name,
                                    subscription: subscription.subscription_id
                                }
                            });
                            loderContext.changeStateLoder(false);
                            props.onSubmit();
                        });
                })
            });
        } else {
            paymentApi.paySubscription(authContext.authState.userProfile.id, subscription.price)
            .then((response) => {
                if (response.message != null) {
                    loderContext.changeStateLoder(false);
                    console.log(response.message);
                    showInsufficient();
                } else {
                    userApi.getUserById(authContext.authState.userProfile.id)
                        .then((user) => {
                            user.subscription = subscription.subscription_id;
                            userApi.updateUser(user).then(() => {
                                localStorage.save(user.id, user.name, user.lastname, user.email, user.blocked, subscription.subscription_id)
                                    .then(() => {
                                        authContext.signIn({
                                            isLoggedIn:true,
                                            provider:"EMAIL",
                                            emailVerified:authContext.authState.emailVerified,
                                            username:"",
                                            email:authContext.authState.email,
                                            potho:"",
                                            stsTokenManager:{
                                                accessToken:"",
                                                apiKey:"",
                                                expirationTime:0,
                                                refreshToken:authContext.authState.stsTokenManager.refreshToken,
                                                uid:authContext.authState.stsTokenManager.uid
                                            },
                                            typeUser:"",
                                            userProfile: {
                                                blocked: user.blocked,
                                                email: user.email,
                                                id: user.id,
                                                lastname: user.lastname,
                                                name: user.name,
                                                subscription: subscription.subscription_id
                                            }
                                        });
                                        loderContext.changeStateLoder(false);
                                        props.onSubmit();
                                    });
                            })
                        });
                }
            })
        }
    }     

    useEffect(() => {
        getSubscription();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                {loderContext.loderState.isLoder && <LoaderComponent/>}

                <View style={courseStyle.contentCards}>
                    <FlatList
                        data={lstSubscriptions}
                        renderItem={(item) => <SelectSubscriptionComponent 
                                                    subscription={item.item} 
                                                    isSelect={userSubscription === item.item.subscription_id}
                                                    onClick={(subs) => paySubscription(subs)} />}
                        keyExtractor={(item) => `${item.subscription_id}`}
                    />
                </View>         
            </ScrollView>
        </SafeAreaView>
    )
}

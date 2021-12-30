import React, { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Course } from "../interface/CourseInterface";

import { StyleSheet } from "react-native";
import { useState } from "react";
import {Dimensions} from 'react-native';
import courseComponentStyle from "../styles/courseComponentStyle";
import { useEffect } from "react";
import { courseApi } from "../api/courseApi";
import { AuthContext } from "../context/AuthContext";
import { Subscription } from "../interface/SubscriptionInterface";
import typeUserStyle from "../styles/typeUserStyle";

const {height, width} = Dimensions.get('window');

interface SelectSubscriptionComponentProps {
    subscription: Subscription,
    isSelect: boolean,
    onClick: (subs: Subscription) => void
}

export const SelectSubscriptionComponent = (props: SelectSubscriptionComponentProps) => {
    const [finalFavorite, setFavorite] = useState<boolean>();
    const authContext = useContext(AuthContext);

    return (
        <View style={courseComponentStyle.container}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => props.onClick(props.subscription)}>
                <View>
                    <Text style={courseComponentStyle.titleCourse}>
                        {props.subscription.subscription_id}
                    </Text>
                    <Text style={courseComponentStyle.colorDescription}>
                        {props.subscription.conditions}
                    </Text>
                    <Text style={courseComponentStyle.colorDescription}>
                        {`Precio: ${props.subscription.price}`}
                    </Text>
                </View>
            </TouchableOpacity>
            {
                props.isSelect &&
                    <Ionicons style={{position: 'absolute', top: 5, right: 15, fontSize:30, color:'rgba(45,171,255,1)'}} name="checkmark-sharp" size={20} />
            }
        </View>
    );
}
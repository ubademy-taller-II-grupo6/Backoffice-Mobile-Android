import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import generalStyle from '../styles/generalStyle'

export const LoaderComponent = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}>   
            <View style={{flex: 1, 
            justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <ActivityIndicator style={generalStyle.loader} size="large" 
                color="rgba(255, 255, 255, 0.7)" />
            </View>
        </Modal>
    )
}

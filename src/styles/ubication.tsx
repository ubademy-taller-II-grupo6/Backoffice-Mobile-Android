import { Dimensions, StyleSheet } from "react-native";
const ubicationStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    map: {
        width: '100%',
        height: '90%',
      },
    bottomConfirmation:{
      position:'absolute',
      zIndex:99999,
      height:0,
      right:50,
      backgroundColor:'red'
    }
})

export default ubicationStyle;
import { Dimensions, StyleSheet } from "react-native";
const ubicationStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})

export default ubicationStyle;
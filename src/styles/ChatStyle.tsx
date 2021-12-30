import { StyleSheet } from "react-native";

const chatStyle = StyleSheet.create({
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
    contentAvatar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical:10,
        marginLeft:10,
        alignContent:'center',
        alignItems:'center'
    },
    textAvatar:{
        color:'#363636',
        fontSize:20
    }
})

export default chatStyle;
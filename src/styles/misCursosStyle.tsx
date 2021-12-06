import { StyleSheet } from "react-native";
const misCursosStyle = StyleSheet.create({
    contentCards:{
        height:'100%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    cardOption:{
        height:100,
        width:300,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        marginVertical:8,
        borderRadius:2,
        elevation: 2,
        position:'relative'
    },
    titleText:{
        color:'#363636',
        fontSize:18,
        paddingLeft:15,
        fontWeight:'700'
    },
})

export default misCursosStyle;
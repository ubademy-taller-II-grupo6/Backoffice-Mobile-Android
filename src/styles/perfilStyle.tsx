import { StyleSheet } from "react-native";
const pefilStyle = StyleSheet.create({
    contentPrincipal:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFFFFF',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        textAlign:'center',
        alignItems:'center',
        fontSize:20
    },
    photoUser:{
        backgroundColor:'rgba(28, 166, 206, 1)',
        width:'20%',
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        height:80,
        borderRadius:50,
        alignItems:'center',
    },
    textCharacter:{
        fontSize:40,
        color:'#FFFFFF'
    },
    textPerfil:{
        fontSize:20,
        width:'35%',
        paddingLeft:20,
        color:'#363636'
    },
    contentText:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:20,
        width:'100%',
    },
    space:{
        marginTop:50
    },
    edit:{
        fontSize:30,
        position:"absolute",
        color:'rgba(28, 166, 206, 1)',
        top:"10%",
        right:"5%"
    },
    textInputPerfil:{
        fontSize:20,
        width:'70%',
        paddingLeft:20,
        color:'#363636'
    }
})

export default pefilStyle;
import { StyleSheet } from "react-native";

const permissionStyle = StyleSheet.create({
    contentCardPermissions:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    cardPermissions:{
        width:300,
        padding:30,
        borderRadius:20,
        backgroundColor:'white',
        alignItems:'center',
    },
    descriptionCard:{
        color:'#363636',
        fontWeight:'500',
        flexWrap:'nowrap',
        display:'flex',
        textAlign:'center',
        fontSize:15,
    },
    showAlert:{
        color:'#363636',
        fontWeight:'700',
        textAlign:'center',
        display:'flex',
        textDecorationLine:'underline',
        fontSize:15,
    },
    ionIcon:{
        fontSize:20,
        backgroundColor:'rgba(241, 196, 112, 1)'
    },
})

export default permissionStyle;
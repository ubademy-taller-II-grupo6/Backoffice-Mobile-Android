import { StyleSheet } from "react-native";

const inicioStyle = StyleSheet.create({
    imgHeader:{
        width:'100%',
        height:200,
        resizeMode: 'stretch'
    },
    recuperarContraseña:{
        textDecorationLine:'underline',
        fontWeight:'700',
        marginBottom:10,
    },
    registrarContent:{
        display:"flex",
        justifyContent:"center",
        flexDirection:'row',
    },
    registrar:{
        fontWeight:'700',
    }
})

export default inicioStyle;
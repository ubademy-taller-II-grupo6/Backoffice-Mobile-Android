import { StyleSheet } from "react-native";

const inicioStyle = StyleSheet.create({
    content:{
        width: '100%',
        height: '100%',
        alignItems:"center"
    },
    imgHeader:{
        width:'100%',
        height:200,
        resizeMode: 'stretch'
    },
    contentImgLogo:{
        backgroundColor:'Transparent',
        width:250,
        height:150,
        marginBottom:70
    },
    imgLogo:{
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    contentBottomLogin:{
        alignItems:'center',
        marginBottom:20,
        width:400
    },
    bottomLogin:{
        width:'75%',
        height:40,
        display:'flex',
        justifyContent:"center",
        backgroundColor:'rgba(28, 166, 206, 1)',
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textBottomColor:{
        fontSize:20,
        fontWeight:'600',
        color:'white',
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
    // contentImgLogo:{
    //     alignItems:'center',
    //     height:'auto',
    //     alignContent:'center',
    //     display:'flex',
    //     justifyContent:'center'
    // },
    // imgLogo:{
    //     height: '50%',
    //     width:'80%',
    //     resizeMode: 'stretch'
    // },
    // imgHeader:{
    //     height: 130,
    //     width:'auto',
    //     resizeMode: 'stretch',
    // },
    // bottomLogin:{
    //     //marginTop:50,
    //     width:'75%',
    //     height:50,
    //     display:'flex',
    //     justifyContent:"center",
    //     backgroundColor:'#1CA6CE',
    //     alignItems:"center",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.23,
    //     shadowRadius: 2.62,
    //     elevation: 4,
    // },
    // textBottomColor:{
    //     color:'white',
    // },
    // contentBottomLogin:{
    //     alignItems:'center',
    //     marginBottom:35,
    // },
    // recuperarContent:{
    //     display:"flex",
    //     alignItems:"center",
    //     marginBottom:30,
    // },
    // recuperarContraseña:{
    //     textDecorationLine:'underline',
    //     fontWeight:'600',
    // },
    // registrarContent:{
    //     display:"flex",
    //     justifyContent:"center",
    //     flexDirection:'row',
    // },
    // registrar:{
    //     fontWeight:'700',
    // },
    // contentInputs:{
    //     height:'100%',
    //     display:'flex',
    //     alignContent:'center',
    //     justifyContent:'center',
    //     alignItems:'center',
       
    // },
    // contentInput:{
    //     backgroundColor:'rgba(86, 86, 86, 0.5)',
    //     marginTop:10,
    //     width:'75%',
    // },
    // inputText:{
    //     height:50,
    //     width:200,
    //     color:'white', 
    // }
})

export default inicioStyle;
import { StyleSheet } from "react-native";

const generalStyle = StyleSheet.create({
    content:{
        width: '100%',
        height: '100%',
        alignItems:"center"
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
    /*contentInput:{
        backgroundColor:'rgba(86, 86, 86, 0.5)',
        alignItems:'center',
        marginBottom:20,
        width:400,
    },
    inputText:{
        height:40,
        width:'75%',
        color:'white', 
    },*/
    contentInputs:{
        width:400,
        alignItems:'center'
    },
    contentInput:{
        width:'75%',
        marginBottom:20,
        height:40,
        backgroundColor:'rgba(86, 86, 86, 0.5)',
        alignItems:'flex-start'
    },
    inputText:{
        height:40,
        width:'50%',
        color:'white', 
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
})

export default generalStyle;
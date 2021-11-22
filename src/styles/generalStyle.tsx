import { StyleSheet } from "react-native";

const generalStyle = StyleSheet.create({
    content:{
        width: '100%',
        height: '100%',
        alignItems:"center"
    },
    loader:{
        //position:'absolute',
        //top:'0%',
        //fontSize:100,
        //left:'0%'
    },
    buttomReturn:{
        marginTop:80,
        fontSize:25,
        fontWeight:'700',
        color:'rgba(28, 166, 206, 1)',
    },
    contentImgLogo:{
        width:250,
        height:150,
        marginBottom:70,
        marginTop:30
    },
    imgLogo:{
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    contentInputs:{
        width:400,
        alignItems:'center'
    },
    contentInput:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'75%',
        marginBottom:20,
        height:40,
        backgroundColor:'rgba(86, 86, 86, 0.5)',
        alignItems:'center',
        paddingHorizontal:4,
    },
    contentPicker:{
        width:'75%',
        padding:0,
        height:40,
        backgroundColor:'rgba(86, 86, 86, 0.5)',
        marginBottom:20,
        alignItems:'center',
        flexDirection:'row',
    },
    contentIconReturn:{
            marginHorizontal:0,
            paddingStart:20,
            color:'#363636',
            width:'100%',
            alignItems:'flex-start',
        },
    contentIcon:{
        marginHorizontal:5,
        color:'white'
    },
    inputText:{
        height:40,
        width:'90%',
        color:'white',
    },
    inputFocusError: {
        borderColor:"red",
        borderBottomWidth:2,
    },
    inputFocus: {
        borderColor:"green",
        borderBottomWidth:2,
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
        fontSize:17,
        fontWeight:'600',
        color:'white',
    },
})

export default generalStyle;
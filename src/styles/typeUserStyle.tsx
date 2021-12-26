import { StyleSheet } from "react-native";
const typeUserStyle = StyleSheet.create({
    contentCards:{
        height:'100%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    menuIcon:{
        color:'#363636',
        marginRight:15,
        fontSize:25
    },  
    cardOption:{
        height:200,
        width:300,
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginVertical:8,
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        position:'relative'
    },
    cardText:{
        color:'#363636',
        fontSize:18,
        paddingLeft:15,
        fontWeight:'700'
    },
    imageCard:{
        position:'absolute',
        height:'100%',
        width:'60%',
        top:0,
        right:-30,
        zIndex:99
    },
    selectButton:{
        position:'absolute',
        width:50,
        height:50,
        bottom:-20,
        right:'40%',
        backgroundColor:'rgba(28, 166, 206, 1)',
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:99
    },
    contentIcon:{
        color:'white',
        fontSize:30
    },
    submitButton:{
        borderRadius:50,
        marginTop:20
    }
})

export default typeUserStyle;
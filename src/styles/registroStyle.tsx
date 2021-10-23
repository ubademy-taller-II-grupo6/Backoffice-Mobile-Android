import { StyleSheet } from "react-native";
const registroStyle = StyleSheet.create({
    google:{
        backgroundColor:'rgb(219,68,55)',
    },
    facebook:{
        backgroundColor:'#3b5998',
    },
    selectValue:{
        width:'75%',
        height:50,
        color:'red',
        backgroundColor:'red',
        alignItems:'center'
    },
    contentChexbox:{
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"row",
        alignItems:"center",
        color:'red'
    },
    contentChexboxes:{
        display:"flex",
        justifyContent:"flex-start",
        width:'75%',
        marginBottom:20,
        alignItems:"center",
        flexDirection:'row',
        flexWrap:'nowrap',
    },
    conditionPassword:{
        fontWeight:'700'
    },
    ss:{
        display:"flex",
        flexWrap:'nowrap',
        width:"90%",
        fontFamily:'',
        color:'#3b5998'
    }
})

export default registroStyle;